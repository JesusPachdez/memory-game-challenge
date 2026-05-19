import { TICK_SOUND_THRESHOLD_SEC } from "../constants/game";

type TimerProps = {
  secondsLeft: number;
};

export function Timer({ secondsLeft }: TimerProps) {
  const isUrgent = secondsLeft <= TICK_SOUND_THRESHOLD_SEC;

  return (
    <div
      className={`timer-pill touch-target${isUrgent ? " is-urgent" : ""}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${secondsLeft} seconds remaining`}
    >
      {secondsLeft}s
    </div>
  );
}
