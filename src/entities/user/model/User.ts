import type { Role } from "@/entities/user/model/Role";

export interface User {
  username: string;
  roles: Role[];
}

