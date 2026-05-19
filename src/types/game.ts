export type Screen = "intro" | "game" | "resolve";

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

export const MODAL_MS = 1500;
