import { useCallback, useRef, useState } from "react";

export function useBoardLock() {
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const isBoardLockedRef = useRef(false);

  const lockBoard = useCallback(() => {
    isBoardLockedRef.current = true;
    setIsBoardLocked(true);
  }, []);

  const unlockBoard = useCallback(() => {
    isBoardLockedRef.current = false;
    setIsBoardLocked(false);
  }, []);

  return {
    isBoardLocked,
    isBoardLockedRef,
    lockBoard,
    unlockBoard,
  };
}
