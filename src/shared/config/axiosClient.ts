import type { AxiosError, AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { tokenStore } from "./tokenStore";

const API_BASE_URL = "http://localhost:8080";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export const authClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

let refreshPromise: Promise<void> | null = null;

// 리프레시 호출 (JSON 바디로 refreshToken 전달)
async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    const rt = tokenStore.getRefresh();
    if (!rt) throw new Error("No refresh token");
    refreshPromise = authClient.post("/api/auth/refresh", { refreshToken: rt })
      .then((res) => {
        // 백엔드가 {accessToken, refreshToken?} JSON 반환한다고 가정
        const { accessToken, refreshToken } = (res.data ?? {}) as { accessToken?: string; refreshToken?: string };
        if (!accessToken && !refreshToken) {
          // 204 같은 케이스면 실패로 처리
          throw new Error("Refresh returned no tokens");
        }
        tokenStore.set(accessToken ?? null, typeof refreshToken !== "undefined" ? refreshToken : tokenStore.getRefresh());
      })
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise!;
}

function isAuthPath(url?: string) {
  if (!url) return false;
  return url.includes("/api/auth/login")
      || url.includes("/api/auth/refresh")
      || url.includes("/api/auth/signup")
      || url.includes("/api/auth/logout");
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const at = tokenStore.getAccess();
  if (at) {
    config.headers = config.headers || {};
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${at}`;
  }
  return config;
});

/** 응답 인터셉터: 401이면 자동 리프레시 → 원요청 재시도 */
apiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const { response, config } = error;
    const original = config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 네트워크 오류 등
    if (!response) return Promise.reject(error);

    // 인증 실패 처리
    if (response.status === 401 && !original._retry && !isAuthPath(original.url)) {
      original._retry = true;
      try {
        await refreshTokens();
        // access 갱신 후 Authorization 헤더를 다시 셋
        const at = tokenStore.getAccess();
        if (at) {
          original.headers = original.headers || {};
          (original.headers as AxiosRequestHeaders).Authorization = `Bearer ${at}`;
        }
        return apiClient.request(original); // 쿠키 갱신 후 재시도
      } catch (e) {
        tokenStore.clear();
        // 리프레시 실패 → 전역 로그아웃 이벤트
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);