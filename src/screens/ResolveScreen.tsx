import { RESOLVE_MESSAGES } from "../constants/messages";
import type { ResolveWinStats } from "../types/stats";
import "../styles/resolve.css";

type ResolveScreenProps = {
  outcome: "win" | "lose";
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
    <main className="safe-padding safe-padding-top flex min-h-full flex-col items-center justify-center gap-6 p-6 sm:gap-8">
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <p
          className={`resolve-message text-xl font-semibold sm:text-3xl ${
            isWin ? "text-green-600" : "text-slate-700"
          }`}
        >
          {message}
        </p>

        {isWin && winStats && (
          <div className="flex flex-col gap-2 text-base text-slate-600 sm:text-lg">
            <p>
              {winStats.secondsLeft}s remaining · {winStats.moves} moves
            </p>
            {winStats.isNewBest ? (
              <p className="font-semibold text-amber-600">
                New personal best!
              </p>
            ) : winStats.bestScore ? (
              <p className="text-sm text-slate-500 sm:text-base">
                Best on this device: {winStats.bestScore.secondsLeft}s ·{" "}
                {winStats.bestScore.moves} moves
              </p>
            ) : null}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onPlayAgain}
        className="hover-bounce touch-target min-h-11 rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
      >
        Play again
      </button>
    </main>
  );
}
