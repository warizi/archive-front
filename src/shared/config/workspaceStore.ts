const KEY = "wsId";
let _wsId = localStorage.getItem(KEY) || null;
const listeners = new Set<(id: string | null) => void>();

export const workspaceStore = {
  get() { return _wsId; },
  set(id?: string | null) {
    _wsId = id || null;
    if (id) localStorage.setItem(KEY, id); else localStorage.removeItem(KEY);
    listeners.forEach((fn: (id: string | null) => void) => fn(_wsId));
  },
  subscribe(fn: (id: string | null) => void) { listeners.add(fn); return () => listeners.delete(fn); }
};

// 멀티탭 동기화
window.addEventListener("storage", (e) => {
  if (e.key === KEY) {
    _wsId = e.newValue;
    listeners.forEach(fn => fn(_wsId));
  }
});