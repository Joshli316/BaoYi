import { refreshIcons } from '../utils/ui';
import { t, getLang } from '../i18n';
import { PlanDetails, calculateCosts, ServiceItem, formatMoney } from '../utils/calculator';
import { saveState, loadState } from '../utils/storage';

interface CompareState {
  plans: PlanDetails[];
  planNames: string[];
  activeScenario: number;
}

const defaultPlan: PlanDetails = {
  monthlyPremium: 0, annualDeductible: 0, coinsurancePercent: 20,
  oopMax: 9200, copayPCP: 30, copaySpecialist: 50, copayER: 250, copayUrgentCare: 50,
};

const scenarios: { services: ServiceItem[]; }[] = [
  { services: [ // Healthy Year
    { description: 'PCP Visit', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
    { description: 'Prescription', billedAmount: 30, usesCopay: false },
  ]},
  { services: [ // Moderate Use
    { description: 'PCP Visit #1', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
    { description: 'PCP Visit #2', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
    { description: 'PCP Visit #3', billedAmount: 200, usesCopay: true, copayType: 'pcp' },
    { description: 'Specialist Visit', billedAmount: 350, usesCopay: true, copayType: 'specialist' },
    { description: 'Prescription #1', billedAmount: 30, usesCopay: false },
    { description: 'Prescription #2', billedAmount: 30, usesCopay: false },
    { description: 'Urgent Care', billedAmount: 300, usesCopay: true, copayType: 'urgentcare' },
  ]},
  { services: [ // Major Event
    { description: 'ER Visit', billedAmount: 5000, usesCopay: true, copayType: 'er' },
    { description: 'Hospitalization', billedAmount: 25000, usesCopay: false },
    { description: 'Surgery', billedAmount: 15000, usesCopay: false },
    { description: 'Follow-up #1', billedAmount: 300, usesCopay: true, copayType: 'specialist' },
    { description: 'Follow-up #2', billedAmount: 300, usesCopay: true, copayType: 'specialist' },
  ]},
];

function esc(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

let state: CompareState;
let container: HTMLElement;

function init(): void {
  const saved = loadState<CompareState>('compare');
  state = saved || { plans: [{ ...defaultPlan }], planNames: ['Plan 1'], activeScenario: 0 };
}

export function render(el: HTMLElement): void {
  container = el;
  init();
  renderUI();
}

export function cleanup(): void {
  saveState('compare', state);
}

function save(): void { saveState('compare', state); }

function renderUI(): void {
  const lang = getLang();
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '960px';
  wrapper.style.margin = '0 auto';

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('compare.title')}</h1>
    <p style="margin-bottom:32px;color:var(--text-body);">${t('compare.subtitle')}</p>

    <div id="plans-container" style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));margin-bottom:32px;"></div>

    ${state.plans.length < 3 ? `<button class="btn-secondary" id="add-plan-btn" style="margin-bottom:32px;">+ ${t('compare.addPlan')}</button>` : ''}

    <div style="margin-bottom:24px;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-secondary scenario-tab ${state.activeScenario === 0 ? 'active' : ''}" data-scenario="0" style="${state.activeScenario === 0 ? 'background:var(--emerald-600);color:white;border-color:var(--emerald-600);' : ''}">
          ${t('compare.scenario.healthy')}
        </button>
        <button class="btn-secondary scenario-tab ${state.activeScenario === 1 ? 'active' : ''}" data-scenario="1" style="${state.activeScenario === 1 ? 'background:var(--emerald-600);color:white;border-color:var(--emerald-600);' : ''}">
          ${t('compare.scenario.moderate')}
        </button>
        <button class="btn-secondary scenario-tab ${state.activeScenario === 2 ? 'active' : ''}" data-scenario="2" style="${state.activeScenario === 2 ? 'background:var(--emerald-600);color:white;border-color:var(--emerald-600);' : ''}">
          ${t('compare.scenario.major')}
        </button>
      </div>
      <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:8px;">
        ${state.activeScenario === 0 ? t('compare.scenario.healthyDesc') : state.activeScenario === 1 ? t('compare.scenario.moderateDesc') : t('compare.scenario.majorDesc')}
      </p>
    </div>

    <div id="results-container"></div>

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  // Render plan input cards
  const plansContainer = wrapper.querySelector('#plans-container')!;
  state.plans.forEach((plan, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '20px';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <input type="text" class="input-field plan-name" data-idx="${i}" value="${esc(state.planNames[i] || `Plan ${i + 1}`)}" style="font-weight:700;border:none;padding:4px 0;font-size:1.125rem;background:transparent;color:var(--text-heading);">
        ${state.plans.length > 1 ? `<button class="btn-ghost remove-plan" data-idx="${i}" style="font-size:0.8125rem;color:var(--red-600);">${t('compare.removePlan')}</button>` : ''}
      </div>
      ${renderPlanFields(plan, i)}
    `;
    plansContainer.appendChild(card);
  });

  // Calculate and render results
  renderResults(wrapper.querySelector('#results-container')!);

  container.appendChild(wrapper);

  // Event listeners
  wrapper.querySelectorAll('.plan-field').forEach(input => {
    input.addEventListener('input', () => {
      const idx = parseInt((input as HTMLElement).dataset.idx!);
      const field = (input as HTMLElement).dataset.field! as keyof PlanDetails;
      (state.plans[idx] as any)[field] = parseFloat((input as HTMLInputElement).value) || 0;
      save();
      renderResults(wrapper.querySelector('#results-container')!);
    });
  });

  wrapper.querySelectorAll('.plan-name').forEach(input => {
    input.addEventListener('input', () => {
      const idx = parseInt((input as HTMLElement).dataset.idx!);
      state.planNames[idx] = (input as HTMLInputElement).value;
      save();
    });
  });

  wrapper.querySelectorAll('.remove-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt((btn as HTMLElement).dataset.idx!);
      state.plans.splice(idx, 1);
      state.planNames.splice(idx, 1);
      save();
      renderUI();
    });
  });

  wrapper.querySelector('#add-plan-btn')?.addEventListener('click', () => {
    state.plans.push({ ...defaultPlan });
    state.planNames.push(`Plan ${state.plans.length}`);
    save();
    renderUI();
  });

  wrapper.querySelectorAll('.scenario-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeScenario = parseInt((btn as HTMLElement).dataset.scenario!);
      save();
      renderUI();
    });
  });

  refreshIcons();
}

function renderPlanFields(plan: PlanDetails, idx: number): string {
  const fields: { key: keyof PlanDetails; label: string }[] = [
    { key: 'monthlyPremium', label: t('compare.monthlyPremium') },
    { key: 'annualDeductible', label: t('compare.annualDeductible') },
    { key: 'coinsurancePercent', label: t('compare.coinsurance') },
    { key: 'oopMax', label: t('compare.oopMax') },
    { key: 'copayPCP', label: t('compare.copayPCP') },
    { key: 'copaySpecialist', label: t('compare.copaySpecialist') },
    { key: 'copayER', label: t('compare.copayER') },
    { key: 'copayUrgentCare', label: t('compare.copayUrgent') },
  ];

  return fields.map(f => `
    <div style="margin-bottom:12px;">
      <label style="display:block;font-size:0.8125rem;color:var(--text-muted);margin-bottom:4px;">${f.label}</label>
      <input type="number" class="input-field plan-field" data-idx="${idx}" data-field="${f.key}" value="${plan[f.key]}" min="0" style="padding:8px 12px;">
    </div>
  `).join('');
}

function renderResults(el: HTMLElement): void {
  const lang = getLang();
  const scenario = scenarios[state.activeScenario];
  const results = state.plans.map(plan => calculateCosts(plan, scenario.services));

  // Find best value (lowest total annual cost)
  let bestIdx = 0;
  let bestCost = Infinity;
  results.forEach((r, i) => {
    if (r.totalAnnualCost < bestCost) { bestCost = r.totalAnnualCost; bestIdx = i; }
  });

  el.innerHTML = `
    <div style="overflow-x:auto;">
      <table class="comparison-table" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th scope="col" style="min-width:160px;"></th>
            ${state.plans.map((_, i) => `
              <th scope="col" style="min-width:140px;" class="${i === bestIdx ? 'best-value' : ''}">
                ${esc(state.planNames[i] || `Plan ${i + 1}`)}
                ${i === bestIdx ? `<span class="badge-compliant" style="display:block;margin-top:4px;font-size:0.6875rem;">${t('compare.bestValue')}</span>` : ''}
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:600;">${t('compare.premiumTotal')}</td>
            ${results.map((r, i) => `<td class="${i === bestIdx ? 'best-value' : ''}"><span class="font-mono">${formatMoney(r.annualPremium)}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight:600;">${t('cost.deductibleApplied')}</td>
            ${results.map((r, i) => `<td class="${i === bestIdx ? 'best-value' : ''}"><span class="font-mono">${formatMoney(r.deductibleApplied)}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight:600;">${t('cost.coinsuranceApplied')}</td>
            ${results.map((r, i) => `<td class="${i === bestIdx ? 'best-value' : ''}"><span class="font-mono">${formatMoney(r.coinsuranceTotal)}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight:600;">${t('compare.oopTotal')}</td>
            ${results.map((r, i) => `<td class="${i === bestIdx ? 'best-value' : ''}"><span class="font-mono">${formatMoney(r.patientTotal)}</span></td>`).join('')}
          </tr>
          <tr style="border-top:3px solid var(--navy-900);">
            <td style="font-weight:700;font-size:1.0625rem;">${t('compare.totalAnnual')}</td>
            ${results.map((r, i) => `
              <td class="${i === bestIdx ? 'best-value' : ''}" style="font-weight:700;">
                <span class="font-mono" style="font-size:1.125rem;">${formatMoney(r.totalAnnualCost)}</span>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
