import { t, getLang, toggleLang, initLang, setLang } from './i18n';
import { refreshIcons } from './utils/ui';

// Feature module imports (lazy-loaded functions)
type RenderFn = (container: HTMLElement) => void;
type CleanupFn = (() => void) | undefined;

interface FeatureModule {
  render: RenderFn;
  cleanup?: CleanupFn;
}

const featureModules: Record<string, () => Promise<FeatureModule>> = {
  waiver: () => import('./features/waiver'),
  j1: () => import('./features/j1compliance'),
  compare: () => import('./features/compare'),
  glossary: () => import('./features/glossary'),
  wheretogo: () => import('./features/wheretogo'),
  cost: () => import('./features/cost'),
  mentalhealth: () => import('./features/mentalhealth'),
  bill: () => import('./features/bill'),
};

const tabIcons: Record<string, string> = {
  home: 'home',
  waiver: 'shield-check',
  j1: 'shield',
  compare: 'columns-3',
  glossary: 'book-open',
  wheretogo: 'map-pin',
  cost: 'calculator',
  mentalhealth: 'heart-pulse',
  bill: 'receipt',
};

let currentTab = 'home';
let currentCleanup: CleanupFn;

// --- Dark mode ---
function initDarkMode(): void {
  const saved = localStorage.getItem('baoyi_dark');
  if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  updateDarkIcon();
}

function toggleDarkMode(): void {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('baoyi_dark', String(document.documentElement.classList.contains('dark')));
  updateDarkIcon();
}

function updateDarkIcon(): void {
  const isDark = document.documentElement.classList.contains('dark');
  const iconName = isDark ? 'sun' : 'moon';
  document.querySelectorAll('#dark-toggle-icon, #mobile-dark-icon').forEach(el => {
    el.setAttribute('data-lucide', iconName);
  });
  refreshIcons();
}

// --- Navigation ---
function getTabFromHash(): string {
  const hash = window.location.hash.slice(1);
  return hash && (hash === 'home' || hash in featureModules) ? hash : 'home';
}

function navigate(tab: string): void {
  window.location.hash = tab;
}

async function renderTab(tab: string): Promise<void> {
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = undefined;
  }

  currentTab = tab;
  updateNavActiveState();

  const container = document.getElementById('app-content')!;
  container.innerHTML = '';

  if (tab === 'home') {
    renderHome(container);
  } else if (featureModules[tab]) {
    // Show loading skeleton while chunk loads
    container.innerHTML = `<div style="max-width:720px;margin:0 auto;padding:24px 0;">
      <div style="height:32px;width:260px;background:var(--border-color);border-radius:4px;margin-bottom:16px;animation:pulse 1.5s ease-in-out infinite;"></div>
      <div style="height:16px;width:400px;background:var(--border-color);border-radius:4px;margin-bottom:32px;animation:pulse 1.5s ease-in-out infinite;"></div>
      <div style="height:200px;background:var(--border-color);border-radius:4px;animation:pulse 1.5s ease-in-out infinite;"></div>
    </div>`;
    try {
      const mod = await featureModules[tab]();
      container.innerHTML = '';
      mod.render(container);
      currentCleanup = mod.cleanup;
    } catch (e) {
      container.innerHTML = `<div style="padding:48px;text-align:center;color:var(--red-700);">${t('error.loadFailed')}</div>`;
    }
  }

  refreshIcons();
  window.scrollTo(0, 0);
}

function updateNavActiveState(): void {
  // Desktop tabs
  document.querySelectorAll('.nav-tab').forEach(btn => {
    const tab = (btn as HTMLElement).dataset.tab;
    btn.classList.toggle('active', tab === currentTab);
  });

  // Mobile nav items
  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    const tab = (btn as HTMLElement).dataset.tab;
    btn.classList.toggle('active', tab === currentTab);
  });
}

