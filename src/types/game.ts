export type Screen = "intro" | "game" | "resolve";

// Used in later phases — define now so imports stay stable
export type Symbol = "star" | "moon" | "sun" | "comet";

export type Card = {
  id: string;
  symbol: Symbol;
  isFlipped: boolean;
  isMatched: boolean;
};
