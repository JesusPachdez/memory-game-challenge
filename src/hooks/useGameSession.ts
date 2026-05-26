import { useCallback, useEffect, useRef } from "react";
import { PAIR_COUNT } from "../constants/game";
import { getModalMessage } from "../constants/messages";
import type { GameWinStats } from "../types/stats";
import type { UseAudioReturn } from "./useAudio";
import { useGame } from "./useGame";
import { useTimer } from "./useTimer";

type UseGameSessionOptions = {
  onWin: (stats: GameWinStats) => void;
  onLose: () => void;
  audio: UseAudioReturn;
};

export function useGameSession({ onWin, onLose, audio }: UseGameSessionOptions) {
  const { isMuted, toggleMute, playCorrect, playIncorrect, playTicking } = audio;

  const stopRef = useRef<() => number>(() => 0);

  const {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    handleCardClick,
    dismissModal,
  } = useGame({
    onWin: ({ moves }) => onWin({ moves, secondsLeft: stopRef.current() }),
    onAllPairsMatched: () => {
      stopRef.current();
    },
    onMatchShown: playCorrect,
    onMismatchShown: playIncorrect,
  });

  const handleExpire = useCallback(() => {
    if (matchedCount < PAIR_COUNT) {
      onLose();
    }
  }, [matchedCount, onLose]);

  const { secondsLeft, stop: stopTimer } = useTimer({
    onTick: playTicking,
    onExpire: handleExpire,
  });

  useEffect(() => {
    stopRef.current = stopTimer;
  }, [stopTimer]);

  return {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    modalMessage: getModalMessage(modal),
    secondsLeft,
    isMuted,
    toggleMute,
    handleCardClick,
    dismissModal,
  };
}
