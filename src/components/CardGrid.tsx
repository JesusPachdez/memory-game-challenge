import type { Card as CardModel } from "../types/game";
import { getFlippedUnmatched } from "../utils/gameRules";
import { Card } from "./Card";

type CardGridProps = {
  cards: CardModel[];
  onCardClick?: (id: string) => void;
  disabled?: boolean;
};

export function CardGrid({
  cards,
  onCardClick,
  disabled = false,
}: CardGridProps) {
  const pendingFlipCount = getFlippedUnmatched(cards).length;

  return (
    <div
      className="grid w-full grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-3"
      role="grid"
      aria-label="Memory card board"
      aria-busy={disabled}
    >
      {cards.map((card) => {
        const isCardDisabled =
          disabled || card.isMatched || card.isFlipped || pendingFlipCount >= 2;
        const isLocked =
          !card.isFlipped &&
          !card.isMatched &&
          (disabled || pendingFlipCount >= 2);

        return (
          <Card
            key={card.id}
            card={card}
            onClick={onCardClick ? () => onCardClick(card.id) : undefined}
            disabled={isCardDisabled}
            isLocked={isLocked}
          />
        );
      })}
    </div>
  );
}
