import { t, getLang } from '../i18n';
import { glossaryTerms, GlossaryTerm } from '../data/glossary-terms';

let container: HTMLElement;
let openTermId: string | null = null;

export function render(el: HTMLElement): void {
  container = el;
  renderUI('');
}

export function cleanup(): void {
  openTermId = null;
}

function renderUI(filter: string): void {
  const lang = getLang();
  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'fade-in';
  wrapper.style.maxWidth = '720px';
  wrapper.style.margin = '0 auto';

  const lowerFilter = filter.toLowerCase();
  const filtered = filter
    ? glossaryTerms.filter(term =>
        term.term.toLowerCase().includes(lowerFilter) ||
        term.termZh.includes(filter) ||
        term.definition.toLowerCase().includes(lowerFilter) ||
        term.definitionZh.includes(filter)
      )
    : glossaryTerms;

  wrapper.innerHTML = `
    <h1 style="margin-bottom:8px;">${t('glossary.title')}</h1>
    <p style="margin-bottom:24px;color:var(--text-body);">${t('glossary.subtitle')}</p>

    <div style="margin-bottom:32px;">
      <input type="text" class="input-field" id="glossary-search" placeholder="${t('common.search')}" value="${filter}" style="max-width:400px;">
    </div>

    <div id="glossary-list" style="display:grid;gap:8px;">
      ${filtered.length === 0 ? `<p style="color:var(--text-muted);padding:24px 0;">${t('common.noResults')}</p>` : ''}
      ${filtered.map(term => renderTermAccordion(term, lang)).join('')}
    </div>

    <p style="font-size:0.8125rem;color:var(--text-muted);margin-top:32px;">
      <i data-lucide="shield-alert" style="width:14px;height:14px;display:inline;vertical-align:middle;"></i>
      ${t('disclaimer')}
    </p>
  `;

  container.appendChild(wrapper);

  // Search
  const searchInput = wrapper.querySelector('#glossary-search') as HTMLInputElement;
  searchInput.addEventListener('input', () => {
    renderUI(searchInput.value);
    // Refocus and restore cursor
    const newInput = container.querySelector('#glossary-search') as HTMLInputElement;
    if (newInput) { newInput.focus(); newInput.selectionStart = newInput.selectionEnd = newInput.value.length; }
  });

  // Accordion toggles
  wrapper.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const termId = (btn as HTMLElement).dataset.termId!;
      const content = wrapper.querySelector(`#accordion-${termId}`) as HTMLElement;
      const chevron = btn.querySelector('.chevron') as HTMLElement;

      if (openTermId === termId) {
        content.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
        openTermId = null;
      } else {
        // Close previous
        if (openTermId) {
          const prev = wrapper.querySelector(`#accordion-${openTermId}`);
          const prevChevron = wrapper.querySelector(`[data-term-id="${openTermId}"] .chevron`) as HTMLElement;
          prev?.classList.remove('open');
          if (prevChevron) prevChevron.style.transform = 'rotate(0deg)';
        }
        content.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
        openTermId = termId;
      }
    });
  });

  // Related term links
  wrapper.querySelectorAll('.related-term-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (link as HTMLElement).dataset.targetId!;
      // Open the target term
      if (openTermId) {
        const prev = wrapper.querySelector(`#accordion-${openTermId}`);
        const prevChevron = wrapper.querySelector(`[data-term-id="${openTermId}"] .chevron`) as HTMLElement;
        prev?.classList.remove('open');
        if (prevChevron) prevChevron.style.transform = 'rotate(0deg)';
      }
      const target = wrapper.querySelector(`#accordion-${targetId}`) as HTMLElement;
      const targetChevron = wrapper.querySelector(`[data-term-id="${targetId}"] .chevron`) as HTMLElement;
      if (target) {
        target.classList.add('open');
        if (targetChevron) targetChevron.style.transform = 'rotate(180deg)';
        openTermId = targetId;
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  if ((window as any).lucide) (window as any).lucide.createIcons();
}

function renderTermAccordion(term: GlossaryTerm, lang: string): string {
  const isOpen = openTermId === term.id;
  const termName = lang === 'zh' ? term.termZh : term.term;
  const termNameSecondary = lang === 'zh' ? term.term : term.termZh;
  const definition = lang === 'zh' ? term.definitionZh : term.definition;
  const example = lang === 'zh' ? term.exampleZh : term.example;
  const misconception = lang === 'zh' ? term.misconceptionZh : term.misconception;

  return `
    <div class="card" style="padding:0;">
      <button class="accordion-toggle" data-term-id="${term.id}" style="width:100%;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;background:none;border:none;cursor:pointer;text-align:left;">
        <div>
          <span style="font-weight:700;color:var(--text-heading);font-size:1.0625rem;">${termName}</span>
          <span style="color:var(--text-muted);font-size:0.875rem;margin-left:8px;">${termNameSecondary}</span>
        </div>
        <i data-lucide="chevron-down" class="chevron" style="width:18px;height:18px;color:var(--text-muted);flex-shrink:0;transition:transform 200ms;${isOpen ? 'transform:rotate(180deg);' : ''}"></i>
      </button>
      <div id="accordion-${term.id}" class="accordion-content ${isOpen ? 'open' : ''}" style="padding:0 20px;">
        <div style="padding-bottom:20px;">
          <p style="color:var(--text-body);margin-bottom:16px;">${definition}</p>

          <div style="margin-bottom:16px;">
            <h4 style="font-size:0.875rem;font-weight:600;color:var(--text-heading);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <i data-lucide="calculator" style="width:14px;height:14px;color:var(--emerald-600);"></i>
              ${t('glossary.example')}
            </h4>
            <div class="worked-example">
              <p class="font-mono" style="font-size:0.875rem;white-space:pre-wrap;line-height:1.7;">${example}</p>
            </div>
          </div>

          <div style="margin-bottom:16px;">
            <h4 style="font-size:0.875rem;font-weight:600;color:var(--amber-800);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <i data-lucide="alert-triangle" style="width:14px;height:14px;color:var(--amber-600);"></i>
              ${t('glossary.misconception')}
            </h4>
            <div class="misconception-callout">
              <p style="font-size:0.875rem;">${misconception}</p>
            </div>
          </div>

          ${term.relatedTerms.length > 0 ? `
            <div>
              <h4 style="font-size:0.875rem;font-weight:600;color:var(--text-heading);margin-bottom:8px;">${t('glossary.relatedTerms')}</h4>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                ${term.relatedTerms.map(rid => {
                  const related = glossaryTerms.find(g => g.id === rid);
                  if (!related) return '';
                  return `<a href="#" class="btn-ghost related-term-link" data-target-id="${rid}" style="font-size:0.8125rem;">${lang === 'zh' ? related.termZh : related.term}</a>`;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
