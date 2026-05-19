import { useState } from "react";
import type { Screen } from "./types/game";
import type { GameWinStats, ResolveWinStats } from "./types/stats";
import { IntroScreen } from "./screens/IntroScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResolveScreen } from "./screens/ResolveScreen";
import { loadBestScore, saveBestScoreIfBetter } from "./utils/bestScore";

type ResolveOutcome = "win" | "lose";

function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [outcome, setOutcome] = useState<ResolveOutcome>("win");
  const [winStats, setWinStats] = useState<ResolveWinStats | null>(null);
  const [gameKey, setGameKey] = useState(0);

  const handleWin = (stats: GameWinStats) => {
    const isNewBest = saveBestScoreIfBetter(stats);
    setWinStats({
      ...stats,
      isNewBest,
      bestScore: loadBestScore(),
    });
    setOutcome("win");
    setScreen("resolve");
  };

  const handlePlayAgain = () => {
    setWinStats(null);
    setGameKey((key) => key + 1);
    setScreen("game");
  };

  return (
    <>
      {screen === "intro" && <IntroScreen onStart={() => setScreen("game")} />}

      {screen === "game" && (
        <GameScreen
          key={gameKey}
          onWin={handleWin}
          onLose={() => {
            setWinStats(null);
            setOutcome("lose");
            setScreen("resolve");
          }}
        />
      )}

      {screen === "resolve" && (
        <ResolveScreen
          outcome={outcome}
          winStats={outcome === "win" ? winStats : null}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}

export default App;
