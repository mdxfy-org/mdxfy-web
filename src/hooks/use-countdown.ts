import { useState, useRef, useEffect, useCallback } from "react";

interface UseCountdownOptions {
  autoStart?: boolean;
  onComplete?: () => void;
}

interface UseCountdownReturn {
  time: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  reset: (newTime?: number) => void;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const useCountdown = (
  initialTime: number,
  options: UseCountdownOptions = {}
): UseCountdownReturn => {
  const { autoStart = true, onComplete } = options;
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearCountdown();
  }, [clearCountdown]);

  const resume = useCallback(() => {
    if (time > 0) {
      setIsRunning(true);
    }
  }, [time]);

  const reset = useCallback(
    (newTime?: number) => {
      clearCountdown();
      setTime(newTime !== undefined ? newTime : initialTime);
      setIsRunning(autoStart);
    },
    [autoStart, initialTime, clearCountdown]
  );

  useEffect(() => {
    if (!isRunning || time <= 0) {
      if (time <= 0) {
        clearCountdown();
        if (onComplete) {
          onComplete();
        }
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearCountdown();
          setIsRunning(false);
          if (onComplete) {
            onComplete();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearCountdown();
  }, [isRunning, time, onComplete, clearCountdown]);

  return { time, isRunning, pause, resume, reset, setTime };
};

export default useCountdown;
