# Memory Game Challenge

A browser-based memory matching game for the **Evolve Media** frontend challenge. Find all four pairs of cosmic symbols before the 30-second timer runs out.

**Live demo:** [memory-game-challenge-pi.vercel.app](https://memory-game-challenge-pi.vercel.app)

## Features

- Three screens: Intro → Game → Resolve (win or lose)
- 8 cards (4 pairs), shuffled each game
- 3D card flip with responsive grid (2×4 mobile, 4×2 desktop)
- Match / no-match modals with sound effects
- 30-second timer with ticking audio from 10 seconds down
- Mute toggle (starts muted; background music when unmuted)
- Play again resets the full game session
- **Bonus:** live pairs/moves HUD and personal best via `localStorage`

## Install and run

Requires [Node.js](https://nodejs.org/) (LTS) and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/JesusPachdez/memory-game-challenge.git
cd memory-game-challenge
pnpm install
pnpm dev
```

| Command        | Description                   |
| -------------- | ----------------------------- |
| `pnpm build`   | Type-check + production build |
| `pnpm preview` | Preview the production build  |
| `pnpm lint`    | Run ESLint                    |

## Project structure

```
src/
  App.tsx              # Screen routing, win/lose, play-again
  screens/             # Intro, Game, Resolve
  components/          # Card, CardGrid, Modal, Timer, …
  hooks/
    useGameSession.ts  # Coordinates audio, game, and timer
    useGame.ts         # Board state and modals
    useTimer.ts        # Countdown
    useAudio.ts        # Sounds and mute
  utils/gameRules.ts   # Pure flip/match logic
  constants/           # Timer duration, messages, MODAL_MS
  styles/              # Theme, card flip, animations
```

## Technical decisions

- **React 19 + TypeScript + Vite** — component-based UI with type-safe game state and a fast static build.
- **Screen state in `App`** — no React Router; three linear screens are enough for this flow.
- **`useGameSession`** — wires timer, game logic, and audio so `GameScreen` stays layout-only.
- **`gameRules.ts`** — pure functions for card clicks and matches (separate from React).
- **Tailwind v4 + CSS** — utilities for layout; custom CSS for 3D flips and the cosmic gradient background.
- **`gameKey` remount** — play again resets hooks cleanly without manual state resets.
- **No backend** — client-only; best score stored in `localStorage`.

## Assumptions

| Topic         | Implementation                                      |
| ------------- | --------------------------------------------------- |
| Modal dismiss | Auto-closes after ~1.5s; OK button dismisses early   |
| Ticking sound | Plays each second while `secondsLeft` is 10 → 1     |
| Audio on load | Starts muted (browser autoplay policy)              |
| Win           | All 4 pairs matched before the timer reaches 0      |
| Lose          | Timer hits 0 with fewer than 4 pairs matched        |
| Best score    | Higher seconds left wins; tie-breaker = fewer moves |

## Stack

React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · HTML5 Audio
