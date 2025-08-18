import * as z from "zod";
import { ROLE } from "@/entities/user/model/Role";

// ---- 설정 값/메시지
export const USER_VALID = {
  username: { min: 2, max: 100 },
  password: { min: 6, max: 100 },
} as const;

export const USER_ERROR_MESSAGE = {
  username: {
    required: "아이디 입력은 필수입니다.",
    min: `아이디는 ${USER_VALID.username.min}자 이상이어야 합니다.`,
    max: `아이디는 ${USER_VALID.username.max}자 이하여야 합니다.`
  },
  password: {
    required: "비밀번호는 필수입니다.",
    min: `비밀번호는 ${USER_VALID.password.min}자 이상이어야 합니다.`,
    max: `비밀번호는 ${USER_VALID.password.max}자 이하여야 합니다.`,
    match: "비밀번호가 일치하지 않습니다."
  }
} as const;

// ---- 공통 파트
const RoleSchema = z.enum(ROLE); // v4: enum-like 입력 지원 (TS enum / as const 객체)  // :contentReference[oaicite:6]{index=6}

const username = z
  .string({
    // undefined(미제공)과 타입오류 메시지 분기
    error: (iss) =>
      iss.input === undefined ? USER_ERROR_MESSAGE.username.required : undefined,
  })
  .trim()
  // 빈문자열은 required가 아님 -> min(1)로 막아야 함
  .min(USER_VALID.username.min, { error: USER_ERROR_MESSAGE.username.min })
  .max(USER_VALID.username.max, { error: USER_ERROR_MESSAGE.username.max });

const password = z
  .string({
    error: (iss) =>
      iss.input === undefined ? USER_ERROR_MESSAGE.password.required : undefined,
  })
  .min(USER_VALID.password.min, { error: USER_ERROR_MESSAGE.password.min })
  .max(USER_VALID.password.max, { error: USER_ERROR_MESSAGE.password.max });

// ---- 스키마
export const userSchema = z.strictObject({
  username,
  roles: z.array(RoleSchema).default([ROLE.USER]),
});
export type User = z.infer<typeof userSchema>;

export const loginFormSchema = z.strictObject({
  username,
  password,
});
export type LoginForm = z.infer<typeof loginFormSchema>;

export const signUpFormSchema = z.strictObject({
  username,
  password,
  passwordConfirm: z.string(),
}).refine((d) => d.password === d.passwordConfirm, {
  path: ["passwordConfirm"],
  message: USER_ERROR_MESSAGE.password.match,
});
export type SignUpForm = z.infer<typeof signUpFormSchema>;
