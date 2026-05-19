import { useEffect } from "react";
import { CardGrid } from "../components/CardGrid";
import { Modal } from "../components/Modal";
import { MuteButton } from "../components/MuteButton";
import { MODAL_MESSAGES } from "../constants/messages";
import { useAudio } from "../hooks/useAudio";
import { useGame } from "../hooks/useGame";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const { isMuted, toggleMute, playCorrect, playIncorrect } = useAudio();
  const { cards, isBoardLocked, modal, handleCardClick, dismissModal } =
    useGame({ onWin });

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
    <main className="relative flex min-h-full flex-col items-center gap-6 p-4 sm:p-6">
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />

      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        disabled={isBoardLocked}
      />

      <button
        type="button"
        onClick={onLose}
        className="rounded-lg bg-red-600/80 px-4 py-2 text-sm text-white sm:text-base"
      >
        Simulate lose
      </button>

      <Modal
        message={modalMessage}
        isOpen={modal !== null}
        onClose={dismissModal}
      />
    </main>
  );
}
