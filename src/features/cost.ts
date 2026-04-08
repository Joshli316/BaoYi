import { t, getLang } from '../i18n';
import { medicalScenarios, defaultSHIPPlan, MedicalScenario } from '../data/scenarios';
import { PlanDetails, calculateCosts, ServiceItem, formatMoney } from '../utils/calculator';
import { saveState, loadState } from '../utils/storage';

interface CostState {
  step: number;
  scenarioId: string;
  useDefaults: boolean;
  plan: PlanDetails;
}

let state: CostState;
let container: HTMLElement;

function init(): void {
  const saved = loadState<CostState>('cost');
  state = saved || {
    step: 1,
    scenarioId: '',
    useDefaults: true,
    plan: { ...defaultSHIPPlan, monthlyPremium: defaultSHIPPlan.monthlyPremium, annualDeductible: defaultSHIPPlan.annualDeductible, coinsurancePercent: defaultSHIPPlan.coinsurancePercent, oopMax: defaultSHIPPlan.oopMax, copayPCP: defaultSHIPPlan.copayPCP, copaySpecialist: defaultSHIPPlan.copaySpecialist, copayER: defaultSHIPPlan.copayER, copayUrgentCare: defaultSHIPPlan.copayUrgentCare },
  };
}

export function render(el: HTMLElement): void {
  container = el;
  init();
  renderStep();
}

export function cleanup(): void {
  saveState('cost', state);
}

function save(): void { saveState('cost', state); }

