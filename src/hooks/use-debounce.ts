import { useRef, useCallback, useState } from "react";

export const useDebounce = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => void | Promise<void>
>(
  fn: T,
  delay: number
): [(...args: Parameters<T>) => void, () => void, boolean] => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncing, setDebouncing] = useState<boolean>(false);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      setDebouncing(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args);
        setDebouncing(false);
      }, Math.max(0, delay));
    },
    [fn, delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return [debounce, cancel, debouncing];
};
