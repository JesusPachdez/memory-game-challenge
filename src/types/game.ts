export type Screen = "intro" | "game" | "resolve";

export type ResolveOutcome = "win" | "lose";

export type GameModal = "match" | "mismatch" | null;

export type Symbol = "star" | "moon" | "sun" | "comet";

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
