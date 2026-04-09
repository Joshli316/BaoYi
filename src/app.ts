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
  const features = [
    { tab: 'waiver', icon: 'shield-check', titleKey: 'feature.waiver.title', descKey: 'feature.waiver.desc' },
    { tab: 'j1', icon: 'shield', titleKey: 'feature.j1.title', descKey: 'feature.j1.desc' },
    { tab: 'compare', icon: 'columns-3', titleKey: 'feature.compare.title', descKey: 'feature.compare.desc' },
    { tab: 'glossary', icon: 'book-open', titleKey: 'feature.glossary.title', descKey: 'feature.glossary.desc' },
    { tab: 'wheretogo', icon: 'map-pin', titleKey: 'feature.wheretogo.title', descKey: 'feature.wheretogo.desc' },
    { tab: 'cost', icon: 'calculator', titleKey: 'feature.cost.title', descKey: 'feature.cost.desc' },
    { tab: 'mentalhealth', icon: 'heart-pulse', titleKey: 'feature.mentalhealth.title', descKey: 'feature.mentalhealth.desc' },
    { tab: 'bill', icon: 'receipt', titleKey: 'feature.bill.title', descKey: 'feature.bill.desc' },
  ];

  container.innerHTML = `
    <section style="text-align: center; padding: 48px 16px 32px; max-width: 720px; margin: 0 auto;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: var(--emerald-50); border-radius: 50%; margin-bottom: 24px;">
        <i data-lucide="shield" style="width: 32px; height: 32px; color: var(--emerald-600);"></i>
      </div>
      <h1 style="margin-bottom: 16px;">${t('hero.title')}</h1>
      <p style="font-size: 1.125rem; color: var(--text-body); max-width: 600px; margin: 0 auto 32px;">${t('hero.subtitle')}</p>
      <button class="btn-primary" id="hero-cta" style="font-size: 1.125rem; padding: 14px 32px;">${t('hero.cta')}</button>
    </section>

    <section style="padding: 16px 0 48px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto;">
        ${features.map(f => `
          <button class="card feature-card" data-tab="${f.tab}" style="padding: 24px; text-align: left; cursor: pointer; border-top: 4px solid var(--navy-900); position: relative;">
            <div style="display: flex; align-items: flex-start; gap: 16px;">
              <div style="flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="${f.icon}" style="width: 24px; height: 24px; color: var(--emerald-600);"></i>
              </div>
              <div>
                <h3 style="margin-bottom: 8px;">${t(f.titleKey)}</h3>
                <p style="font-size: 0.875rem; color: var(--text-body);">${t(f.descKey)}</p>
              </div>
            </div>
          </button>
        `).join('')}
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
