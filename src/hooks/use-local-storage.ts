"use client";
import { useStorage } from "./use-storage";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  return useStorage(storage, key, initialValue);
};
