type ResolveScreenProps = {
  outcome: "win" | "lose";
  onPlayAgain: () => void;
};

export function ResolveScreen({ outcome, onPlayAgain }: ResolveScreenProps) {
  const message =
    outcome === "win" ? "you did it" : "oops you didn't find them all";

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-6 p-6">
      <p className="text-2xl font-semibold">{message}</p>
      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Play again
      </button>
    </main>
  );
}
