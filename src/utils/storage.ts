const PREFIX = 'baoyi_';

export function saveState(key: string, data: unknown): void {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify(data));
  } catch { /* quota exceeded or private mode */ }
}

export function loadState<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) as T : null;
  } catch { return null; }
}

export function clearState(key: string): void {
  try { sessionStorage.removeItem(PREFIX + key); } catch { /* private mode */ }
}
