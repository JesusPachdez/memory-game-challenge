import { RESOLVE_MESSAGES } from "../constants/messages";
import "../styles/resolve.css";

type ResolveScreenProps = {
  outcome: "win" | "lose";
  onPlayAgain: () => void;
};

export function ResolveScreen({ outcome, onPlayAgain }: ResolveScreenProps) {
  const message = RESOLVE_MESSAGES[outcome];
  const isWin = outcome === "win";

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-8 p-6">
      <p
        className={`resolve-message max-w-md text-center text-2xl font-semibold sm:text-3xl ${
          isWin ? "text-green-600" : "text-slate-700"
        }`}
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onPlayAgain}
        className="hover-bounce rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
      >
        Play again
      </button>
    </main>
  );
}
