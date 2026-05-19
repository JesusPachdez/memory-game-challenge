import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Card } from "../types/game";
import { createDeck } from "../utils/createDeck";

const PAIR_MISMATCH_MS = 1000;
const WIN_DELAY_MS = 400;

type UseGameOptions = {
  onWin?: () => void;
};

export function useGame({ onWin }: UseGameOptions = {}) {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const isBoardLockedRef = useRef(false);
  const cardsRef = useRef(cards);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const matchedCount = useMemo(
    () => cards.filter((card) => card.isMatched).length / 2,
    [cards],
  );

  const lockBoard = useCallback(() => {
    isBoardLockedRef.current = true;
    setIsBoardLocked(true);
  }, []);

  const unlockBoard = useCallback(() => {
    isBoardLockedRef.current = false;
    setIsBoardLocked(false);
  }, []);

  const resetGame = useCallback(() => {
    setCards(createDeck());
    unlockBoard();
  }, [unlockBoard]);

  const handleCardClick = useCallback(
    (id: string) => {
      if (isBoardLockedRef.current) return;

      const prev = cardsRef.current;
      const clicked = prev.find((card) => card.id === id);
      if (!clicked || clicked.isMatched || clicked.isFlipped) return;

      const withFlip = prev.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      );

      const flipped = withFlip.filter(
        (card) => card.isFlipped && !card.isMatched,
      );

      if (flipped.length < 2) {
        setCards(withFlip);
        return;
      }

      const [first, second] = flipped;

      if (first.symbol === second.symbol) {
        const matched = withFlip.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true, isFlipped: false }
            : card,
        );

        setCards(matched);

        const pairsFound = matched.filter((card) => card.isMatched).length / 2;
        if (pairsFound === 4) {
          window.setTimeout(() => onWin?.(), WIN_DELAY_MS);
        }
        return;
      }

      setCards(withFlip);
      lockBoard();

      window.setTimeout(() => {
        setCards((current) =>
          current.map((card) =>
            card.id === first.id || card.id === second.id
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        unlockBoard();
      }, PAIR_MISMATCH_MS);
    },
    [lockBoard, onWin, unlockBoard],
  );

  return {
    cards,
    matchedCount,
    isBoardLocked,
    handleCardClick,
    resetGame,
  };
}
