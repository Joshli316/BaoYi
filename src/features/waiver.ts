import { t, getLang } from '../i18n';
import { universities, University } from '../data/waiver-criteria';
import { saveState, loadState } from '../utils/storage';
import { renderStepper, refreshIcons } from '../utils/ui';

interface WaiverState {
  step: number;
  universityId: string;
  answers: Record<string, string | number>;
}

let state: WaiverState = { step: 1, universityId: '', answers: {} };
let container: HTMLElement;

export function render(el: HTMLElement): void {
  container = el;
  const saved = loadState<WaiverState>('waiver');
  if (saved) state = saved;
  else state = { step: 1, universityId: '', answers: {} };
  renderCurrentStep();
}

export function cleanup(): void {
  saveState('waiver', state);
}

function save(): void {
  saveState('waiver', state);
}

function renderCurrentStep(): void {
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '720px';
  wrapper.style.margin = '0 auto';

  // Header
  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('waiver.title')}</h1>
    <p style="margin-bottom:32px;color:var(--text-body);">${t('waiver.subtitle')}</p>
  `;

  // Stepper
  wrapper.appendChild(renderStepper(state.step, 3));

  // Step content
  const content = document.createElement('div');
  content.className = 'slide-left';

  if (state.step === 1) renderStep1(content);
  else if (state.step === 2) renderStep2(content);
  else if (state.step === 3) renderStep3(content);

  wrapper.appendChild(content);
  container.appendChild(wrapper);

  refreshIcons();
}

function renderStep1(el: HTMLElement): void {
  const lang = getLang();
  el.innerHTML = `
    <h2 style="margin-bottom:16px;">${t('waiver.selectUniversity')}</h2>
    <div style="background:var(--amber-100);border-left:4px solid var(--amber-500);padding:16px;margin-bottom:24px;">
      <div style="display:flex;align-items:flex-start;gap:8px;">
        <i data-lucide="alert-triangle" style="width:18px;height:18px;color:var(--amber-800);flex-shrink:0;margin-top:2px;"></i>
        <p style="font-size:0.875rem;color:var(--amber-800);">${t('waiver.travelWarning')}</p>
      </div>
    </div>
    <div style="display:grid;gap:12px;">
      ${universities.map(u => `
        <button class="card uni-btn" data-id="${u.id}" style="padding:16px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:var(--text-heading);">${lang === 'zh' ? u.nameZh : u.name}</strong>
            <div style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px;">
              ${t('waiver.shipCost')}: <span class="font-mono">${lang === 'zh' ? u.shipCostZh : u.shipCost}</span>
              &nbsp;·&nbsp;
              ${t('waiver.deadline')}: ${lang === 'zh' ? u.waiverDeadlineZh : u.waiverDeadline}
            </div>
          </div>
          <i data-lucide="chevron-right" style="width:18px;height:18px;color:var(--text-muted);"></i>
        </button>
      `).join('')}
    </div>
  `;

  el.querySelectorAll('.uni-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.universityId = (btn as HTMLElement).dataset.id!;
      state.step = 2;
      state.answers = {};
      save();
      renderCurrentStep();
    });
  });
}

function renderStep2(el: HTMLElement): void {
  const uni = universities.find(u => u.id === state.universityId);
  if (!uni) { state.step = 1; renderCurrentStep(); return; }

  const lang = getLang();

  // J-1 warning for Columbia
  const j1Warning = !uni.j1CanWaive ? `
    <div style="background:var(--red-100);border-left:4px solid var(--red-500);padding:16px;margin-bottom:24px;">
      <div style="display:flex;align-items:flex-start;gap:8px;">
        <i data-lucide="x-circle" style="width:18px;height:18px;color:var(--red-700);flex-shrink:0;margin-top:2px;"></i>
        <p style="font-size:0.875rem;color:var(--red-700);">${t('waiver.j1Warning')}</p>
      </div>
    </div>
  ` : '';

  const criteriaFields = getCriteriaFields(uni);

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
      <h2>${t('waiver.planDetails')}</h2>
      <span class="badge-info">${lang === 'zh' ? uni.nameZh : uni.name}</span>
    </div>
    ${j1Warning}
    <div style="display:grid;gap:20px;">
      ${criteriaFields}
    </div>
    <div style="display:flex;gap:12px;margin-top:32px;">
      <button class="btn-secondary" id="waiver-back">${t('common.back')}</button>
      <button class="btn-primary" id="waiver-next">${t('common.next')}</button>
    </div>
  `;

  // Restore answers
  el.querySelectorAll('[data-criterion]').forEach(input => {
    const id = (input as HTMLElement).dataset.criterion!;
    if (state.answers[id] !== undefined) {
      (input as HTMLInputElement).value = String(state.answers[id]);
    }
  });

  el.querySelectorAll('.bool-group').forEach(group => {
    const id = (group as HTMLElement).dataset.criterion!;
    if (state.answers[id] !== undefined) {
      group.querySelectorAll('button').forEach(btn => {
        const selected = (btn as HTMLElement).dataset.value === String(state.answers[id]);
        btn.setAttribute('aria-pressed', String(selected));
        if (selected) {
          (btn as HTMLElement).style.background = 'var(--emerald-600)';
          (btn as HTMLElement).style.color = 'white';
        }
      });
    }
  });

  // Save answers on change
  el.querySelectorAll('[data-criterion]').forEach(input => {
    input.addEventListener('input', () => {
      const id = (input as HTMLElement).dataset.criterion!;
      const val = (input as HTMLInputElement).value;
      state.answers[id] = input.getAttribute('type') === 'number' ? parseFloat(val) || 0 : val;
      save();
    });
  });

  el.querySelectorAll('.bool-group button').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.bool-group')!;
      const id = (group as HTMLElement).dataset.criterion!;
      state.answers[id] = (btn as HTMLElement).dataset.value!;
      save();
      // Update visual + aria
      group.querySelectorAll('button').forEach(b => {
        (b as HTMLElement).style.background = '';
        (b as HTMLElement).style.color = '';
        b.setAttribute('aria-pressed', 'false');
      });
      (btn as HTMLElement).style.background = 'var(--emerald-600)';
      (btn as HTMLElement).style.color = 'white';
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  el.querySelector('#waiver-back')?.addEventListener('click', () => {
    state.step = 1;
    save();
    renderCurrentStep();
  });

  el.querySelector('#waiver-next')?.addEventListener('click', () => {
    const hasInput = Object.keys(state.answers).length > 0;
    const nudge = el.querySelector('#waiver-nudge');
    if (!hasInput && !nudge) {
      const warn = document.createElement('div');
      warn.id = 'waiver-nudge';
      warn.className = 'result-panel-warn';
      warn.style.marginTop = '16px';
      warn.innerHTML = `<p style="font-size:0.875rem;margin-bottom:12px;">${t('error.noInput')}</p>
        <button class="btn-primary" id="waiver-force" style="font-size:0.875rem;padding:8px 20px;">${t('error.continueAnyway')}</button>`;
      el.querySelector('#waiver-next')!.parentElement!.after(warn);
      warn.querySelector('#waiver-force')!.addEventListener('click', () => { state.step = 3; save(); renderCurrentStep(); });
      return;
    }
    state.step = 3;
    save();
    renderCurrentStep();
  });
}

