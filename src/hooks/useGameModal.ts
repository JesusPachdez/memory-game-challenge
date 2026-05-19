import { useCallback, useEffect, useRef, useState } from "react";

const MODAL_MS = 1500;

export type GameModal = "match" | "mismatch" | null;

type UseGameModalOptions = {
  lockBoard: () => void;
  unlockBoard: () => void;
  onMatchResolved: (pairsFound: number) => void;
  onMismatchResolved: (firstId: string, secondId: string) => void;
};

export function useGameModal({
  lockBoard,
  unlockBoard,
  onMatchResolved,
  onMismatchResolved,
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

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        unlockBoard();
        onMatchResolved(pairsFound);
      }, MODAL_MS);
    },
    [lockBoard, onMatchResolved, unlockBoard],
  );

  const showMismatchModal = useCallback(
    (firstId: string, secondId: string) => {
      lockBoard();
      setModal("mismatch");

      modalTimeoutRef.current = window.setTimeout(() => {
        modalTimeoutRef.current = null;
        setModal(null);
        onMismatchResolved(firstId, secondId);
        unlockBoard();
      }, MODAL_MS);
    },
    [lockBoard, onMismatchResolved, unlockBoard],
  );

  return {
    modal,
    showMatchModal,
    showMismatchModal,
    closeModal,
    clearModalTimeout,
    setModal,
  };
}
