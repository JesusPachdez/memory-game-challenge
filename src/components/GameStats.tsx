import { PAIR_COUNT } from "../constants/game";

type GameStatsProps = {
  pairsMatched: number;
  moves: number;
};

export function GameStats({ pairsMatched, moves }: GameStatsProps) {
  return (
    <p
      className="text-sm font-medium text-slate-600 sm:text-base"
      aria-live="polite"
    >
      Pairs: {pairsMatched} / {PAIR_COUNT}
      <span className="mx-2 text-slate-400" aria-hidden="true">
        ·
      </span>
      Moves: {moves}
    </p>
  );
}
