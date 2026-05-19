import { TICK_SOUND_THRESHOLD_SEC } from "../constants/game";

type TimerProps = {
  secondsLeft: number;
};

export function Timer({ secondsLeft }: TimerProps) {
  const isUrgent = secondsLeft <= TICK_SOUND_THRESHOLD_SEC;

  return (
    <div
      className={`rounded-lg px-3 py-1 font-mono text-2xl font-bold tabular-nums ${
        isUrgent ? "text-red-600" : "text-slate-800"
      }`}
      aria-live="polite"
      aria-label={`${secondsLeft} seconds remaining`}
    >
      {secondsLeft}s
    </div>
  );
}
