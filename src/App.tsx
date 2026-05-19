import { useState } from "react";
import type { Screen } from "./types/game";
import { IntroScreen } from "./screens/IntroScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResolveScreen } from "./screens/ResolveScreen";

type ResolveOutcome = "win" | "lose";

function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [outcome, setOutcome] = useState<ResolveOutcome>("win");
  /** Increment to remount GameScreen — fresh deck, timer, and modal state */
  const [gameKey, setGameKey] = useState(0);

  const handlePlayAgain = () => {
    setGameKey((key) => key + 1);
    setScreen("game");
  };

  return (
    <>
      {screen === "intro" && <IntroScreen onStart={() => setScreen("game")} />}

      {screen === "game" && (
        <GameScreen
          key={gameKey}
          onWin={() => {
            setOutcome("win");
            setScreen("resolve");
          }}
          onLose={() => {
            setOutcome("lose");
            setScreen("resolve");
          }}
        />
      )}

      {screen === "resolve" && (
        <ResolveScreen outcome={outcome} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}

export default App;
