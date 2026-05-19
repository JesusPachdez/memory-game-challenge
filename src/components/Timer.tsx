import { TICK_SOUND_THRESHOLD_SEC } from "../constants/game";

type TimerProps = {
  secondsLeft: number;
};

export function Timer({ secondsLeft }: TimerProps) {
  const isUrgent = secondsLeft <= TICK_SOUND_THRESHOLD_SEC;

  return (
    <div
      className={`touch-target flex items-center rounded-lg px-3 font-mono text-xl font-bold tabular-nums sm:text-2xl ${
        isUrgent ? "text-red-600" : "text-slate-800"
      }`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${secondsLeft} seconds remaining`}
    >
      {secondsLeft}s
    </div>
  );
}
