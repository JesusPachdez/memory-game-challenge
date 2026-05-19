import type { Card as CardModel } from "../types/game";
import { Card } from "./Card";

type CardGridProps = {
  cards: CardModel[];
  onCardClick?: (id: string) => void;
  disabled?: boolean;
};

export function CardGrid({ cards, onCardClick, disabled = false }: CardGridProps) {
  return (
    <div
      className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      role="grid"
      aria-label="Memory card board"
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick ? () => onCardClick(card.id) : undefined}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
