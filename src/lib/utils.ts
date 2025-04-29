import { getCurrentOrigin, isDevelopment, isIpAddress } from "@/service/env";
import { parseDate } from "@internationalized/date";
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

let cachedBaseUrl: string | null = null;

export const getBaseUrl = (): string => {
  if (cachedBaseUrl) return cachedBaseUrl;

  if (!isDevelopment()) {
    return process.env.NEXT_PUBLIC_WEB_BASE_URL ?? "https://agrofast.tech"
  }

  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  cachedBaseUrl =
    process.env.NEXT_PUBLIC_WEB_BASE_URL && !isIpAddress(hostname)
      ? process.env.NEXT_PUBLIC_WEB_BASE_URL
      : getCurrentOrigin();

  return cachedBaseUrl;
};

export const getPortfolioUrl = (): string => {
  return getBaseUrl();
};

export const getWebUrl = (): string => {
  return new URL("/web", getBaseUrl()).toString();
};

export const getLegalUrl = (): string => {
  return new URL("/legal", getBaseUrl()).toString();
};

export const parseQueryDate = (date: string): string => {
  const dateFormated = date.replaceAll("-", "/");
  try {
    const parsedDate = parseDate(dateFormated);
    const utc = parsedDate.toDate("UTC");
    return `${utc.getFullYear()}-${String(utc.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(utc.getDate()).padStart(2, "0")}`;
  } catch {
    const day = dateFormated.split("/")[0];
    const month = dateFormated.split("/")[1];
    const year = dateFormated.split("/")[2];
    const newDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;
  }
};

/**
 * Formats the provided value using a specified mask (or masks).
 *
 * This function takes a value of type string, number, or boolean, and applies one or more formatting rules defined by the mask parameter.
 *
 * The mask have to be built using # for numbers and @ for letters or * for both, the rest will be put at the final string, only if it fits.
 *
 * In case you want to put a special character, you can use the escape character \, for example: \@ will be put as @.
 *
 * @param value - The value to be formatted. This can be a string, number, or boolean.
 * @param mask - A formatting pattern or an array of patterns used to transform the value.
 *
 * @returns A formatted string representation of the value.
 */
export const maskFormat = (
  value: string | number | boolean,
  mask: string | string[]
): string => {
  const raw = String(value).replace(/[^a-zA-Z0-9]/g, "");
  const masks = Array.isArray(mask) ? mask : [mask];

  const parsedMasks = masks
    .map((m) => ({
      mask: m,
      length: m.replace(/\\.|[^#@*]/g, "").length,
    }))
    .sort((a, b) => a.length - b.length);

  let selectedMask = parsedMasks.find((m) => raw.length <= m.length)?.mask;

  if (!selectedMask && parsedMasks.length > 0) {
    selectedMask = parsedMasks[parsedMasks.length - 1].mask;
  }

  if (!selectedMask) return "";

  const result: string[] = [];
  let valueIndex = 0;
  let escaping = false;

  for (let i = 0; i < selectedMask.length; i++) {
    const char = selectedMask[i];

    if (escaping) {
      result.push(char);
      escaping = false;
      continue;
    }

    if (char === "\\") {
      escaping = true;
      continue;
    }

    const current = raw[valueIndex];
    if (!current) break;

    if (char === "#") {
      if (/\d/.test(current)) {
        result.push(current);
        valueIndex++;
      } else {
        break;
      }
    } else if (char === "@") {
      if (/[a-zA-Z]/.test(current)) {
        result.push(current);
        valueIndex++;
      } else {
        break;
      }
    } else if (char === "*") {
      if (/[a-zA-Z0-9]/.test(current)) {
        result.push(current);
        valueIndex++;
      } else {
        break;
      }
    } else {
      if (valueIndex < raw.length) {
        result.push(char);
      }
    }
  }

  return result.join("");
};

export const formatDocument = (document: string, type?: string) => {
  if (!type) return document;
  if (type.toLocaleLowerCase() === "cpf") {
    return maskFormat(document, "###.###.###-##");
  }
  if (type.toLocaleLowerCase() === "cnpj") {
    return maskFormat(document, "##.###.###/####-##");
  }
  return document;
};