function renderStep(): void {
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '720px';
  wrapper.style.margin = '0 auto';

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('cost.title')}</h1>
    <p style="margin-bottom:32px;color:var(--text-body);">${t('cost.subtitle')}</p>
  `;

  wrapper.appendChild(renderStepper(state.step, 3));

  const content = document.createElement('div');
  content.className = 'slide-left';

  if (state.step === 1) renderStep1(content);
  else if (state.step === 2) renderStep2(content);
  else renderStep3(content);

  wrapper.appendChild(content);
  container.appendChild(wrapper);
  if ((window as any).lucide) (window as any).lucide.createIcons();
}

function renderStep1(el: HTMLElement): void {
  const lang = getLang();
  el.innerHTML = `
    <h2 style="margin-bottom:16px;">${t('cost.selectScenario')}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
      ${medicalScenarios.map(s => `
        <button class="card scenario-card" data-id="${s.id}" style="padding:16px;text-align:left;cursor:pointer;border-top:4px solid var(--navy-900);">
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <i data-lucide="${s.icon.toLowerCase()}" style="width:20px;height:20px;color:var(--emerald-600);flex-shrink:0;margin-top:2px;"></i>
            <div>
              <strong style="color:var(--text-heading);">${lang === 'zh' ? s.nameZh : s.name}</strong>
              <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px;">${lang === 'zh' ? s.descriptionZh : s.description}</p>
              <div style="margin-top:8px;display:flex;gap:16px;font-size:0.8125rem;">
                <span>${t('common.withInsurance')}: <span class="font-mono">${formatMoney(s.typicalWithSHIP.low)}–${formatMoney(s.typicalWithSHIP.high)}</span></span>
              </div>
            </div>
          </div>
        </button>
      `).join('')}
    </div>
  `;

  el.querySelectorAll('.scenario-card').forEach(btn => {
    btn.addEventListener('click', () => {
      state.scenarioId = (btn as HTMLElement).dataset.id!;
      state.step = 2;
      save();
      renderStep();
    });
  });
}

function renderStep2(el: HTMLElement): void {
  const lang = getLang();
  el.innerHTML = `
    <h2 style="margin-bottom:16px;">${t('cost.planDetails')}</h2>
    <div style="margin-bottom:24px;">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
        <input type="checkbox" id="use-defaults" ${state.useDefaults ? 'checked' : ''} style="width:18px;height:18px;">
        <span style="font-size:0.9375rem;">${t('cost.useDefaults')}</span>
      </label>
    </div>
    <div id="plan-fields" style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));${state.useDefaults ? 'opacity:0.5;pointer-events:none;' : ''}">
      ${renderPlanInputs()}
    </div>
    <div style="display:flex;gap:12px;margin-top:32px;">
      <button class="btn-secondary" id="cost-back">${t('common.back')}</button>
      <button class="btn-primary" id="cost-next">${t('common.next')}</button>
    </div>
  `;

  el.querySelector('#use-defaults')?.addEventListener('change', (e) => {
    state.useDefaults = (e.target as HTMLInputElement).checked;
    if (state.useDefaults) {
      state.plan = { ...defaultSHIPPlan, monthlyPremium: defaultSHIPPlan.monthlyPremium, annualDeductible: defaultSHIPPlan.annualDeductible, coinsurancePercent: defaultSHIPPlan.coinsurancePercent, oopMax: defaultSHIPPlan.oopMax, copayPCP: defaultSHIPPlan.copayPCP, copaySpecialist: defaultSHIPPlan.copaySpecialist, copayER: defaultSHIPPlan.copayER, copayUrgentCare: defaultSHIPPlan.copayUrgentCare };
    }
    save();
    renderStep();
  });

  el.querySelectorAll('.plan-input').forEach(input => {
    input.addEventListener('input', () => {
      const field = (input as HTMLElement).dataset.field! as keyof PlanDetails;
      (state.plan as any)[field] = parseFloat((input as HTMLInputElement).value) || 0;
      save();
    });
  });

  el.querySelector('#cost-back')?.addEventListener('click', () => { state.step = 1; save(); renderStep(); });
  el.querySelector('#cost-next')?.addEventListener('click', () => { state.step = 3; save(); renderStep(); });
}

function renderStep3(el: HTMLElement): void {
  const lang = getLang();
  const scenario = medicalScenarios.find(s => s.id === state.scenarioId)!;
  if (!scenario) { state.step = 1; renderStep(); return; }

  const services: ServiceItem[] = scenario.lineItems.map(li => ({
    description: li.description,
    billedAmount: li.billedAmount,
    usesCopay: false,
  }));

  const plan: PlanDetails = state.useDefaults ? { ...defaultSHIPPlan, monthlyPremium: defaultSHIPPlan.monthlyPremium, annualDeductible: defaultSHIPPlan.annualDeductible, coinsurancePercent: defaultSHIPPlan.coinsurancePercent, oopMax: defaultSHIPPlan.oopMax, copayPCP: defaultSHIPPlan.copayPCP, copaySpecialist: defaultSHIPPlan.copaySpecialist, copayER: defaultSHIPPlan.copayER, copayUrgentCare: defaultSHIPPlan.copayUrgentCare } : state.plan;

  const result = calculateCosts(plan, services);
  const totalBilled = scenario.totalBilled;
  const insurancePct = totalBilled > 0 ? Math.round((result.insurancePaid / totalBilled) * 100) : 0;
  const patientPct = 100 - insurancePct;

  el.innerHTML = `
    <h2 style="margin-bottom:8px;">${lang === 'zh' ? scenario.nameZh : scenario.name}</h2>
    <p style="color:var(--text-muted);margin-bottom:24px;">${lang === 'zh' ? scenario.descriptionZh : scenario.description}</p>

    <div style="display:grid;gap:16px;grid-template-columns:1fr 1fr;margin-bottom:32px;">
      <div class="result-panel-pass" style="text-align:center;">
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:4px;">${t('cost.withPlan')}</p>
        <p class="font-mono" style="font-size:1.75rem;color:var(--emerald-700);font-weight:700;">${formatMoney(result.patientTotal)}</p>
      </div>
      <div class="result-panel-fail" style="text-align:center;">
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:4px;">${t('cost.withoutPlan')}</p>
        <p class="font-mono" style="font-size:1.75rem;color:var(--red-700);font-weight:700;">${formatMoney(totalBilled)}</p>
      </div>
    </div>

    <div style="margin-bottom:32px;">
      <div style="display:flex;justify-content:space-between;font-size:0.8125rem;margin-bottom:8px;">
        <span style="color:var(--emerald-700);">${t('cost.insurancePays')} ${insurancePct}%</span>
        <span style="color:var(--red-700);">${t('cost.yourResponsibility')} ${patientPct}%</span>
      </div>
      <div class="cost-bar">
        <div class="cost-bar-insurance" style="width:${insurancePct}%;"></div>
        <div class="cost-bar-patient" style="width:${patientPct}%;"></div>
      </div>
    </div>

    <h3 style="margin-bottom:12px;">${t('cost.breakdown')}</h3>
    <div class="worked-example" style="margin-bottom:24px;">
      <table style="width:100%;font-size:0.9375rem;">
        <tbody>
          ${scenario.lineItems.map(li => `
            <tr>
              <td style="padding:4px 0;color:var(--text-body);">${lang === 'zh' ? li.descriptionZh : li.description}</td>
              <td style="padding:4px 0;text-align:right;" class="font-mono">${formatMoney(li.billedAmount)}</td>
            </tr>
          `).join('')}
          <tr style="border-top:2px solid var(--border-color);">
            <td style="padding:8px 0;font-weight:700;color:var(--text-heading);">${t('cost.billedAmount')}</td>
            <td style="padding:8px 0;text-align:right;font-weight:700;" class="font-mono">${formatMoney(totalBilled)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:var(--text-body);">${t('cost.deductibleApplied')}</td>
            <td style="padding:4px 0;text-align:right;" class="font-mono">-${formatMoney(result.deductibleApplied)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:var(--text-body);">${t('cost.coinsuranceApplied')}</td>
            <td style="padding:4px 0;text-align:right;" class="font-mono">-${formatMoney(result.coinsuranceTotal)}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:var(--emerald-700);">${t('cost.insurancePays')}</td>
            <td style="padding:4px 0;text-align:right;color:var(--emerald-700);" class="font-mono">${formatMoney(result.insurancePaid)}</td>
          </tr>
          <tr style="border-top:2px solid var(--border-color);">
            <td style="padding:8px 0;font-weight:700;color:var(--red-700);">${t('cost.yourResponsibility')}</td>
            <td style="padding:8px 0;text-align:right;font-weight:700;color:var(--red-700);" class="font-mono">${formatMoney(result.patientTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>

    ${scenario.notes ? `
      <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:16px;font-style:italic;">
        ${lang === 'zh' ? scenario.notesZh : scenario.notes}
      </p>
    ` : ''}

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('cost.basedOnTypical')} ${t('disclaimer')}
    </p>

    <div style="display:flex;gap:12px;">
      <button class="btn-secondary" id="cost-back3">${t('common.back')}</button>
      <button class="btn-primary" id="cost-reset">${t('common.reset')}</button>
    </div>
  `;

  el.querySelector('#cost-back3')?.addEventListener('click', () => { state.step = 2; save(); renderStep(); });
  el.querySelector('#cost-reset')?.addEventListener('click', () => { state = { step: 1, scenarioId: '', useDefaults: true, plan: { ...defaultSHIPPlan, monthlyPremium: defaultSHIPPlan.monthlyPremium, annualDeductible: defaultSHIPPlan.annualDeductible, coinsurancePercent: defaultSHIPPlan.coinsurancePercent, oopMax: defaultSHIPPlan.oopMax, copayPCP: defaultSHIPPlan.copayPCP, copaySpecialist: defaultSHIPPlan.copaySpecialist, copayER: defaultSHIPPlan.copayER, copayUrgentCare: defaultSHIPPlan.copayUrgentCare } }; save(); renderStep(); });
}

function renderPlanInputs(): string {
  const fields: { key: keyof PlanDetails; label: string }[] = [
    { key: 'annualDeductible', label: t('compare.annualDeductible') },
    { key: 'coinsurancePercent', label: t('compare.coinsurance') },
    { key: 'oopMax', label: t('compare.oopMax') },
    { key: 'copayPCP', label: t('compare.copayPCP') },
    { key: 'copaySpecialist', label: t('compare.copaySpecialist') },
    { key: 'copayER', label: t('compare.copayER') },
    { key: 'copayUrgentCare', label: t('compare.copayUrgent') },
  ];
  return fields.map(f => `
    <div>
      <label style="display:block;font-size:0.8125rem;color:var(--text-muted);margin-bottom:4px;">${f.label}</label>
      <input type="number" class="input-field plan-input" data-field="${f.key}" value="${state.plan[f.key]}" min="0">
    </div>
  `).join('');
}

function renderStepper(current: number, total: number): HTMLElement {
  const stepper = document.createElement('div');
  stepper.className = 'stepper';
  for (let i = 1; i <= total; i++) {
    const step = document.createElement('div');
    step.className = `stepper-step ${i < current ? 'completed' : i === current ? 'active' : 'upcoming'}`;
    step.textContent = i < current ? '✓' : String(i);
    stepper.appendChild(step);
    if (i < total) {
      const line = document.createElement('div');
      line.className = `stepper-line ${i < current ? 'completed' : ''}`;
      stepper.appendChild(line);
    }
  }
  return stepper;
}
