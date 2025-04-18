import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(initialValue);

  const [firstLoadDone, setFirstLoadDone] = useState(false);

  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } catch {
        return initialValue;
      }
    };

    setStoredValue(fromLocal);

    setFirstLoadDone(true);
  }, [initialValue, key]);

  useEffect(() => {
    if (!firstLoadDone) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch {}
  }, [storedValue, firstLoadDone, key]);

  return [storedValue, setStoredValue];
}
