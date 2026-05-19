import { useCallback, useEffect, useRef } from "react";
import { CardGrid } from "../components/CardGrid";
import { Modal } from "../components/Modal";
import { MuteButton } from "../components/MuteButton";
import { Timer } from "../components/Timer";
import { MODAL_MESSAGES } from "../constants/messages";
import { useAudio } from "../hooks/useAudio";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const { isMuted, toggleMute, playCorrect, playIncorrect, playTicking } =
    useAudio();

  const matchedCountRef = useRef(0);

  const handleExpire = useCallback(() => {
    if (matchedCountRef.current < 4) {
      onLose();
    }
  }, [onLose]);

  const { secondsLeft, stop: stopTimer } = useTimer({
    onExpire: handleExpire,
    onTick: playTicking,
  });

  const handleWin = useCallback(() => {
    stopTimer();
    onWin();
  }, [onWin, stopTimer]);

  const {
    cards,
    matchedCount,
    isBoardLocked,
    modal,
    handleCardClick,
    dismissModal,
  } = useGame({ onWin: handleWin });

  useEffect(() => {
    matchedCountRef.current = matchedCount;
  }, [matchedCount]);

  useEffect(() => {
    if (matchedCount === 4) {
      stopTimer();
    }
  }, [matchedCount, stopTimer]);

  useEffect(() => {
    if (modal === "match") {
      playCorrect();
    } else if (modal === "mismatch") {
      playIncorrect();
    }
  }, [modal, playCorrect, playIncorrect]);

  const modalMessage =
    modal === "match"
      ? MODAL_MESSAGES.match
      : modal === "mismatch"
        ? MODAL_MESSAGES.mismatch
        : "";

  return (
    <main className="safe-padding safe-padding-top flex min-h-full flex-col items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6">
      <header className="flex w-full max-w-2xl shrink-0 items-center justify-between gap-3">
        <Timer secondsLeft={secondsLeft} />
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </header>

      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        disabled={isBoardLocked}
      />

      <Modal
        message={modalMessage}
        isOpen={modal !== null}
        onClose={dismissModal}
      />
    </main>
  );
}