function renderStep3(el: HTMLElement): void {
  const uni = universities.find(u => u.id === state.universityId);
  if (!uni) { state.step = 1; renderCurrentStep(); return; }

  const lang = getLang();
  const results = evaluateCriteria(uni, state.answers);
  const passCount = results.filter(r => r.status === 'pass').length;
  const failCount = results.filter(r => r.status === 'fail').length;
  const warnCount = results.filter(r => r.status === 'warn').length;

  let verdict: 'eligible' | 'maybe' | 'ineligible';
  let verdictPanel: string;

  if (failCount === 0 && warnCount === 0) {
    verdict = 'eligible';
    verdictPanel = 'result-panel-pass';
  } else if (failCount === 0) {
    verdict = 'maybe';
    verdictPanel = 'result-panel-warn';
  } else {
    verdict = 'ineligible';
    verdictPanel = 'result-panel-fail';
  }

  const verdictIcon = verdict === 'eligible' ? 'shield-check' : verdict === 'maybe' ? 'alert-triangle' : 'x-circle';
  const verdictBadge = verdict === 'eligible' ? 'badge-compliant' : verdict === 'maybe' ? 'badge-warning' : 'badge-error';

  el.innerHTML = `
    <div class="${verdictPanel}" style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:16px;">
        <i data-lucide="${verdictIcon}" style="width:32px;height:32px;flex-shrink:0;"></i>
        <div>
          <span class="${verdictBadge}" style="font-size:1rem;padding:6px 16px;margin-bottom:8px;display:inline-block;">
            ${t(`waiver.result.${verdict}`)}
          </span>
          <p style="margin-top:8px;font-size:0.875rem;color:var(--text-body);">
            ${lang === 'zh' ? uni.nameZh : uni.name} — ${passCount} ${t('waiver.result.passCount')}, ${failCount} ${t('waiver.result.failCount')}, ${warnCount} ${t('waiver.result.warnCount')}
          </p>
        </div>
      </div>
    </div>

    <h3 style="margin-bottom:16px;">${t('common.results')}</h3>
    <div style="display:grid;gap:12px;margin-bottom:32px;">
      ${results.map(r => {
        const icon = r.status === 'pass' ? 'shield-check' : r.status === 'fail' ? 'x-circle' : 'alert-triangle';
        const color = r.status === 'pass' ? 'var(--emerald-600)' : r.status === 'fail' ? 'var(--red-600)' : 'var(--amber-600)';
        const badge = r.status === 'pass' ? 'badge-compliant' : r.status === 'fail' ? 'badge-error' : 'badge-warning';
        const label = t(`waiver.result.${r.status === 'pass' ? 'pass' : r.status === 'fail' ? 'fail' : 'warn'}`);
        return `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-color);">
            <i data-lucide="${icon}" style="width:18px;height:18px;color:${color};flex-shrink:0;"></i>
            <span style="flex:1;color:var(--text-heading);font-size:0.9375rem;">${r.label}</span>
            <span class="${badge}" style="font-size:0.75rem;">${label}</span>
          </div>
        `;
      }).join('')}
    </div>

    ${uni.waiverUrl ? `
      <div style="margin-bottom:24px;">
        <a href="${uni.waiverUrl}" target="_blank" rel="noopener" class="btn-ghost" style="display:inline-flex;align-items:center;gap:6px;">
          <i data-lucide="external-link" style="width:16px;height:16px;"></i>
          ${t('waiver.waiverLink')}
        </a>
      </div>
    ` : ''}

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>

    <div style="display:flex;gap:12px;">
      <button class="btn-secondary" id="waiver-back3">${t('common.back')}</button>
      <button class="btn-primary" id="waiver-reset">${t('common.reset')}</button>
    </div>

    <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--border-color);">
      <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:12px;">${t('common.whatsNext')}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <a href="#compare" class="btn-ghost" style="font-size:0.875rem;display:inline-flex;align-items:center;gap:6px;">
          <i data-lucide="columns-3" style="width:16px;height:16px;"></i> ${t('nav.compare')}
        </a>
        <a href="#cost" class="btn-ghost" style="font-size:0.875rem;display:inline-flex;align-items:center;gap:6px;">
          <i data-lucide="calculator" style="width:16px;height:16px;"></i> ${t('nav.cost')}
        </a>
      </div>
    </div>
  `;

  el.querySelector('#waiver-back3')?.addEventListener('click', () => {
    state.step = 2;
    save();
    renderCurrentStep();
  });

  el.querySelector('#waiver-reset')?.addEventListener('click', () => {
    state = { step: 1, universityId: '', answers: {} };
    save();
    renderCurrentStep();
  });
}

