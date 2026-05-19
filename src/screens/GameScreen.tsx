import { useState } from "react";
import { CardGrid } from "../components/CardGrid";
import { createDeck } from "../utils/createDeck";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const [cards, setCards] = useState(createDeck);

  const handleCardClick = (id: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id && !card.isMatched
          ? { ...card, isFlipped: !card.isFlipped }
          : card,
      ),
    );
  };

  return (
    <main className="flex min-h-full flex-col items-center gap-6 p-4 sm:p-6">
      <CardGrid cards={cards} onCardClick={handleCardClick} />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onWin}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white sm:text-base"
        >
          Simulate win
        </button>
        <button
          type="button"
          onClick={onLose}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white sm:text-base"
        >
          Simulate lose
        </button>
      </div>
    </main>
  );
}
