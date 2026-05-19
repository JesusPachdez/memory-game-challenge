import { logoSrc } from "../assets";
import "../styles/intro.css";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <main className="flex min-h-full flex-col items-center justify-between px-6 py-12">
      <img
        src={logoSrc}
        alt="Memory game"
        className="intro-logo w-40 max-w-[min(100%,16rem)] sm:w-48"
      />

      <div className="intro-start-wrapper">
        <button
          type="button"
          onClick={onStart}
          className="intro-start rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Start
        </button>
      </div>
    </main>
  );
}