// --- Home / Landing ---
function renderHome(container: HTMLElement): void {
  // Primary features (large cards with CTAs)
  const primary = [
    { tab: 'waiver', icon: 'shield-check', titleKey: 'feature.waiver.title', descKey: 'feature.waiver.desc', badge: 'hero.badge.startHere', badgeClass: 'badge-accent' },
    { tab: 'j1', icon: 'shield', titleKey: 'feature.j1.title', descKey: 'feature.j1.desc', badge: 'hero.badge.required', badgeClass: 'badge-info' },
  ];

  // Secondary features (medium cards)
  const secondary = [
    { tab: 'compare', icon: 'columns-3', titleKey: 'feature.compare.title', descKey: 'feature.compare.desc' },
    { tab: 'cost', icon: 'calculator', titleKey: 'feature.cost.title', descKey: 'feature.cost.desc' },
    { tab: 'wheretogo', icon: 'map-pin', titleKey: 'feature.wheretogo.title', descKey: 'feature.wheretogo.desc' },
  ];

  // Tertiary features (compact cards)
  const tertiary = [
    { tab: 'glossary', icon: 'book-open', titleKey: 'feature.glossary.title', descKey: 'feature.glossary.desc' },
    { tab: 'mentalhealth', icon: 'heart-pulse', titleKey: 'feature.mentalhealth.title', descKey: 'feature.mentalhealth.desc' },
    { tab: 'bill', icon: 'receipt', titleKey: 'feature.bill.title', descKey: 'feature.bill.desc' },
  ];

  container.innerHTML = `
    <!-- Hero: Split layout -->
    <section class="hero-split fade-in">
      <div class="hero-text">
        <h1>${t('hero.title')}</h1>
        <p>${t('hero.subtitle')}</p>
        <button class="btn-primary" id="hero-cta" style="font-size: 1.125rem; padding: 14px 32px;">${t('hero.cta')}</button>
      </div>
      <div class="preview-card" aria-hidden="true">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <span style="font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">${t('hero.preview.label')}</span>
          <span class="badge-compliant"><i data-lucide="shield-check" style="width:14px;height:14px;"></i> ${t('hero.preview.verdict')}</span>
        </div>
        <div class="preview-check">
          <i data-lucide="check-circle-2" style="width:18px;height:18px;color:var(--emerald-500);flex-shrink:0;"></i>
          ${t('hero.preview.deductible')}
        </div>
        <div class="preview-check">
          <i data-lucide="check-circle-2" style="width:18px;height:18px;color:var(--emerald-500);flex-shrink:0;"></i>
          ${t('hero.preview.network')}
        </div>
        <div class="preview-check">
          <i data-lucide="check-circle-2" style="width:18px;height:18px;color:var(--emerald-500);flex-shrink:0;"></i>
          ${t('hero.preview.mental')}
        </div>
        <div class="preview-check">
          <i data-lucide="check-circle-2" style="width:18px;height:18px;color:var(--emerald-500);flex-shrink:0;"></i>
          ${t('hero.preview.rx')}
        </div>
      </div>
    </section>

    <!-- Feature cards: Tiered hierarchy -->
    <section style="padding: 16px 16px 48px;">
      <div class="feature-grid">
        <!-- Primary: Waiver + J-1 -->
        <div class="feature-grid-primary">
          ${primary.map(f => `
            <button class="card card-primary feature-card" data-tab="${f.tab}" style="text-align: left; cursor: pointer; position: relative;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--emerald-50); border-radius: 8px;">
                    <i data-lucide="${f.icon}" class="feature-icon" style="width: 24px; height: 24px; color: var(--emerald-600);"></i>
                  </div>
                  <h3>${t(f.titleKey)}</h3>
                </div>
                <span class="${f.badgeClass}">${t(f.badge)}</span>
              </div>
              <p style="font-size: 0.9375rem; color: var(--text-body); margin-bottom: 16px;">${t(f.descKey)}</p>
              <span class="btn-ghost" style="padding: 0; font-size: 0.875rem;">${t(f.titleKey)} →</span>
            </button>
          `).join('')}
        </div>

        <!-- Secondary: Compare, Cost, Where to Go -->
        <div class="feature-grid-secondary">
          ${secondary.map(f => `
            <button class="card feature-card" data-tab="${f.tab}" style="padding: 24px; text-align: left; cursor: pointer;">
              <div style="display: flex; align-items: flex-start; gap: 14px;">
                <div style="flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--bg-alt); border-radius: 8px;">
                  <i data-lucide="${f.icon}" class="feature-icon" style="width: 22px; height: 22px; color: var(--emerald-600);"></i>
                </div>
                <div>
                  <h3 style="margin-bottom: 6px; font-size: 1.125rem;">${t(f.titleKey)}</h3>
                  <p style="font-size: 0.9375rem; color: var(--text-body);">${t(f.descKey)}</p>
                </div>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Tertiary: Glossary, Mental Health, Bill -->
        <div class="feature-grid-tertiary">
          ${tertiary.map(f => `
            <button class="card feature-card" data-tab="${f.tab}" style="padding: 20px; text-align: left; cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <i data-lucide="${f.icon}" class="feature-icon" style="width: 20px; height: 20px; color: var(--emerald-600); flex-shrink: 0;"></i>
                <div>
                  <h3 style="font-size: 1rem; margin-bottom: 2px;">${t(f.titleKey)}</h3>
                  <p style="font-size: 0.875rem; color: var(--text-muted);">${t(f.descKey)}</p>
                </div>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Feature card clicks
  container.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate((card as HTMLElement).dataset.tab!);
    });
  });

  // Hero CTA
  document.getElementById('hero-cta')?.addEventListener('click', () => {
    navigate('waiver');
  });
}

// --- UI Updates ---
function updateAllText(): void {
  // Nav tabs
  const tabs = ['home', 'waiver', 'j1', 'compare', 'glossary', 'wheretogo', 'cost', 'mentalhealth', 'bill'];
  tabs.forEach(tab => {
    const el = document.getElementById(`tab-${tab}`);
    if (el) el.textContent = t(`nav.${tab}`);
  });

  // Disclaimer
  const disclaimerText = document.getElementById('disclaimer-text');
  if (disclaimerText) disclaimerText.textContent = t('disclaimer');

  // Lang toggle text
  const langLabel = getLang() === 'en' ? 'EN / 中文' : '中文 / EN';
  document.querySelectorAll('#lang-toggle, #mobile-lang-toggle').forEach(el => {
    el.textContent = langLabel;
  });

  // Re-render current tab
  renderTab(currentTab);
}

function buildMobileNav(): void {
  const container = document.getElementById('mobile-nav-items');
  if (!container) return;

  const tabs = ['home', 'waiver', 'j1', 'compare', 'glossary', 'wheretogo', 'cost', 'mentalhealth', 'bill'];
  container.innerHTML = tabs.map(tab => `
    <button class="mobile-nav-item" data-tab="${tab}">
      <i data-lucide="${tabIcons[tab]}" style="width: 18px; height: 18px;"></i>
      ${t(`nav.${tab}`)}
    </button>
  `).join('');

  container.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      navigate((btn as HTMLElement).dataset.tab!);
      closeMobileNav();
    });
  });
}

// --- Mobile nav ---
function openMobileNav(): void {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  nav?.classList.add('open');
  nav?.setAttribute('aria-hidden', 'false');
  overlay?.classList.add('open');
  // Focus first nav item for keyboard users
  const firstItem = nav?.querySelector('.mobile-nav-item') as HTMLElement | null;
  firstItem?.focus();
}

function closeMobileNav(): void {
  const nav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-overlay');
  nav?.classList.remove('open');
  nav?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('open');
  // Return focus to hamburger
  document.getElementById('hamburger-btn')?.focus();
}

// --- Responsive check ---
function updateResponsive(): void {
  const isMobile = window.innerWidth < 768;
  const hamburger = document.getElementById('hamburger-btn');
  const desktopTabs = document.getElementById('desktop-tabs');
  if (hamburger) hamburger.style.display = isMobile ? 'block' : 'none';
  if (desktopTabs) desktopTabs.style.display = isMobile ? 'none' : 'flex';
}

// --- Init ---
function init(): void {
  // Init systems
  initLang();
  initDarkMode();

  // Set up Lucide icons in nav
  const logoIcon = document.getElementById('logo-icon');
  const mobileLogoIcon = document.getElementById('mobile-logo-icon');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const disclaimerIcon = document.getElementById('disclaimer-icon');

  if (logoIcon) logoIcon.innerHTML = '<i data-lucide="shield" style="width:24px;height:24px;"></i>';
  if (mobileLogoIcon) mobileLogoIcon.innerHTML = '<i data-lucide="shield" style="width:24px;height:24px;"></i>';
  if (hamburgerIcon) hamburgerIcon.innerHTML = '<i data-lucide="menu" style="width:24px;height:24px;"></i>';
  if (closeIcon) closeIcon.innerHTML = '<i data-lucide="x" style="width:24px;height:24px;"></i>';
  if (disclaimerIcon) disclaimerIcon.innerHTML = '<i data-lucide="shield-alert" style="width:16px;height:16px;"></i>';

  // Dark toggle icons
  document.querySelectorAll('#dark-toggle-icon, #mobile-dark-icon').forEach(el => {
    el.innerHTML = '<i data-lucide="moon" style="width:18px;height:18px;"></i>';
  });

  // Event listeners
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => navigate((btn as HTMLElement).dataset.tab!));
  });

  document.getElementById('hamburger-btn')?.addEventListener('click', openMobileNav);
  document.getElementById('close-mobile-nav')?.addEventListener('click', closeMobileNav);
  document.getElementById('mobile-overlay')?.addEventListener('click', closeMobileNav);

  // Language toggles
  const handleLangToggle = () => {
    toggleLang();
    buildMobileNav();
    updateAllText();
  };
  document.getElementById('lang-toggle')?.addEventListener('click', handleLangToggle);
  document.getElementById('mobile-lang-toggle')?.addEventListener('click', handleLangToggle);

  // Dark mode toggles
  document.getElementById('dark-toggle')?.addEventListener('click', toggleDarkMode);
  document.getElementById('mobile-dark-toggle')?.addEventListener('click', toggleDarkMode);

  // Escape key closes mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  // Hash routing
  window.addEventListener('hashchange', () => {
    const tab = getTabFromHash();
    renderTab(tab);
  });

  // Responsive
  window.addEventListener('resize', updateResponsive);
  updateResponsive();

  // Build mobile nav
  buildMobileNav();

  // Update all text (sets nav labels, disclaimer)
  updateAllText();

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  // Initial render
  const tab = getTabFromHash();
  renderTab(tab);
}

// Start app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
