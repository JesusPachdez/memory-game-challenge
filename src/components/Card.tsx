import { symbolImages } from "../assets";
import type { Card as CardModel } from "../types/game";
import "../styles/card.css";

type CardProps = {
  card: CardModel;
  onClick?: () => void;
  disabled?: boolean;
};

export function Card({ card, onClick, disabled = false }: CardProps) {
  const isFaceUp = card.isFlipped || card.isMatched;
  const isInteractive =
    Boolean(onClick) && !disabled && !card.isMatched && !card.isFlipped;

  return (
    <button
      type="button"
      className={`card-scene touch-target${card.isMatched ? " is-matched" : ""}`}
      onClick={onClick}
      disabled={!isInteractive}
      aria-label={
        card.isMatched
          ? `Matched ${card.symbol} card`
          : isFaceUp
            ? `${card.symbol} card`
            : "Hidden card, press to flip"
      }
    >
      <div className={`card-inner${isFaceUp ? " is-flipped" : ""}`}>
        <div className="card-face card-back" aria-hidden={isFaceUp}>
          ?
        </div>
        <div className="card-face card-front" aria-hidden={!isFaceUp}>
          <img src={symbolImages[card.symbol]} alt="" />
        </div>
      </div>
    </button>
  );
}
