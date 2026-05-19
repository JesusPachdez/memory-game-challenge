import { useMemo } from "react";
import { createDeck } from "../utils/createDeck";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const deck = useMemo(() => createDeck(), []);
  console.log(deck.map((c) => `${c.id}:${c.symbol}`));
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-4 p-6">
      <p className="text-2xl font-semibold">Game (placeholder)</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onWin}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Simulate win
        </button>
        <button
          type="button"
          onClick={onLose}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Simulate lose
        </button>
      </div>
    </main>
  );
}
