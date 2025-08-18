export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

const STORAGE_KEY = "auth_tokens_v1";

let accessToken: string | null = null;
let refreshToken: string | null = null;

(function bootstrap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Tokens;
      accessToken = parsed.accessToken ?? null;
      refreshToken = parsed.refreshToken ?? null;
    }
  } catch {
    // Ignore errors
  }
})();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
  } catch {
    // Ignore errors
  }
}

export const tokenStore = {
  getAccess() { return accessToken; },
  getRefresh() { return refreshToken; },
  set(at: string | null, rt?: string | null) {
    accessToken = at;
    if (typeof rt !== "undefined") refreshToken = rt;
    persist();
  },
  clear() {
    accessToken = null;
    refreshToken = null;
    try { localStorage.removeItem(STORAGE_KEY); } catch {
      // Ignore errors
    }
  }
};
