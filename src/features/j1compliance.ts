import { t, getLang } from '../i18n';
import { j1Requirements, ratingAgencies, j1Source } from '../data/j1-minimums';
import { saveState, loadState } from '../utils/storage';
import { renderStepper, refreshIcons } from '../utils/ui';

interface J1State {
  step: number;
  answers: Record<string, number | string>;
}

let state: J1State = { step: 1, answers: {} };
let container: HTMLElement;

export function render(el: HTMLElement): void {
  container = el;
  const saved = loadState<J1State>('j1');
  if (saved) state = saved;
  else state = { step: 1, answers: {} };
  renderCurrentStep();
}

export function cleanup(): void {
  saveState('j1', state);
}

function save(): void { saveState('j1', state); }

function renderCurrentStep(): void {
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '720px';
  wrapper.style.margin = '0 auto';

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('j1.title')}</h1>
    <p style="margin-bottom:32px;color:var(--text-body);">${t('j1.subtitle')}</p>
  `;

  wrapper.appendChild(renderStepper(state.step, 2));

  const content = document.createElement('div');
  content.className = 'slide-left';

  if (state.step === 1) renderInputStep(content);
  else renderResultStep(content);

  wrapper.appendChild(content);
  container.appendChild(wrapper);
  refreshIcons();
}

function renderInputStep(el: HTMLElement): void {
  const lang = getLang();
  const numericReqs = j1Requirements.filter(r => r.type === 'numeric');

  el.innerHTML = `
    <div style="display:grid;gap:20px;">
      ${numericReqs.map(req => `
        <div>
          <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-heading);font-size:0.9375rem;">
            ${lang === 'zh' ? req.labelZh : req.label}
          </label>
          <input type="number" class="input-field" data-req="${req.id}" placeholder="0" min="0" step="${req.unit === '%' ? '1' : '100'}"
            value="${state.answers[req.id] !== undefined ? state.answers[req.id] : ''}">
          <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:4px;">
            ${req.comparison === 'gte' ? '≥' : '≤'} <span class="font-mono">${req.unit === '%' ? req.threshold + '%' : '$' + (req.threshold || 0).toLocaleString()}</span>
            ${t('j1.federalMinimum')}
          </p>
        </div>
      `).join('')}

      <div>
        <label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-heading);font-size:0.9375rem;">
          ${t('j1.insurerRating')}
        </label>
        <div style="display:grid;gap:8px;">
          <button class="btn-secondary rating-btn" data-value="aMinus" style="text-align:left;padding:12px 16px;">
            ${t('j1.ratingAMinus')}
          </button>
          <button class="btn-secondary rating-btn" data-value="below" style="text-align:left;padding:12px 16px;">
            ${t('j1.ratingBelow')}
          </button>
          <button class="btn-secondary rating-btn" data-value="govt" style="text-align:left;padding:12px 16px;">
            ${t('j1.ratingGovt')}
          </button>
        </div>
        <div style="margin-top:12px;font-size:0.8125rem;color:var(--text-muted);">
          <strong>${t('j1.acceptedAgencies')}</strong>
          ${ratingAgencies.map(a => `${lang === 'zh' ? a.nameZh : a.name} ${a.minimumRating}`).join(' · ')}
        </div>
      </div>
    </div>

    <div style="background:var(--amber-100);border-left:4px solid var(--amber-500);padding:16px;margin-top:24px;">
      <div style="display:flex;align-items:flex-start;gap:8px;">
        <i data-lucide="alert-triangle" style="width:18px;height:18px;color:var(--amber-800);flex-shrink:0;margin-top:2px;"></i>
        <p style="font-size:0.875rem;color:var(--amber-800);">${t('j1.dependentNote')}</p>
      </div>
    </div>

    <div style="margin-top:32px;">
      <button class="btn-primary" id="j1-check">${t('common.next')}</button>
    </div>
  `;

  el.querySelectorAll('[data-req]').forEach(input => {
    input.addEventListener('input', () => {
      const id = (input as HTMLElement).dataset.req!;
      state.answers[id] = parseFloat((input as HTMLInputElement).value) || 0;
      save();
    });
  });

  const savedRating = state.answers['insurer-rating'];
  el.querySelectorAll('.rating-btn').forEach(btn => {
    const selected = (btn as HTMLElement).dataset.value === savedRating;
    btn.setAttribute('aria-pressed', String(selected));
    if (selected) {
      (btn as HTMLElement).style.background = 'var(--emerald-600)';
      (btn as HTMLElement).style.color = 'white';
    }
    btn.addEventListener('click', () => {
      state.answers['insurer-rating'] = (btn as HTMLElement).dataset.value!;
      save();
      el.querySelectorAll('.rating-btn').forEach(b => {
        (b as HTMLElement).style.background = '';
        (b as HTMLElement).style.color = '';
        b.setAttribute('aria-pressed', 'false');
      });
      (btn as HTMLElement).style.background = 'var(--emerald-600)';
      (btn as HTMLElement).style.color = 'white';
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  el.querySelector('#j1-check')?.addEventListener('click', () => {
    const hasInput = Object.keys(state.answers).length > 0;
    const nudge = el.querySelector('#j1-nudge');
    if (!hasInput && !nudge) {
      const warn = document.createElement('div');
      warn.id = 'j1-nudge';
      warn.className = 'result-panel-warn';
      warn.style.marginTop = '16px';
      warn.innerHTML = `<p style="font-size:0.875rem;margin-bottom:12px;">${t('error.noInput')}</p>
        <button class="btn-primary" id="j1-force" style="font-size:0.875rem;padding:8px 20px;">${t('error.continueAnyway')}</button>`;
      el.querySelector('#j1-check')!.parentElement!.after(warn);
      warn.querySelector('#j1-force')!.addEventListener('click', () => { state.step = 2; save(); renderCurrentStep(); });
      return;
    }
    state.step = 2;
    save();
    renderCurrentStep();
  });
}

function renderResultStep(el: HTMLElement): void {
  const lang = getLang();
  const results = evaluateJ1(state.answers);
  const allPass = results.every(r => r.status === 'pass');
  const anyFail = results.some(r => r.status === 'fail');

  const verdict = allPass ? 'compliant' : anyFail ? 'nonCompliant' : 'partial';
  const panelClass = allPass ? 'result-panel-pass' : anyFail ? 'result-panel-fail' : 'result-panel-warn';
  const icon = allPass ? 'shield-check' : anyFail ? 'x-circle' : 'alert-triangle';
  const badge = allPass ? 'badge-compliant' : anyFail ? 'badge-error' : 'badge-warning';

  el.innerHTML = `
    <div class="${panelClass}" style="margin-bottom:32px;">
      <div style="display:flex;align-items:center;gap:16px;">
        <i data-lucide="${icon}" style="width:32px;height:32px;flex-shrink:0;"></i>
        <span class="${badge}" style="font-size:1rem;padding:6px 16px;">${t(`j1.result.${verdict}`)}</span>
      </div>
    </div>

    <div style="display:grid;gap:12px;margin-bottom:32px;">
      ${results.map(r => {
        const rIcon = r.status === 'pass' ? 'shield-check' : r.status === 'fail' ? 'x-circle' : 'alert-triangle';
        const color = r.status === 'pass' ? 'var(--emerald-600)' : r.status === 'fail' ? 'var(--red-600)' : 'var(--amber-600)';
        const rBadge = r.status === 'pass' ? 'badge-compliant' : r.status === 'fail' ? 'badge-error' : 'badge-warning';
        return `
          <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--bg-card);border:1px solid var(--border-color);">
            <i data-lucide="${rIcon}" style="width:18px;height:18px;color:${color};flex-shrink:0;"></i>
            <span style="flex:1;color:var(--text-heading);font-size:0.9375rem;">${r.label}</span>
            ${r.value ? `<span class="font-mono" style="color:var(--text-muted);">${r.value}</span>` : ''}
            <span class="${rBadge}" style="font-size:0.75rem;">${r.status === 'pass' ? '✓' : r.status === 'fail' ? '✗' : '?'}</span>
          </div>
        `;
      }).join('')}
    </div>

    ${anyFail ? `
      <div class="result-panel-fail" style="margin-bottom:24px;">
        <div style="display:flex;align-items:flex-start;gap:8px;">
          <i data-lucide="alert-triangle" style="width:18px;height:18px;flex-shrink:0;margin-top:2px;"></i>
          <p style="font-size:0.875rem;">${t('j1.willfulFailure')}</p>
        </div>
      </div>
    ` : ''}

    <div style="margin-bottom:24px;">
      <a href="${j1Source.url}" target="_blank" rel="noopener" class="btn-ghost" style="display:inline-flex;align-items:center;gap:6px;">
        <i data-lucide="external-link" style="width:16px;height:16px;"></i>
        ${t('j1.source')} — ${j1Source.title}
      </a>
    </div>

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>

    <div style="display:flex;gap:12px;">
      <button class="btn-secondary" id="j1-back">${t('common.back')}</button>
      <button class="btn-primary" id="j1-reset">${t('common.reset')}</button>
    </div>

    <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--border-color);">
      <p style="font-size:0.8125rem;color:var(--text-muted);margin-bottom:12px;">${t('common.whatsNext')}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <a href="#cost" class="btn-ghost" style="font-size:0.875rem;display:inline-flex;align-items:center;gap:6px;">
          <i data-lucide="calculator" style="width:16px;height:16px;"></i> ${t('nav.cost')}
        </a>
        <a href="#compare" class="btn-ghost" style="font-size:0.875rem;display:inline-flex;align-items:center;gap:6px;">
          <i data-lucide="columns-3" style="width:16px;height:16px;"></i> ${t('nav.compare')}
        </a>
      </div>
    </div>
  `;

  el.querySelector('#j1-back')?.addEventListener('click', () => {
    state.step = 1; save(); renderCurrentStep();
  });
  el.querySelector('#j1-reset')?.addEventListener('click', () => {
    state = { step: 1, answers: {} }; save(); renderCurrentStep();
  });
}

interface J1Result {
  id: string;
  label: string;
  value: string;
  status: 'pass' | 'fail' | 'warn';
}

function evaluateJ1(answers: Record<string, number | string>): J1Result[] {
  const lang = getLang();
  const results: J1Result[] = [];

  for (const req of j1Requirements) {
    const label = lang === 'zh' ? req.labelZh : req.label;

    if (req.type === 'numeric') {
      const val = typeof answers[req.id] === 'number' ? answers[req.id] as number : parseFloat(String(answers[req.id]));
      const displayVal = req.unit === '%' ? `${val || '?'}%` : `$${(val || 0).toLocaleString()}`;

      if (isNaN(val) || answers[req.id] === undefined || answers[req.id] === '') {
        results.push({ id: req.id, label, value: '?', status: 'warn' });
        continue;
      }

      if (req.comparison === 'gte') {
        results.push({ id: req.id, label, value: displayVal, status: val >= (req.threshold || 0) ? 'pass' : 'fail' });
      } else if (req.comparison === 'lte') {
        results.push({ id: req.id, label, value: displayVal, status: val <= (req.threshold || 0) ? 'pass' : 'fail' });
      }
    } else if (req.type === 'rating') {
      const rating = answers['insurer-rating'];
      if (rating === 'aMinus' || rating === 'govt') {
        results.push({ id: req.id, label, value: '', status: 'pass' });
      } else if (rating === 'below') {
        results.push({ id: req.id, label, value: '', status: 'fail' });
      } else {
        results.push({ id: req.id, label, value: '', status: 'warn' });
      }
    }
  }

  return results;
}
