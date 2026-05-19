import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createDeck } from "../utils/createDeck";
import {
  countMatchedPairs,
  flipBackPair,
  getMismatchFlipBackIds,
  isGameWon,
  resolveCardClick,
} from "../utils/gameRules";
import { useBoardLock } from "./useBoardLock";
import { useGameModal, type GameModal } from "./useGameModal";

export type { GameModal };

type UseGameOptions = {
  onWin?: () => void;
};

export function useGame({ onWin }: UseGameOptions = {}) {
  const [cards, setCards] = useState(createDeck);
  const [moves, setMoves] = useState(0);
  const cardsRef = useRef(cards);

  const { isBoardLocked, isBoardLockedRef, lockBoard, unlockBoard } =
    useBoardLock();

  const handleMatchResolved = useCallback(
    (pairsFound: number) => {
      if (pairsFound === 4) {
        onWin?.();
      }
    },
    [onWin],
  );

  const handleMismatchResolved = useCallback(
    (firstId: string, secondId: string) => {
      setCards((current) => flipBackPair(current, firstId, secondId));
    },
    [],
  );

  const {
    modal,
    showMatchModal,
    showMismatchModal,
    closeModal,
    clearModalTimeout,
    setModal,
  } = useGameModal({
    lockBoard,
    unlockBoard,
    onMatchResolved: handleMatchResolved,
    onMismatchResolved: handleMismatchResolved,
  });

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const matchedCount = useMemo(() => countMatchedPairs(cards), [cards]);

  const resetGame = useCallback(() => {
    clearModalTimeout();
    setModal(null);
    setCards(createDeck());
    setMoves(0);
    unlockBoard();
  }, [clearModalTimeout, setModal, unlockBoard]);

  const dismissModal = useCallback(() => {
    if (modal === "mismatch") {
      const ids = getMismatchFlipBackIds(cardsRef.current);
      if (ids) {
        const [firstId, secondId] = ids;
        setCards((current) => flipBackPair(current, firstId, secondId));
      }
    } else if (modal === "match" && isGameWon(cardsRef.current)) {
      onWin?.();
    }
    closeModal();
  }, [closeModal, modal, onWin]);

  const handleCardClick = useCallback(
    (id: string) => {
      if (isBoardLockedRef.current || modal !== null) {
        return;
      }

      const result = resolveCardClick(cardsRef.current, id);
      if (result.type === "invalid") {
        return;
      }

      setMoves((count) => count + 1);

      if (result.type === "flipped") {
        setCards(result.cards);
        return;
      }

      lockBoard();
      setCards(result.cards);

      if (result.type === "match") {
        showMatchModal(result.pairsFound);
      } else {
        showMismatchModal(result.firstId, result.secondId);
      }
    },
    [isBoardLockedRef, lockBoard, modal, showMatchModal, showMismatchModal],
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
