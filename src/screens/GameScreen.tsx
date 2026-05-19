import { useEffect } from "react";
import { sounds } from "../assets";
import { CardGrid } from "../components/CardGrid";
import { Modal } from "../components/Modal";
import { MODAL_MESSAGES } from "../constants/messages";
import { useGame } from "../hooks/useGame";
import { playSound } from "../utils/playSound";

type GameScreenProps = {
  onWin: () => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const { cards, isBoardLocked, modal, handleCardClick, dismissModal } =
    useGame({ onWin });

  useEffect(() => {
    if (modal === "match") {
      playSound(sounds.correct);
    } else if (modal === "mismatch") {
      playSound(sounds.incorrect);
    }
  }, [modal]);

  const modalMessage =
    modal === "match"
      ? MODAL_MESSAGES.match
      : modal === "mismatch"
        ? MODAL_MESSAGES.mismatch
        : "";

  return (
    <main className="flex min-h-full flex-col items-center gap-6 p-4 sm:p-6">
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
