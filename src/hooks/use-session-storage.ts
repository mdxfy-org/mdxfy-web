"use client";
import { useStorage } from "./use-storage";

export const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const storage = typeof window !== "undefined" ? window.sessionStorage : null;
  return useStorage(storage, key, initialValue);
};
