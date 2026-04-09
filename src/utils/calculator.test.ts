import { describe, it, expect } from 'vitest';
import { calculateCosts, formatMoney, formatMoneyRange, PlanDetails, ServiceItem } from './calculator';

const basePlan: PlanDetails = {
  monthlyPremium: 500,
  annualDeductible: 1500,
  coinsurancePercent: 20,
  oopMax: 6500,
  copayPCP: 30,
  copaySpecialist: 50,
  copayER: 250,
  copayUrgentCare: 50,
};

describe('calculateCosts', () => {
  it('healthy year: copay-only visit costs just the copay', () => {
    const services: ServiceItem[] = [
      { description: 'PCP', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
    ];
    const result = calculateCosts(basePlan, services);
    expect(result.copaysTotal).toBe(30);
    expect(result.patientTotal).toBe(30);
    expect(result.deductibleApplied).toBe(0);
  });

  it('deductible applies before coinsurance', () => {
    const services: ServiceItem[] = [
      { description: 'ER bill', billedAmount: 5000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services);
    // Deductible: $1500, then 20% of remaining $3500 = $700
    expect(result.deductibleApplied).toBe(1500);
    expect(result.coinsuranceTotal).toBe(700);
    expect(result.patientTotal).toBe(2200);
  });

  it('OOP max caps total patient spending', () => {
    const services: ServiceItem[] = [
      { description: 'Surgery', billedAmount: 50000, usesCopay: false },
      { description: 'Hospital', billedAmount: 30000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services);
    expect(result.patientTotal).toBe(6500); // capped at OOP max
    expect(result.insurancePaid).toBe(80000 - 6500);
  });

  it('partially met deductible continues correctly', () => {
    const services: ServiceItem[] = [
      { description: 'Visit 1', billedAmount: 1000, usesCopay: false },
      { description: 'Visit 2', billedAmount: 2000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services);
    // Visit 1: $1000 all to deductible ($500 remaining)
    // Visit 2: $500 to deductible, then 20% of $1500 = $300
    expect(result.deductibleApplied).toBe(1500);
    expect(result.coinsuranceTotal).toBe(300);
    expect(result.patientTotal).toBe(1800);
  });

  it('deductibleAlreadyMet reduces remaining deductible', () => {
    const services: ServiceItem[] = [
      { description: 'Visit', billedAmount: 3000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services, 1000);
    // Only $500 deductible remaining, then 20% of $2500 = $500
    expect(result.deductibleApplied).toBe(500);
    expect(result.coinsuranceTotal).toBe(500);
    expect(result.patientTotal).toBe(1000);
  });

  it('mixed copay and coinsurance services', () => {
    const services: ServiceItem[] = [
      { description: 'PCP', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
      { description: 'Hospital', billedAmount: 10000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services);
    // Copay: $30
    // Hospital: $1500 deductible + 20% of $8500 = $1700
    expect(result.copaysTotal).toBe(30);
    expect(result.deductibleApplied).toBe(1500);
    expect(result.coinsuranceTotal).toBe(1700);
    expect(result.patientTotal).toBe(3230);
  });

  it('zero-cost scenario', () => {
    const result = calculateCosts(basePlan, []);
    expect(result.patientTotal).toBe(0);
    expect(result.annualPremium).toBe(6000);
    expect(result.totalAnnualCost).toBe(6000);
  });

  it('annualPremium calculated correctly', () => {
    const result = calculateCosts(basePlan, []);
    expect(result.annualPremium).toBe(500 * 12);
  });

  it('totalAnnualCost = premium + patient OOP', () => {
    const services: ServiceItem[] = [
      { description: 'Visit', billedAmount: 2000, usesCopay: false },
    ];
    const result = calculateCosts(basePlan, services);
    expect(result.totalAnnualCost).toBe(result.annualPremium + result.patientTotal);
  });

  it('OOP max of 0 means patient pays nothing after copay', () => {
    const zeroPlan = { ...basePlan, oopMax: 0 };
    const services: ServiceItem[] = [
      { description: 'Visit', billedAmount: 5000, usesCopay: false },
    ];
    const result = calculateCosts(zeroPlan, services);
    expect(result.patientTotal).toBe(0);
  });
});

describe('formatMoney', () => {
  it('formats whole numbers', () => {
    expect(formatMoney(1500)).toBe('$1,500');
  });

  it('formats zero', () => {
    expect(formatMoney(0)).toBe('$0');
  });

  it('formats large numbers', () => {
    expect(formatMoney(100000)).toBe('$100,000');
  });
});

describe('formatMoneyRange', () => {
  it('formats a range', () => {
    expect(formatMoneyRange(30, 65)).toBe('$30 – $65');
  });
});
