import { apiClient } from "@/shared/config/axiosClient";
import { tokenStore } from "@/shared/config/tokenStore";
import type { LoginDto, SignupDto, TokenResDto } from "../model/dto";
import type { User } from "@/entities/user";

export const loginApi = async (dto: LoginDto): Promise<TokenResDto> => {
  const res = await apiClient.post<TokenResDto>("/api/auth/login", dto);
  if (res?.data) {
    tokenStore.set(res.data.accessToken, res.data.refreshToken);
  }
  return res.data;
};

export const logoutApi = async (): Promise<void> => {
  
  try { await apiClient.post("/api/auth/logout"); } catch {
    // Ignore errors
  }
  tokenStore.clear();
};

export const meApi = async (): Promise<User> => {
  const res = await apiClient.get<User>("/api/auth/me");
  return res.data;
};

export const signupApi = async (dto: SignupDto): Promise<{ message: string }> => {
  const payload = { ...dto, role: dto.role ?? "ROLE_USER" };
  const res = await apiClient.post<{ message: string }>("/api/auth/signup", payload);
  return res.data;
};