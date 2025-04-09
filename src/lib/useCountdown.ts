import { useState, useEffect } from "react";

export function useCountdown(initialTime: number) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return [time, setTime] as const;
}
