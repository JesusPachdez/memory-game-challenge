import { useCallback, useEffect, useRef, useState } from "react";
import {
  GAME_DURATION_SEC,
  TICK_SOUND_THRESHOLD_SEC,
} from "../constants/game";

type UseTimerOptions = {
  onExpire?: () => void;
  onTick?: (secondsLeft: number) => void;
};

export function useTimer({ onExpire, onTick }: UseTimerOptions = {}) {
  const [secondsLeft, setSecondsLeft] = useState(GAME_DURATION_SEC);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const hasExpiredRef = useRef(false);
  const secondsLeftRef = useRef(secondsLeft);
  const onExpireRef = useRef(onExpire);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  useEffect(() => {
    onExpireRef.current = onExpire;
    onTickRef.current = onTick;
  }, [onExpire, onTick]);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /** Stops the timer and returns seconds remaining at stop time. */
  const stop = useCallback((): number => {
    const remaining = secondsLeftRef.current;
    setIsRunning(false);
    clearTimerInterval();
    return remaining;
  }, [clearTimerInterval]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;

        if (next > 0 && next <= TICK_SOUND_THRESHOLD_SEC) {
          onTickRef.current?.(next);
        }

        return next < 0 ? 0 : next;
      });
    }, 1000);

    return clearTimerInterval;
  }, [isRunning, clearTimerInterval]);

  useEffect(() => {
    if (!isRunning || secondsLeft > 0 || hasExpiredRef.current) return;

    hasExpiredRef.current = true;
    clearTimerInterval();
    onExpireRef.current?.();
  }, [secondsLeft, isRunning, clearTimerInterval]);

  useEffect(() => {
    return () => clearTimerInterval();
  }, [clearTimerInterval]);

  return {
    secondsLeft,
    stop,
  };
}
