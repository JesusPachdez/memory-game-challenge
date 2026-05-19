import { SYMBOLS, type Card, type Symbol } from "../types/game";
import { shuffle } from "./shuffle";

function makeCard(symbol: Symbol, index: 0 | 1): Card {
  return {
    id: `${symbol}-${index}`,
    symbol,
    isFlipped: false,
    isMatched: false,
  };
}

export function createDeck(): Card[] {
  const cards = SYMBOLS.flatMap((symbol) => [
    makeCard(symbol, 0),
    makeCard(symbol, 1),
  ]);

  return shuffle(cards);
}
