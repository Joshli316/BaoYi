/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { t, getLang, setLang, initLang, toggleLang } from './i18n';

const store: Record<string, string> = {};
const mockStorage = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, val: string) => { store[key] = val; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { for (const k in store) delete store[k]; }),
  get length() { return Object.keys(store).length; },
  key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
};

Object.defineProperty(globalThis, 'localStorage', { value: mockStorage, writable: true });

beforeEach(() => {
  mockStorage.clear();
  setLang('en');
});

describe('t()', () => {
  it('returns English string by default', () => {
    expect(t('nav.home')).toBe('Home');
  });

  it('returns Chinese string after setLang("zh")', () => {
    setLang('zh');
    expect(t('nav.home')).toBe('首页');
  });

  it('returns key if key is missing', () => {
    expect(t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('all nav keys have both en and zh', () => {
    const navKeys = ['nav.home', 'nav.waiver', 'nav.j1', 'nav.compare', 'nav.glossary', 'nav.wheretogo', 'nav.cost', 'nav.mentalhealth', 'nav.bill'];
    for (const key of navKeys) {
      setLang('en');
      const en = t(key);
      setLang('zh');
      const zh = t(key);
      expect(en).not.toBe(key); // not a missing key
      expect(zh).not.toBe(key);
      expect(en).not.toBe(zh); // different languages
    }
  });

  it('disclaimer exists in both languages', () => {
    setLang('en');
    expect(t('disclaimer')).toContain('not medical or legal advice');
    setLang('zh');
    expect(t('disclaimer')).toContain('不构成医疗或法律建议');
  });

  it('hero copy is specific, not generic', () => {
    setLang('en');
    expect(t('hero.cta')).toBe('Check My Waiver');
    expect(t('hero.title')).not.toContain('Confidence');
  });
});

describe('getLang()', () => {
  it('returns en by default', () => {
    expect(getLang()).toBe('en');
  });

  it('returns zh after toggle', () => {
    toggleLang();
    expect(getLang()).toBe('zh');
  });

  it('toggles back to en', () => {
    toggleLang();
    toggleLang();
    expect(getLang()).toBe('en');
  });
});

describe('setLang()', () => {
  it('sets lang attribute on document', () => {
    setLang('zh');
    expect(document.documentElement.lang).toBe('zh');
  });

  it('persists to localStorage', () => {
    setLang('zh');
    expect(localStorage.getItem('baoyi_lang')).toBe('zh');
  });
});

describe('initLang()', () => {
  it('uses saved preference from localStorage', () => {
    localStorage.setItem('baoyi_lang', 'zh');
    initLang();
    expect(getLang()).toBe('zh');
  });

  it('defaults to en for non-Chinese browsers', () => {
    initLang();
    expect(getLang()).toBe('en');
  });
});
