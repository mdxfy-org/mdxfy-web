import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberInputMask(value: string | undefined): string {
  if (value === undefined || value === null || value.trim() === "") {
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

export const isNumeric = (key: string): boolean => /^\d+$/.test(key);

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};

export const getPortfolioUrl = (): string => {
  return process.env.NEXT_PUBLIC_PORTFOLIO_BASE_URL ?? "https://agrofast.tech";
};

export const getWebUrl = (): string => {
  return process.env.NEXT_PUBLIC_WEB_BASE_URL ?? "https://agrofast.tech";
};

export const getLegalUrl = (): string => {
  return process.env.NEXT_PUBLIC_LEGAL_BASE_URL ?? "https://agrofast.tech";
};
