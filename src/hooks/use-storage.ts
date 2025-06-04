import { useState, useEffect, useCallback } from "react";

function parseStoredValue<T>(value: string | null, initialValue: T): T {
  if (value === null) {
    return initialValue;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
}

export function useStorage<T>(
  storage: Storage | null,
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!storage) return initialValue;
    const item = storage.getItem(key);
    return parseStoredValue(item, initialValue);
  });

  useEffect(() => {
    if (!storage) return;
    try {
      storage.setItem(key, JSON.stringify(storedValue));
    } catch {}
  }, [key, storedValue, storage]);

  useEffect(() => {
    if (!storage) return;
    const handleStorage = (e: StorageEvent) => {
      if (e.storageArea === storage && e.key === key) {
        setStoredValue(parseStoredValue(e.newValue, initialValue));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, storage, initialValue]);

  const removeItem = useCallback(() => {
    if (storage) {
      try {
        storage.removeItem(key);
      } catch {}
    }
    setStoredValue(initialValue);
  }, [key, storage, initialValue]);

  return [storedValue, setStoredValue, removeItem];
}
