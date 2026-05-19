import type { GameModal } from "../types/game";

export const MODAL_MESSAGES = {
  match: "nice! it's a match",
  mismatch: "sorry, but this is not a match",
} as const;

export function getModalMessage(modal: GameModal): string {
  if (modal === "match") return MODAL_MESSAGES.match;
  if (modal === "mismatch") return MODAL_MESSAGES.mismatch;
  return "";
}

export const RESOLVE_MESSAGES = {
  win: "you did it!",
  lose: "oops you didn't find them all!",
} as const;
