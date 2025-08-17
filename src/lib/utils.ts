// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind className 병합 유틸
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
