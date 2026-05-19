export type GameWinStats = {
  secondsLeft: number;
  moves: number;
};

export type BestScore = GameWinStats;

export type ResolveWinStats = GameWinStats & {
  isNewBest: boolean;
  bestScore: BestScore | null;
};
