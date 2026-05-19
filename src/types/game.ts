export type Screen = "intro" | "game" | "resolve";

export type Symbol = "star" | "moon" | "sun" | "comet";

/** All pair types — one source of truth for createDeck() */
export const SYMBOLS: readonly Symbol[] = [
  "star",
  "moon",
  "sun",
  "comet",
] as const;

export type Card = {
  id: string;
  symbol: Symbol;
  isFlipped: boolean;
  isMatched: boolean;
};
