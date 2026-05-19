import { PAIR_COUNT } from "../constants/game";
import type { Card } from "../types/game";

export function countMatchedPairs(cards: readonly Card[]): number {
  return cards.filter((card) => card.isMatched).length / 2;
}

export function isGameWon(cards: readonly Card[]): boolean {
  return countMatchedPairs(cards) === PAIR_COUNT;
}

export function getFlippedUnmatched(cards: readonly Card[]): Card[] {
  return cards.filter((card) => card.isFlipped && !card.isMatched);
}

export function flipCard(cards: readonly Card[], id: string): Card[] | null {
  const target = cards.find((card) => card.id === id);
  if (!target || target.isMatched || target.isFlipped) {
    return null;
  }

  return cards.map((card) =>
    card.id === id ? { ...card, isFlipped: true } : card,
  );
}

export function markPairMatched(
  cards: readonly Card[],
  firstId: string,
  secondId: string,
): Card[] {
  return cards.map((card) =>
    card.id === firstId || card.id === secondId
      ? { ...card, isMatched: true, isFlipped: false }
      : card,
  );
}

export function flipBackPair(
  cards: readonly Card[],
  firstId: string,
  secondId: string,
): Card[] {
  return cards.map((card) =>
    card.id === firstId || card.id === secondId
      ? { ...card, isFlipped: false }
      : card,
  );
}

export type CardClickResult =
  | { type: "invalid" }
  | { type: "flipped"; cards: Card[] }
  | {
      type: "match";
      cards: Card[];
      pairsFound: number;
    }
  | {
      type: "mismatch";
      cards: Card[];
      firstId: string;
      secondId: string;
    };

export function resolveCardClick(
  cards: readonly Card[],
  id: string,
): CardClickResult {
  const afterFlip = flipCard(cards, id);
  if (!afterFlip) {
    return { type: "invalid" };
  }

  const flipped = getFlippedUnmatched(afterFlip);
  if (flipped.length < 2) {
    return { type: "flipped", cards: afterFlip };
  }

  const [first, second] = flipped;

  if (first.symbol === second.symbol) {
    const matched = markPairMatched(afterFlip, first.id, second.id);
    return {
      type: "match",
      cards: matched,
      pairsFound: countMatchedPairs(matched),
    };
  }

  return {
    type: "mismatch",
    cards: afterFlip,
    firstId: first.id,
    secondId: second.id,
  };
}

export function getMismatchFlipBackIds(
  cards: readonly Card[],
): [string, string] | null {
  const flipped = getFlippedUnmatched(cards);
  if (flipped.length !== 2) {
    return null;
  }
  return [flipped[0].id, flipped[1].id];
}
