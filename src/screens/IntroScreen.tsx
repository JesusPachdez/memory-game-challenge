import { logoSrc } from "../assets";
import { ScreenShell } from "../components/ScreenShell";
import "../styles/intro.css";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <ScreenShell centered className="px-6">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <img
            src={logoSrc}
            alt=""
            className="intro-logo h-auto w-32 sm:w-40"
            aria-hidden
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Memory Match
            </h1>
            <p className="mt-3 max-w-xs text-base text-slate-300 sm:text-lg">
              Find all 4 pairs before the timer hits zero. Tap the speaker to
              hear sound.
            </p>
          </div>
        </div>

        <div className="intro-start-wrapper w-full max-w-xs sm:max-w-sm">
          <button
            type="button"
            onClick={onStart}
            className="intro-start hover-bounce btn-primary w-full"
          >
            Start
          </button>
        </div>
      </div>
    </ScreenShell>
  );
}
