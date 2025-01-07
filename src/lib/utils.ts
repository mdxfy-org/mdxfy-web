import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberInputMask(value: string | undefined): string {
  if (!value) {
    return "";
  }
  return value
    .substring(0, 19)
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
    .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
    .replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, "+$1 ($2) $3-$4")
    .replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, "+$1 ($2) $3-$4");
}

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};
