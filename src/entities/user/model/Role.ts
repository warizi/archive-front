export const ROLE = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
}

export type Role = typeof ROLE[keyof typeof ROLE];