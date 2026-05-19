import { useCallback, useEffect, useRef, useState } from "react";
import { MODAL_MS } from "../constants/game";
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
  const modalTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (modalTimeoutRef.current !== null) {
        window.clearTimeout(modalTimeoutRef.current);
      }
    };
  }, []);

  const clearModalTimeout = useCallback(() => {
    if (modalTimeoutRef.current !== null) {
      window.clearTimeout(modalTimeoutRef.current);
      modalTimeoutRef.current = null;
    }
  }, []);

  const closeModal = useCallback(() => {
    clearModalTimeout();
    setModal(null);
    unlockBoard();
  }, [clearModalTimeout, unlockBoard]);

  const showMatchModal = useCallback(
    (pairsFound: number) => {
      lockBoard();
      setModal("match");
      onMatchShown?.();

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        unlockBoard();
        onMatchResolved(pairsFound);
      }, MODAL_MS);
    },
    [lockBoard, onMatchResolved, onMatchShown, unlockBoard],
  );

  const showMismatchModal = useCallback(
    (firstId: string, secondId: string) => {
      lockBoard();
      setModal("mismatch");
      onMismatchShown?.();

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        onMismatchResolved(firstId, secondId);
        unlockBoard();
      }, MODAL_MS);
    },
    [lockBoard, onMismatchResolved, onMismatchShown, unlockBoard],
  );

  return {
    modal,
    showMatchModal,
    showMismatchModal,
    closeModal,
    clearModalTimeout,
  };
}
