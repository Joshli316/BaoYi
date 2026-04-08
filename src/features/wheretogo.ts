import { t, getLang } from '../i18n';
import { triageSituations, careLevels, TriageSituation } from '../data/care-triage';

let container: HTMLElement;
let selectedId: string | null = null;

export function render(el: HTMLElement): void {
  container = el;
  selectedId = null;
  renderUI();
}

export function cleanup(): void {
  selectedId = null;
}

function renderUI(): void {
  const lang = getLang();
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '960px';
  wrapper.style.margin = '0 auto';

  if (selectedId) {
    renderResult(wrapper);
  } else {
    renderSelector(wrapper);
  }

  container.appendChild(wrapper);
  if ((window as any).lucide) (window as any).lucide.createIcons();
}

function renderSelector(wrapper: HTMLElement): void {
  const lang = getLang();
  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('wheretogo.title')}</h1>
    <p style="margin-bottom:24px;color:var(--text-body);">${t('wheretogo.subtitle')}</p>

    <div class="result-panel-fail" style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <i data-lucide="phone" style="width:24px;height:24px;flex-shrink:0;"></i>
        <div>
          <p style="font-weight:700;font-size:1.0625rem;">${t('wheretogo.emergency911')}</p>
        </div>
      </div>
    </div>

    <h2 style="margin-bottom:16px;">${t('wheretogo.selectSituation')}</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">
      ${triageSituations.map(s => {
        const levelColor = s.isEmergency ? 'var(--red-500)' : s.recommendedLevel === 'urgent' ? 'var(--amber-500)' : 'var(--emerald-500)';
        return `
          <button class="card situation-btn" data-id="${s.id}" style="padding:16px;text-align:left;cursor:pointer;border-top:3px solid ${levelColor};">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <i data-lucide="${s.icon}" style="width:20px;height:20px;color:${levelColor};flex-shrink:0;margin-top:2px;"></i>
              <div>
                <strong style="color:var(--text-heading);font-size:0.9375rem;">${lang === 'zh' ? s.situationZh : s.situation}</strong>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
                  ${t(`wheretogo.level.${s.recommendedLevel}`)}
                </div>
              </div>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  wrapper.querySelectorAll('.situation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedId = (btn as HTMLElement).dataset.id!;
      renderUI();
    });
  });
}

function renderResult(wrapper: HTMLElement): void {
  const lang = getLang();
  const situation = triageSituations.find(s => s.id === selectedId)!;
  const level = careLevels.find(l => l.id === situation.recommendedLevel)!;

  const panelClass = situation.isEmergency ? 'result-panel-fail' : situation.recommendedLevel === 'urgent' ? 'result-panel-warn' : 'result-panel-pass';
  const icon = situation.isEmergency ? 'alert-triangle' : situation.recommendedLevel === 'urgent' ? 'clock' : situation.recommendedLevel === 'primary' ? 'building-2' : 'monitor';

  wrapper.innerHTML = `
    ${situation.isEmergency ? `
      <div class="result-panel-fail" style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <i data-lucide="phone" style="width:24px;height:24px;flex-shrink:0;"></i>
          <p style="font-weight:700;">${t('wheretogo.emergency911')}</p>
        </div>
      </div>
    ` : ''}

    <button class="btn-ghost" id="triage-back" style="margin-bottom:16px;display:flex;align-items:center;gap:6px;">
      <i data-lucide="arrow-left" style="width:16px;height:16px;"></i>
      ${t('common.back')}
    </button>

    <h1 style="margin-bottom:24px;">${lang === 'zh' ? situation.situationZh : situation.situation}</h1>

    <div class="${panelClass}" style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:16px;">
        <i data-lucide="${icon}" style="width:32px;height:32px;flex-shrink:0;"></i>
        <div>
          <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:4px;">${t('wheretogo.recommendation')}</p>
          <p style="font-size:1.5rem;font-weight:700;color:var(--text-heading);">${t(`wheretogo.level.${situation.recommendedLevel}`)}</p>
        </div>
      </div>
    </div>

    <div style="display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-bottom:32px;">
      <div class="card" style="padding:20px;">
        <h3 style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i data-lucide="info" style="width:18px;height:18px;color:var(--emerald-600);"></i>
          ${t('wheretogo.why')}
        </h3>
        <p style="color:var(--text-body);">${lang === 'zh' ? situation.reasonZh : situation.reason}</p>
      </div>

      <div class="card" style="padding:20px;">
        <h3 style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i data-lucide="dollar-sign" style="width:18px;height:18px;color:var(--emerald-600);"></i>
          ${t('wheretogo.cost')}
        </h3>
        <div style="display:grid;gap:8px;">
          <div>
            <span style="font-size:0.8125rem;color:var(--text-muted);">${t('common.withInsurance')}</span>
            <p class="font-mono" style="font-size:1.125rem;color:var(--text-heading);">${lang === 'zh' ? situation.costWithInsuranceZh : situation.costWithInsurance}</p>
          </div>
          <div>
            <span style="font-size:0.8125rem;color:var(--text-muted);">${t('common.withoutInsurance')}</span>
            <p class="font-mono" style="font-size:1.125rem;color:var(--red-700);">${lang === 'zh' ? situation.costWithoutInsuranceZh : situation.costWithoutInsurance}</p>
          </div>
        </div>
      </div>

      <div class="card" style="padding:20px;">
        <h3 style="margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i data-lucide="clipboard-list" style="width:18px;height:18px;color:var(--emerald-600);"></i>
          ${t('wheretogo.whatToBring')}
        </h3>
        <ul style="list-style:none;display:grid;gap:6px;">
          ${(lang === 'zh' ? situation.whatToBringZh : situation.whatToBring).map(item =>
            `<li style="display:flex;align-items:flex-start;gap:8px;"><i data-lucide="check" style="width:16px;height:16px;color:var(--emerald-600);flex-shrink:0;margin-top:2px;"></i><span style="font-size:0.9375rem;">${item}</span></li>`
          ).join('')}
        </ul>
      </div>
    </div>

    ${!situation.isEmergency ? `
      <div style="background:var(--amber-100);border-left:4px solid var(--amber-500);padding:16px;margin-bottom:32px;">
        <h3 style="margin-bottom:8px;color:var(--amber-800);display:flex;align-items:center;gap:8px;">
          <i data-lucide="alert-triangle" style="width:18px;height:18px;"></i>
          ${t('wheretogo.whenER')}
        </h3>
        <p style="font-size:0.9375rem;color:var(--amber-800);">${lang === 'zh' ? situation.whenToGoERZh : situation.whenToGoER}</p>
      </div>
    ` : ''}

    <h2 style="margin-bottom:16px;">${t('wheretogo.costComparison')}</h2>
    <div style="overflow-x:auto;">
      <table class="comparison-table" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th>${lang === 'zh' ? '就医方式' : 'Care Level'}</th>
            <th>${t('common.withInsurance')}</th>
            <th>${t('common.withoutInsurance')}</th>
            <th>${lang === 'zh' ? '开放时间' : 'Hours'}</th>
          </tr>
        </thead>
        <tbody>
          ${careLevels.map(cl => `
            <tr${cl.id === situation.recommendedLevel ? ' style="font-weight:600;"' : ''}>
              <td>${lang === 'zh' ? cl.nameZh : cl.name} ${cl.id === situation.recommendedLevel ? '←' : ''}</td>
              <td><span class="font-mono">${cl.typicalCostWithInsurance}</span></td>
              <td><span class="font-mono">${cl.typicalCostWithoutInsurance}</span></td>
              <td style="font-size:0.875rem;">${lang === 'zh' ? cl.hoursZh : cl.hours}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  wrapper.querySelector('#triage-back')?.addEventListener('click', () => {
    selectedId = null;
    renderUI();
  });
}
