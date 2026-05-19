import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createDeck } from "../utils/createDeck";
import {
  countMatchedPairs,
  flipBackPair,
  getMismatchFlipBackIds,
  isGameWon,
  resolveCardClick,
} from "../utils/gameRules";
import type { GameWinStats } from "../types/stats";
import { useBoardLock } from "./useBoardLock";
import { useGameModal } from "./useGameModal";
import { PAIR_COUNT } from "../constants/game";

export type { GameModal } from "../types/game";

type UseGameOptions = {
  onWin?: (stats: Pick<GameWinStats, "moves">) => void;
  onAllPairsMatched?: () => void;
  onMatchShown?: () => void;
  onMismatchShown?: () => void;
};

export function useGame({
  onWin,
  onAllPairsMatched,
  onMatchShown,
  onMismatchShown,
}: UseGameOptions = {}) {
  const [cards, setCards] = useState(createDeck);
  const [moves, setMoves] = useState(0);
  const cardsRef = useRef(cards);

  const { isBoardLocked, isBoardLockedRef, lockBoard, unlockBoard } =
    useBoardLock();

  const notifyWin = useCallback(() => {
    onWin?.({ moves });
  }, [moves, onWin]);

  const handleMatchResolved = useCallback(
    (pairsFound: number) => {
      if (pairsFound === PAIR_COUNT) {
        notifyWin();
      }
    },
    [notifyWin],
  );

  const handleMismatchResolved = useCallback(
    (firstId: string, secondId: string) => {
      setCards((current) => flipBackPair(current, firstId, secondId));
    },
    [],
  );

  const { modal, showMatchModal, showMismatchModal, closeModal } = useGameModal({
    lockBoard,
    unlockBoard,
    onMatchResolved: handleMatchResolved,
    onMismatchResolved: handleMismatchResolved,
    onMatchShown,
    onMismatchShown,
  });

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const matchedCount = useMemo(() => countMatchedPairs(cards), [cards]);

  const dismissModal = useCallback(() => {
    if (modal === "mismatch") {
      const ids = getMismatchFlipBackIds(cardsRef.current);
      if (ids) {
        const [firstId, secondId] = ids;
        setCards((current) => flipBackPair(current, firstId, secondId));
      }
    } else if (modal === "match" && isGameWon(cardsRef.current)) {
      notifyWin();
    }
    closeModal();
  }, [closeModal, modal, notifyWin]);

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
        if (result.pairsFound === PAIR_COUNT) {
          onAllPairsMatched?.();
        }
        showMatchModal(result.pairsFound);
      } else {
        showMismatchModal(result.firstId, result.secondId);
      }
    },
    [
      isBoardLockedRef,
      lockBoard,
      modal,
      onAllPairsMatched,
      showMatchModal,
      showMismatchModal,
    ],
  );

  return {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    handleCardClick,
    dismissModal,
  };
}