// --- Helpers ---

function getCriteriaFields(uni: University): string {
  const lang = getLang();
  const boolCriteria = uni.criteria.filter(c => c.type === 'boolean');
  const numCriteria = uni.criteria.filter(c => c.type === 'numeric');

  const numFields = numCriteria.map(c => {
    const label = lang === 'zh' ? c.labelZh : c.label;
    return `
    <div>
      <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-heading);font-size:0.9375rem;">
        ${label}
      </label>
      <input type="number" class="input-field" data-criterion="${c.id}" placeholder="0" min="0" step="1">
      ${c.threshold !== undefined ? `<p style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px;">${c.comparison === 'lte' ? '≤' : '≥'} <span class="font-mono">$${c.threshold.toLocaleString()}</span> ${lang === 'zh' ? '才能通过' : 'required'}</p>` : ''}
    </div>
  `;}).join('');

  const boolFields = boolCriteria.map(c => {
    const label = lang === 'zh' ? c.labelZh : c.label;
    return `
    <div>
      <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-heading);font-size:0.9375rem;">
        ${label}
      </label>
      <div class="bool-group" data-criterion="${c.id}" style="display:flex;gap:8px;">
        <button class="btn-secondary" data-value="yes" style="flex:1;padding:8px 16px;">${t('waiver.yes')}</button>
        <button class="btn-secondary" data-value="no" style="flex:1;padding:8px 16px;">${t('waiver.no')}</button>
        <button class="btn-secondary" data-value="unsure" style="flex:1;padding:8px 16px;">${t('waiver.unsure')}</button>
      </div>
    </div>
  `;}).join('');

  return numFields + boolFields;
}

interface CriterionResult {
  id: string;
  label: string;
  status: 'pass' | 'fail' | 'warn';
}

function evaluateCriteria(uni: University, answers: Record<string, string | number>): CriterionResult[] {
  const lang = getLang();
  return uni.criteria.map(c => {
    const answer = answers[c.id];
    const label = lang === 'zh' ? c.labelZh : c.label;

    if (c.type === 'boolean') {
      if (answer === 'yes') return { id: c.id, label, status: 'pass' as const };
      if (answer === 'no') return { id: c.id, label, status: 'fail' as const };
      return { id: c.id, label, status: 'warn' as const };
    }

    if (c.type === 'numeric' && c.threshold !== undefined) {
      const numAnswer = typeof answer === 'number' ? answer : parseFloat(String(answer));
      if (isNaN(numAnswer) || answer === undefined || answer === '') return { id: c.id, label, status: 'warn' as const };

      if (c.comparison === 'lte') {
        return { id: c.id, label, status: numAnswer <= c.threshold ? 'pass' as const : 'fail' as const };
      }
      if (c.comparison === 'gte') {
        return { id: c.id, label, status: numAnswer >= c.threshold ? 'pass' as const : 'fail' as const };
      }
    }

    return { id: c.id, label, status: 'warn' as const };
  });
}
