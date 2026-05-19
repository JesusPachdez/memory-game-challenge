import { CardGrid } from "../components/CardGrid";
import { useGame } from "../hooks/useGame";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const { cards, isBoardLocked, handleCardClick } = useGame({ onWin });

  return (
    <main className="flex min-h-full flex-col items-center gap-6 p-4 sm:p-6">
      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        disabled={isBoardLocked}
      />

      <button
        type="button"
        onClick={onLose}
        className="rounded-lg bg-red-600/80 px-4 py-2 text-sm text-white sm:text-base"
      >
        Simulate lose
      </button>
    </main>
  );
}
