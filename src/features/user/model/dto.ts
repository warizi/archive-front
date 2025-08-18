import type { Role } from "@/entities/user";

export interface LoginDto {
  username: string;
  password: string;
};

export interface SignupDto extends LoginDto {
  role?: Role; // 기본 ROLE_USER
}

export interface TokenResDto {
  accessToken: string;
  refreshToken: string;
}