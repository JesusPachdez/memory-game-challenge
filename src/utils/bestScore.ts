import type { BestScore } from "../types/stats";

const STORAGE_KEY = "memory-game-best-score";

export function loadBestScore(): BestScore | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as BestScore;
    if (
      typeof parsed.secondsLeft === "number" &&
      typeof parsed.moves === "number" &&
      parsed.secondsLeft >= 0 &&
      parsed.moves > 0
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function isBetterScore(candidate: BestScore, best: BestScore): boolean {
  if (candidate.secondsLeft !== best.secondsLeft) {
    return candidate.secondsLeft > best.secondsLeft;
  }
  return candidate.moves < best.moves;
}

export function saveBestScoreIfBetter(score: BestScore): boolean {
  const current = loadBestScore();
  if (!current || isBetterScore(score, current)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
    return true;
  }
  return false;
}
