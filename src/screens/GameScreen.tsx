import { CardGrid } from "../components/CardGrid";
import { GameStats } from "../components/GameStats";
import { Modal } from "../components/Modal";
import { MuteButton } from "../components/MuteButton";
import { ScreenShell } from "../components/ScreenShell";
import { Timer } from "../components/Timer";
import { useGameSession } from "../hooks/useGameSession";
import type { GameWinStats } from "../types/stats";

type GameScreenProps = {
  onWin: (stats: GameWinStats) => void;
  onLose: () => void;
};

export function GameScreen({ onWin, onLose }: GameScreenProps) {
  const {
    cards,
    matchedCount,
    moves,
    isBoardLocked,
    modal,
    modalMessage,
    secondsLeft,
    isMuted,
    toggleMute,
    handleCardClick,
    dismissModal,
  } = useGameSession({ onWin, onLose });

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
          variant={modal === "match" ? "success" : "error"}
          onClose={dismissModal}
        />
      )}
    </ScreenShell>
  );
}
