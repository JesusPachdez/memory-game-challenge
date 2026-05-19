import { useCallback, useEffect, useRef } from "react";
import { CardGrid } from "../components/CardGrid";
import { GameStats } from "../components/GameStats";
import { Modal } from "../components/Modal";
import { MuteButton } from "../components/MuteButton";
import { ScreenShell } from "../components/ScreenShell";
import { Timer } from "../components/Timer";
import { MODAL_MESSAGES } from "../constants/messages";
import { useAudio } from "../hooks/useAudio";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import type { GameWinStats } from "../types/stats";

type GameScreenProps = {
  onWin: (stats: GameWinStats) => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const { isMuted, toggleMute, playCorrect, playIncorrect, playTicking } =
    useAudio();

  const matchedCountRef = useRef(0);
  const secondsLeftRef = useRef(0);
  const movesRef = useRef(0);

  const handleExpire = useCallback(() => {
    if (matchedCountRef.current < 4) {
      onLose();
    }
  }, [onLose]);

  const { secondsLeft, stop: stopTimer } = useTimer({
    onExpire: handleExpire,
    onTick: playTicking,
  });

  const handleGameWin = useCallback(() => {
    stopTimer();
    onWin({
      secondsLeft: secondsLeftRef.current,
      moves: movesRef.current,
    });
  }, [onWin, stopTimer]);

  const {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    handleCardClick,
    dismissModal,
  } = useGame({ onWin: handleGameWin });

  useEffect(() => {
    matchedCountRef.current = matchedCount;
  }, [matchedCount]);

  useEffect(() => {
    secondsLeftRef.current = secondsLeft;
  }, [secondsLeft]);

  useEffect(() => {
    movesRef.current = moves;
  }, [moves]);

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
    <ScreenShell className="px-4 sm:px-6">
      <header className="panel flex shrink-0 items-start justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-col gap-2">
          <Timer secondsLeft={secondsLeft} />
          <GameStats pairsMatched={matchedCount} moves={moves} />
        </div>
        <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      </header>

      <section className="panel flex flex-1 flex-col justify-center p-3 sm:p-5">
        <CardGrid
          cards={cards}
          onCardClick={handleCardClick}
          disabled={isBoardLocked}
        />
      </section>

      {modal && (
        <Modal
          message={modalMessage}
          isOpen
          variant={modal === "match" ? "success" : "error"}
          onClose={dismissModal}
        />
      )}
    </ScreenShell>
  );
}
