"use client";
import { useStorage } from "./use-storage";

export const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  return useStorage(window?.sessionStorage ?? null, key, initialValue);
};
