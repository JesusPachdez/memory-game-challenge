import logo from "./images/logo.svg";
import star from "./images/star.svg";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import comet from "./images/comet.svg";
import soundOn from "./images/sound--on.svg";
import soundOff from "./images/sound--off.svg";
import backgroundSound from "./audio/background.mp3";
import correctSound from "./audio/correct.mp3";
import incorrectSound from "./audio/incorrect.mp3";
import tickingSound from "./audio/ticking.mp3";

import type { Symbol } from "../types/game";

/** Intro screen */
export const logoSrc = logo;

/** Card fronts — key must match Symbol type */
export const symbolImages: Record<Symbol, string> = {
  star,
  moon,
  sun,
  comet,
};

/** Mute button icons (Phase 7) */
export const muteIcons = {
  on: soundOn,
  off: soundOff,
} as const;

/** Game sounds (Phases 6–8) */
export const sounds = {
  background: backgroundSound,
  correct: correctSound,
  incorrect: incorrectSound,
  ticking: tickingSound,
} as const;
