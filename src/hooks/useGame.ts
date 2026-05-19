import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Card } from "../types/game";
import { createDeck } from "../utils/createDeck";

const MODAL_MS = 1500;

export type GameModal = "match" | "mismatch" | null;

type UseGameOptions = {
  onWin?: () => void;
};

export function useGame({ onWin }: UseGameOptions = {}) {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [moves, setMoves] = useState(0);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [modal, setModal] = useState<GameModal>(null);
  const isBoardLockedRef = useRef(false);
  const cardsRef = useRef(cards);
  const modalTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current !== null) {
        window.clearTimeout(modalTimeoutRef.current);
      }
    };
  }, []);

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

  const clearModalTimeout = useCallback(() => {
    if (modalTimeoutRef.current !== null) {
      window.clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
  }, []);

  const resetGame = useCallback(() => {
    clearModalTimeout();
    setModal(null);
    setCards(createDeck());
    setMoves(0);
    unlockBoard();
  }, [clearModalTimeout, unlockBoard]);

  const closeModal = useCallback(() => {
    clearModalTimeout();
    setModal(null);
    unlockBoard();
  }, [clearModalTimeout, unlockBoard]);

  const flipBackCards = useCallback((firstId: string, secondId: string) => {
    setCards((current) =>
      current.map((card) =>
        card.id === firstId || card.id === secondId
          ? { ...card, isFlipped: false }
          : card,
      ),
    );
  }, []);

  const showMatchModal = useCallback(
    (pairsFound: number) => {
      lockBoard();
      setModal("match");

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        unlockBoard();
        if (pairsFound === 4) {
          onWin?.();
        }
      }, MODAL_MS);
    },
    [lockBoard, onWin, unlockBoard],
  );

  const showMismatchModal = useCallback(
    (firstId: string, secondId: string) => {
      lockBoard();
      setModal("mismatch");

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        flipBackCards(firstId, secondId);
        unlockBoard();
      }, MODAL_MS);
    },
    [flipBackCards, lockBoard, unlockBoard],
  );

  const dismissModal = useCallback(() => {
    if (modal === "mismatch") {
      const flipped = cardsRef.current.filter(
        (card) => card.isFlipped && !card.isMatched,
      );
      if (flipped.length === 2) {
        flipBackCards(flipped[0].id, flipped[1].id);
      }
    } else if (modal === "match") {
      const pairsFound =
        cardsRef.current.filter((card) => card.isMatched).length / 2;
      if (pairsFound === 4) {
        onWin?.();
      }
    }
    closeModal();
  }, [closeModal, flipBackCards, modal, onWin]);

  const handleCardClick = useCallback(
    (id: string) => {
      if (isBoardLockedRef.current || modal !== null) return;

      const prev = cardsRef.current;
      const clicked = prev.find((card) => card.id === id);
      if (!clicked || clicked.isMatched || clicked.isFlipped) return;

      setMoves((count) => count + 1);

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

      // Lock board as soon as two cards are up (until modal / turn resolves)
      lockBoard();

      if (first.symbol === second.symbol) {
        const matched = withFlip.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true, isFlipped: false }
            : card,
        );

        setCards(matched);

        const pairsFound = matched.filter((card) => card.isMatched).length / 2;
        showMatchModal(pairsFound);
        return;
      }

      setCards(withFlip);
      showMismatchModal(first.id, second.id);
    },
    [lockBoard, modal, showMatchModal, showMismatchModal],
  );

  return {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    handleCardClick,
    dismissModal,
    resetGame,
  };
}
