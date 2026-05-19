# Memory Game Challenge

A browser-based memory matching game built for the **Evolve Media** frontend challenge. Match all four pairs of cosmic symbols before the 30-second timer runs out.

## Live demo

> **Deploy step:** After Vercel deploy (see below), paste your production URL here, e.g. `https://memory-game-challenge.vercel.app`

**Repository:** [github.com/JesusPachdez/memory-game-challenge](https://github.com/JesusPachdez/memory-game-challenge)

## Features

- **Three screens:** Intro → Game → Resolve (win or lose)
- **8 cards** (4 pairs), shuffled each game
- **3D flip animation** with responsive CSS Grid (2×4 mobile, 4×2 desktop)
- **Match / no-match modals** with success and error sounds
- **30-second countdown** with ticking audio from 10 seconds down
- **Mute toggle** (starts muted; background music when unmuted)
- **Play again** resets deck, timer, and game state (`gameKey` remount)
- **Bonus:** Live stats (pairs / moves), personal best in `localStorage`
- **UI:** Layered cosmic gradient background, HUD panels, themed modals, smart card cursors

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

| Command        | Description                        |
| -------------- | ---------------------------------- |
| `pnpm build`   | Type-check + production build      |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint`    | Run ESLint                         |

Build output goes to `dist/` and can be deployed as a static site.

## Project structure

```
src/
  App.tsx                 # Screen routing, win/lose, play-again (gameKey)
  screens/                # IntroScreen, GameScreen, ResolveScreen
  components/             # Card, CardGrid, Modal, Timer, MuteButton, …
  hooks/
    useGameSession.ts     # Composes audio + game + timer for GameScreen
    useGame.ts            # Board state, modals, moves
    useGameModal.ts       # Match/mismatch modal timing
    useBoardLock.ts       # Board lock state + ref
    useTimer.ts           # 30s countdown
    useAudio.ts           # Background + SFX + mute
  utils/
    gameRules.ts          # Pure flip/match logic (testable)
    createDeck.ts, shuffle.ts, bestScore.ts
  types/                  # Screen, Card, Symbol, GameModal, stats
  constants/              # GAME_DURATION_SEC, MODAL_MS, messages
  assets/                 # SVG images and audio
  styles/                 # theme (gradient), card flip, intro/resolve
```

## Architecture

```
App (navigation, win stats)
  └── GameScreen (layout only)
        └── useGameSession
              ├── useAudio
              ├── useGame → useBoardLock, useGameModal, gameRules
              └── useTimer
```

`GameScreen` does not wire hooks directly — `useGameSession` owns timer expire, win stats (`stop()` return value), modal sounds, and stop-on-last-pair.

## Technical decisions

### React + TypeScript + Vite

- **React 19** — screens, cards, modals; hooks isolate behavior.
- **TypeScript** — `Screen`, `Card`, `Symbol`, `GameModal`, stats types.
- **Vite** — fast dev/build; static deploy.

### Screen state instead of React Router

Three linear screens; `screen` union in `App.tsx` (`"intro" | "game" | "resolve"`). No URLs or nested routes needed.

### Hooks and pure rules

| Module | Responsibility |
| ------ | ---------------- |
| `gameRules.ts` | Pure: `resolveCardClick`, `flipCard`, `countMatchedPairs`, … |
| `useBoardLock` | Lock flag + ref for instant click guards |
| `useGameModal` | Modal state, 1.5s auto-dismiss, sound callbacks |
| `useGame` | Deck, moves, orchestrates rules + modals |
| `useTimer` | Countdown; `stop()` returns seconds left |
| `useAudio` | Mute, background loop, SFX |
| `useGameSession` | Wires the above for one playable round |

### Tailwind CSS v4 + CSS files

Tailwind for layout/responsive grid. Card 3D flip, intro animations, and **layered radial gradients** live in `src/styles/*.css`.

### Lifted state in `App.tsx`

Win stats and `ResolveOutcome` live in `App`. **Play again** increments `gameKey` to remount `GameScreen` / `useGameSession` for a full reset.

### No backend

Client-only SPA; personal best in `localStorage`.

## Assumptions and spec interpretations

| Topic | Choice |
| ----- | ------ |
| Modal dismiss | Auto-closes after **~1.5s** (`MODAL_MS` in `constants/game.ts`); OK dismisses early |
| Ticking sound | Each second while `secondsLeft` is **10 → 1** |
| Audio on load | **Starts muted** (autoplay policy) |
| Win | All **4 pairs** before timer hits 0 |
| Lose | Timer **0** with fewer than 4 pairs |
| Best score | More **seconds left** wins; tie-breaker = **fewer moves** |

## Bonus features (beyond minimum spec)

- Live HUD: pairs and moves
- Personal best on win (`localStorage`)
- Board lock when two cards are face-up
- Cosmic UI: `ScreenShell`, panels, themed modals
- Refactor: `gameRules` + focused hooks (`useGameModal`, `useBoardLock`, `useGameSession`)
- UX: cursor `default` on revealed/matched cards; `not-allowed` only on locked face-down cards
- Shining gradient background (layered radials on `.screen-gradient`)

## Git history

Incremental [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`) — one logical change per commit.

## Deploy (Vercel — recommended)

This project is a static Vite SPA. **Vercel** is a good fit: zero config with the included `vercel.json`, fast CDN, and automatic deploys from GitHub.

### Option A — GitHub integration (recommended)

1. Push `master` to [github.com/JesusPachdez/memory-game-challenge](https://github.com/JesusPachdez/memory-game-challenge).
2. Sign in at [vercel.com](https://vercel.com) → **Add New Project** → Import the repo.
3. Vercel should detect **Vite** automatically. Confirm:
   - **Install Command:** `pnpm install`
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `dist`
4. Deploy. Copy the production URL (e.g. `https://memory-game-challenge-xxx.vercel.app`).
5. Update **Live demo** above with that URL and commit: `chore: add deployment URL to README`.

### Option B — Vercel CLI

```bash
pnpm install
pnpm run build          # verify locally first
npx vercel login        # one-time browser auth
npx vercel --prod       # deploy dist/
```

### Verify before submitting

- [ ] Intro → Start → game loads
- [ ] Cards flip, match/mismatch modals and sounds work
- [ ] Timer, mute, win and lose → resolve screen
- [ ] Play again starts a fresh game
- [ ] Works on mobile width (~375px)

## Submission (Evolve Media)

Email **liliana.iturribarria@evolvemediallc.com** with:

- **GitHub repo:** https://github.com/JesusPachdez/memory-game-challenge
- **Live URL:** _(your Vercel production link)_
- **Short note** that all challenge requirements are implemented

Example:

> Hi Liliana,  
> Please find my memory game submission below.  
> Repository: https://github.com/JesusPachdez/memory-game-challenge  
> Live demo: https://your-project.vercel.app  
> All requirements are implemented, including bonus stats and personal best.  
> Thank you for your time.

## License

Private challenge submission — see repository owner for usage terms.
