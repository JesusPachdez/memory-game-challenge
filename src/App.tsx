import { useState } from "react";
import type { Screen } from "./types/game";
import { IntroScreen } from "./screens/IntroScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResolveScreen } from "./screens/ResolveScreen";

type ResolveOutcome = "win" | "lose";

function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [outcome, setOutcome] = useState<ResolveOutcome>("win");

  return (
    <>
      {screen === "intro" && <IntroScreen onStart={() => setScreen("game")} />}

      {screen === "game" && (
        <GameScreen
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
        <ResolveScreen
          outcome={outcome}
          onPlayAgain={() => setScreen("game")}
        />
      )}
    </>
  );
}

export default App;
