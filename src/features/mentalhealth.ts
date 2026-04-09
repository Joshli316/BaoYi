import { refreshIcons } from '../utils/ui';
import { t, getLang } from '../i18n';
import { mentalHealthResources, findTherapistSteps, insuranceCoverageInfo, ResourceCategory } from '../data/mental-health-resources';

let container: HTMLElement;
let activeCategory: ResourceCategory | 'all' = 'all';

export function render(el: HTMLElement): void {
  container = el;
  activeCategory = 'all';
  renderUI();
}

export function cleanup(): void {}

function renderUI(): void {
  const lang = getLang();
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '960px';
  wrapper.style.margin = '0 auto';

  const crisisResources = mentalHealthResources.filter(r => r.isCrisis);
  const categories: (ResourceCategory | 'all')[] = ['all', 'crisis', 'campus', 'insurance', 'online', 'free'];
  const categoryLabels: Record<string, string> = {
    all: t('mh.category.all'),
    crisis: t('mh.category.crisis'),
    campus: t('mh.category.campus'),
    insurance: t('mh.category.insurance'),
    online: t('mh.category.online'),
    free: t('mh.category.free'),
  };

  const filtered = activeCategory === 'all'
    ? mentalHealthResources
    : mentalHealthResources.filter(r => r.category === activeCategory);

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('mh.title')}</h1>
    <p style="margin-bottom:24px;color:var(--text-body);">${t('mh.subtitle')}</p>

    <!-- Crisis Banner -->
    <div class="result-panel-fail" style="margin-bottom:32px;">
      <h2 style="margin-bottom:8px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="phone" style="width:24px;height:24px;"></i>
        ${t('mh.crisis.title')}
      </h2>
      <p style="margin-bottom:16px;font-size:0.9375rem;">${t('mh.crisis.subtitle')}</p>
      <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));">
        ${crisisResources.map(r => `
          <div style="background:rgba(255,255,255,0.9);padding:12px 16px;border-radius:6px;">
            <strong style="color:var(--text-heading);">${lang === 'zh' ? r.nameZh : r.name}</strong>
            ${r.phone ? `<p class="font-mono" style="font-size:1.125rem;margin-top:4px;"><a href="tel:${r.phone.replace(/[^0-9+]/g, '')}" style="color:var(--red-700);text-decoration:underline;">${r.phone}</a></p>` : ''}
            <p style="font-size:0.8125rem;color:var(--text-body);margin-top:4px;">${lang === 'zh' ? r.accessZh : r.access}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Category Filters -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;">
      ${categories.map(cat => `
        <button class="btn-secondary cat-filter" data-cat="${cat}" style="${activeCategory === cat ? 'background:var(--emerald-600);color:white;border-color:var(--emerald-600);' : ''}">
          ${categoryLabels[cat]}
        </button>
      `).join('')}
    </div>

    <!-- Resource Cards -->
    <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));margin-bottom:48px;">
      ${filtered.map(r => `
        <div class="card" style="padding:20px;">
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <i data-lucide="${r.icon}" style="width:20px;height:20px;color:var(--emerald-600);flex-shrink:0;margin-top:2px;"></i>
            <div style="flex:1;">
              <h3 style="margin-bottom:6px;">${lang === 'zh' ? r.nameZh : r.name}</h3>
              <p style="font-size:0.875rem;color:var(--text-body);margin-bottom:12px;">${lang === 'zh' ? r.descriptionZh : r.description}</p>
              <div style="display:grid;gap:6px;font-size:0.8125rem;">
                <div><strong>${t('mh.cost')}:</strong> <span>${lang === 'zh' ? r.costZh : r.cost}</span></div>
                <div><strong>${t('mh.access')}:</strong> <span>${lang === 'zh' ? r.accessZh : r.access}</span></div>
                ${r.phone ? `<div><strong>${t('mh.phone')}:</strong> <a href="tel:${r.phone.replace(/[^0-9+]/g, '')}" class="font-mono" style="color:var(--emerald-600);">${r.phone}</a></div>` : ''}
                ${r.url ? `<a href="${r.url}" target="_blank" rel="noopener" class="btn-ghost" style="font-size:0.8125rem;padding:4px 8px;margin-top:4px;display:inline-flex;align-items:center;gap:4px;"><i data-lucide="external-link" style="width:14px;height:14px;"></i>${t('common.learnMore')}</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- How to Find a Therapist -->
    <section style="margin-bottom:48px;">
      <h2 style="margin-bottom:16px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="search" style="width:22px;height:22px;color:var(--emerald-600);"></i>
        ${t('mh.howToFind')}
      </h2>
      <div style="display:grid;gap:16px;">
        ${findTherapistSteps.map(step => `
          <div style="display:flex;align-items:flex-start;gap:16px;">
            <div class="stepper-step active" style="flex-shrink:0;">${step.step}</div>
            <div>
              <h3 style="margin-bottom:4px;">${lang === 'zh' ? step.titleZh : step.title}</h3>
              <p style="font-size:0.9375rem;color:var(--text-body);">${lang === 'zh' ? step.descriptionZh : step.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Insurance Coverage -->
    <section style="margin-bottom:48px;">
      <h2 style="margin-bottom:16px;display:flex;align-items:center;gap:8px;">
        <i data-lucide="shield-check" style="width:22px;height:22px;color:var(--emerald-600);"></i>
        ${t('mh.insuranceCoverage')}
      </h2>
      <div class="worked-example">
        <p style="margin-bottom:12px;"><strong>${t('mh.parityQuestion')}</strong></p>
        <p style="margin-bottom:12px;">${lang === 'zh' ? insuranceCoverageInfo.parityExplainZh : insuranceCoverageInfo.parityExplain}</p>
        <p style="margin-bottom:12px;"><strong>${t('mh.typicalCosts')}:</strong> ${lang === 'zh' ? insuranceCoverageInfo.typicalCopayZh : insuranceCoverageInfo.typicalCopay}</p>
        <p><strong>${t('mh.findInNetwork')}:</strong> ${lang === 'zh' ? insuranceCoverageInfo.howToFindInNetworkZh : insuranceCoverageInfo.howToFindInNetwork}</p>
      </div>
    </section>

    <!-- Cultural Competency Note -->
    <section style="margin-bottom:32px;">
      <div class="misconception-callout">
        <h3 style="margin-bottom:8px;color:var(--amber-800);display:flex;align-items:center;gap:8px;">
          <i data-lucide="globe" style="width:18px;height:18px;"></i>
          ${t('mh.culturalNote')}
        </h3>
        <p style="font-size:0.9375rem;color:var(--amber-800);">
          ${t('mh.culturalParagraph')}
        </p>
      </div>
    </section>

    <p style="font-size:0.8125rem;color:var(--text-muted);">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  // Category filter listeners
  wrapper.querySelectorAll('.cat-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = (btn as HTMLElement).dataset.cat! as ResourceCategory | 'all';
      renderUI();
    });
  });

  container.appendChild(wrapper);
  refreshIcons();
}
