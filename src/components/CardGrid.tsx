import type { Card as CardModel } from "../types/game";
import { Card } from "./Card";

type CardGridProps = {
  cards: CardModel[];
  onCardClick?: (id: string) => void;
  /** Global lock (modal open, evaluating a pair) */
  disabled?: boolean;
};

export function CardGrid({ cards, onCardClick, disabled = false }: CardGridProps) {
  const pendingFlipCount = cards.filter(
    (card) => card.isFlipped && !card.isMatched,
  ).length;

  return (
    <div
      className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      role="grid"
      aria-label="Memory card board"
    >
      {cards.map((card) => {
        const isCardDisabled =
          disabled ||
          card.isMatched ||
          card.isFlipped ||
          pendingFlipCount >= 2;

        return (
          <Card
            key={card.id}
            card={card}
            onClick={onCardClick ? () => onCardClick(card.id) : undefined}
            disabled={isCardDisabled}
          />
        );
      })}
    </div>
  );
}
