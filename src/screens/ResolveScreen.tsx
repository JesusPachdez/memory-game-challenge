import { RESOLVE_MESSAGES } from "../constants/messages";
import { ScreenShell } from "../components/ScreenShell";
import type { ResolveOutcome } from "../types/game";
import type { ResolveWinStats } from "../types/stats";
import "../styles/resolve.css";

type ResolveScreenProps = {
  outcome: ResolveOutcome;
  onPlayAgain: () => void;
  winStats?: ResolveWinStats | null;
};

export function ResolveScreen({
  outcome,
  onPlayAgain,
  winStats,
}: ResolveScreenProps) {
  const message = RESOLVE_MESSAGES[outcome];
  const isWin = outcome === "win";

  return (
    <ScreenShell centered className="px-6">
      <div className="panel w-full p-8 text-center">
        <span
          className="mb-4 block text-5xl"
          role="img"
          aria-label={isWin ? "Victory" : "Time up"}
        >
          {isWin ? "✨" : "⏱️"}
        </span>

        <h1
          className={`resolve-message text-2xl font-bold sm:text-3xl ${
            isWin ? "text-green-600" : "text-slate-700"
          }`}
        >
          {message}
        </h1>

        {isWin && winStats ? (
          <div className="stat-card mt-4">
            <p className="text-base font-medium text-slate-700">
              {winStats.secondsLeft}s remaining · {winStats.moves} moves
            </p>
            {winStats.isNewBest ? (
              <p className="badge-best mt-3">New personal best!</p>
            ) : winStats.bestScore ? (
              <p className="mt-3 text-sm text-slate-500">
                Best on this device: {winStats.bestScore.secondsLeft}s ·{" "}
                {winStats.bestScore.moves} moves
              </p>
            ) : null}
          </div>
        ) : (
          !isWin && (
            <p className="mt-4 text-base text-slate-500">
              Keep practicing — you&apos;ll get them all next time.
            </p>
          )
        )}

        <button
          type="button"
          onClick={onPlayAgain}
          className="btn-primary hover-bounce mt-8 w-full sm:w-auto"
        >
          Play again
        </button>
      </div>
    </ScreenShell>
  );
}
