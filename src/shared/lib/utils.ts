// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { format, isValid, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge"

// Tailwind className 병합 유틸
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date 유틸
export const toYMD = (d?: Date) => (d ? format(d, "yyyy-MM-dd") : undefined);

export const toDate = (s?: string | null) => {
  if (!s) return undefined;
  const d = parseISO(s);               // "2025-08-13" → Local 2025-08-13 00:00
  return isValid(d) ? d : undefined;
};