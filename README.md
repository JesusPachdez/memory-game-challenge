# Memory Game Challenge

A browser-based memory matching game built for the **Evolve Media** frontend challenge. Match all four pairs of cosmic symbols before the 30-second timer runs out.

## Live demo

> **Coming soon** — URL will be added after Phase 12 deployment (Vercel/Netlify).

## Features

- **Three screens:** Intro → Game → Resolve (win or lose)
- **8 cards** (4 pairs), shuffled each game
- **3D flip animation** with responsive CSS Grid (2×4 mobile, 4×2 desktop)
- **Match / no-match modals** with success and error sounds
- **30-second countdown** with ticking audio from 10 seconds down
- **Mute toggle** (starts muted; background music when unmuted)
- **Play again** resets deck, timer, and game state
- **Bonus:** Live stats (pairs / moves), personal best saved in `localStorage`
- **UI polish:** Cosmic theme, HUD panels, accessible tap targets

## Install and run

Requires [Node.js](https://nodejs.org/) (LTS recommended) and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/JesusPachdez/memory-game-challenge.git
cd memory-game-challenge
pnpm install
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm build`   | Type-check + production build        |
| `pnpm preview` | Serve the production build locally   |
| `pnpm lint`    | Run ESLint                           |

Build output goes to `dist/` and can be deployed as a static site.

## Project structure

```
src/
  App.tsx              # Screen routing, win stats, play-again reset
  screens/             # IntroScreen, GameScreen, ResolveScreen
  components/          # Card, CardGrid, Modal, Timer, MuteButton, …
  hooks/               # useGame, useTimer, useAudio
  utils/               # createDeck, shuffle, bestScore
  types/               # game and stats TypeScript types
  constants/           # timer duration, modal messages
  assets/              # SVG images and audio files
  styles/              # theme, card flip, intro/resolve animations
```

## Technical decisions

### React + TypeScript + Vite

- **React 19** — component model fits screens, cards, and modals; hooks isolate game logic.
- **TypeScript** — `Screen`, `Card`, and `Symbol` types catch invalid states at compile time.
- **Vite** — fast dev server and simple static build; no server required.

### Screen state instead of React Router

The app has exactly three linear screens with no deep links or URL params. A single `screen` union in `App.tsx` (`"intro" | "game" | "resolve"`) keeps navigation obvious and avoids router boilerplate.

### Custom hooks for separation of concerns

| Hook        | Responsibility                                      |
| ----------- | --------------------------------------------------- |
| `useGame`   | Deck, flips, matches, board lock, modals, moves     |
| `useTimer`  | 30s countdown, tick callback, expire handler        |
| `useAudio`  | Background loop, SFX, mute state                    |

`GameScreen` composes these hooks and wires callbacks (`onWin`, `onLose`, sounds).

### Tailwind CSS v4 + dedicated CSS files

Tailwind handles layout, spacing, and responsive utilities. Complex animations (card 3D flip, intro slide-in, bounce) live in `src/styles/*.css` where pure CSS is clearer than utility classes.

### Lifted state in `App.tsx`

Win statistics and resolve outcome live in `App` so `ResolveScreen` can show moves, time left, and personal best. **Play again** increments `gameKey` to remount `GameScreen`, guaranteeing a full reset without manual cleanup in every hook.

### No backend

The game is fully client-side. Personal best uses `localStorage` only.

## Assumptions and spec interpretations

Documented so reviewers and future you know what was chosen:

| Topic              | Choice implemented                                                                 |
| ------------------ | ----------------------------------------------------------------------------------- |
| Modal dismiss      | Auto-closes after **~1.5s**; user can also click OK to dismiss early               |
| Ticking sound      | Plays **each second** while `secondsLeft` is **10 → 1** (not only once at 10)      |
| Audio on load      | **Starts muted**; user unmutes via top-right control (avoids autoplay policy issues) |
| Win condition      | All **4 pairs** matched before timer hits 0                                        |
| Lose condition     | Timer reaches **0** with fewer than 4 pairs matched                                |
| Best score ranking | Higher **seconds left** wins; tie-breaker = **fewer moves**                        |

## Bonus features (beyond minimum spec)

- **Live HUD:** `Pairs X/4 · Moves Y` during gameplay
- **Personal best:** Saved to `localStorage` on win; shown on resolve screen
- **Board lock fix:** Cards disabled as soon as two cards are face-up (prevents extra clicks)
- **Cosmic UI pass:** `ScreenShell`, theme tokens, themed modals, matched-card styling

## Git history

Features were committed incrementally using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `style:`, `chore:`, `docs:`) — one logical change per commit, matching the phased build plan.

## Submission (Phase 12)

1. Deploy `dist/` to Vercel or Netlify (Vite preset).
2. Add production URL above.
3. Email **liliana.iturribarria@evolvemediallc.com** with repo URL, live URL, and confirmation that requirements are met.

## License

Private challenge submission — see repository owner for usage terms.
