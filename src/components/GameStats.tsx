import { PAIR_COUNT } from "../constants/game";

type GameStatsProps = {
  pairsMatched: number;
  moves: number;
};

export function GameStats({ pairsMatched, moves }: GameStatsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      aria-live="polite"
      aria-label={`${pairsMatched} of ${PAIR_COUNT} pairs matched, ${moves} moves`}
    >
      <span className="chip">
        <span className="chip-label">
          Pairs: {pairsMatched}/{PAIR_COUNT}
        </span>
      </span>
      <span className="chip">
        <span className="chip-label">Moves: {moves}</span>
      </span>
    </div>
  );
}
