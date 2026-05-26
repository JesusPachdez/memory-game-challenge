import { useCallback, useEffect, useRef, useState } from "react";
import { MODAL_MS, MODAL_REVEAL_DELAY_MS } from "../constants/game";
import type { GameModal } from "../types/game";

export type { GameModal };

type UseGameModalOptions = {
  lockBoard: () => void;
  unlockBoard: () => void;
  onMatchResolved: (pairsFound: number) => void;
  onMismatchResolved: (firstId: string, secondId: string) => void;
  onMatchShown?: () => void;
  onMismatchShown?: () => void;
};

export function useGameModal({
  lockBoard,
  unlockBoard,
  onMatchResolved,
  onMismatchResolved,
  onMatchShown,
  onMismatchShown,
}: UseGameModalOptions) {
  const [modal, setModal] = useState<GameModal>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const modalTimeoutRef = useRef<number | null>(null);

  const clearModalTimeouts = useCallback(() => {
    if (revealTimeoutRef.current !== null) {
      window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    if (modalTimeoutRef.current !== null) {
      window.clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearModalTimeouts;
  }, [clearModalTimeouts]);

  const closeModal = useCallback(() => {
    clearModalTimeouts();
    setModal(null);
    unlockBoard();
  }, [clearModalTimeouts, unlockBoard]);

  const showMatchModal = useCallback(
    (pairsFound: number) => {
      lockBoard();

      revealTimeoutRef.current = window.setTimeout(() => {
        revealTimeoutRef.current = null;
        setModal("match");
        onMatchShown?.();

        modalTimeoutRef.current = window.setTimeout(() => {
          modalTimeoutRef.current = null;
          setModal(null);
          unlockBoard();
          onMatchResolved(pairsFound);
        }, MODAL_MS);
      }, MODAL_REVEAL_DELAY_MS);
    },
    [lockBoard, onMatchResolved, onMatchShown, unlockBoard],
  );

  const showMismatchModal = useCallback(
    (firstId: string, secondId: string) => {
      lockBoard();

      revealTimeoutRef.current = window.setTimeout(() => {
        revealTimeoutRef.current = null;
        setModal("mismatch");
        onMismatchShown?.();

        modalTimeoutRef.current = window.setTimeout(() => {
          modalTimeoutRef.current = null;
          setModal(null);
          onMismatchResolved(firstId, secondId);
          unlockBoard();
        }, MODAL_MS);
      }, MODAL_REVEAL_DELAY_MS);
    },
    [lockBoard, onMismatchResolved, onMismatchShown, unlockBoard],
  );

  return {
    modal,
    showMatchModal,
    showMismatchModal,
    closeModal,
    clearModalTimeouts,
  };
}
