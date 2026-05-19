import { logoSrc } from "../assets";
import "../styles/intro.css";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <main className="safe-padding safe-padding-top flex min-h-full flex-col items-center justify-between px-6 py-10 sm:py-12">
      <img
        src={logoSrc}
        alt="Memory game"
        className="intro-logo w-36 max-w-[min(100%,14rem)] sm:w-48 sm:max-w-[16rem]"
      />

      <div className="intro-start-wrapper w-full max-w-xs sm:max-w-none flex justify-center">
        <button
          type="button"
          onClick={onStart}
          className="intro-start hover-bounce touch-target min-h-11 w-full rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700 sm:w-auto"
        >
          Start
        </button>
      </div>
    </main>
  );
}
