export interface PlanDetails {
  monthlyPremium: number;
  annualDeductible: number;
  coinsurancePercent: number; // patient's share, e.g. 20
  oopMax: number;
  copayPCP: number;
  copaySpecialist: number;
  copayER: number;
  copayUrgentCare: number;
}

export interface ServiceItem {
  description: string;
  billedAmount: number;
  usesCopay: boolean;
  copayType?: 'pcp' | 'specialist' | 'er' | 'urgentcare';
}

export interface CostBreakdown {
  totalBilled: number;
  annualPremium: number;
  deductibleApplied: number;
  copaysTotal: number;
  coinsuranceTotal: number;
  patientTotal: number;
  insurancePaid: number;
  totalAnnualCost: number; // premium + patient responsibility
}

export function calculateCosts(plan: PlanDetails, services: ServiceItem[], deductibleAlreadyMet: number = 0): CostBreakdown {
  const annualPremium = plan.monthlyPremium * 12;
  let remainingDeductible = Math.max(0, plan.annualDeductible - deductibleAlreadyMet);
  let totalPatientOOP = 0;
  let copaysTotal = 0;
  let coinsuranceTotal = 0;
  let deductibleApplied = 0;
  let totalBilled = 0;

  for (const svc of services) {
    totalBilled += svc.billedAmount;

    if (totalPatientOOP >= plan.oopMax) break;

    if (svc.usesCopay && svc.copayType) {
      const copay = getCopay(plan, svc.copayType);
      const actualCopay = Math.min(copay, plan.oopMax - totalPatientOOP);
      copaysTotal += actualCopay;
      totalPatientOOP += actualCopay;
      continue;
    }

    // Apply deductible first
    if (remainingDeductible > 0) {
      const deductiblePortion = Math.min(svc.billedAmount, remainingDeductible);
      const cappedDeductible = Math.min(deductiblePortion, plan.oopMax - totalPatientOOP);
      deductibleApplied += cappedDeductible;
      totalPatientOOP += cappedDeductible;
      remainingDeductible -= cappedDeductible;

      const afterDeductible = svc.billedAmount - deductiblePortion;
      if (afterDeductible > 0 && totalPatientOOP < plan.oopMax) {
        const coins = afterDeductible * (plan.coinsurancePercent / 100);
        const cappedCoins = Math.min(coins, plan.oopMax - totalPatientOOP);
        coinsuranceTotal += cappedCoins;
        totalPatientOOP += cappedCoins;
      }
    } else {
      const coins = svc.billedAmount * (plan.coinsurancePercent / 100);
      const cappedCoins = Math.min(coins, plan.oopMax - totalPatientOOP);
      coinsuranceTotal += cappedCoins;
      totalPatientOOP += cappedCoins;
    }
  }

  const patientTotal = Math.min(totalPatientOOP, plan.oopMax);
  const insurancePaid = totalBilled - patientTotal;

  return {
    totalBilled,
    annualPremium,
    deductibleApplied,
    copaysTotal,
    coinsuranceTotal,
    patientTotal,
    insurancePaid: Math.max(0, insurancePaid),
    totalAnnualCost: annualPremium + patientTotal,
  };
}

function getCopay(plan: PlanDetails, type: 'pcp' | 'specialist' | 'er' | 'urgentcare'): number {
  switch (type) {
    case 'pcp': return plan.copayPCP;
    case 'specialist': return plan.copaySpecialist;
    case 'er': return plan.copayER;
    case 'urgentcare': return plan.copayUrgentCare;
  }
}

export function formatMoney(amount: number): string {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatMoneyRange(low: number, high: number): string {
  return formatMoney(low) + ' – ' + formatMoney(high);
}
