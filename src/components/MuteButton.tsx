import { muteIcons } from "../assets";

type MuteButtonProps = {
  isMuted: boolean;
  onToggle: () => void;
};

export function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="touch-target flex shrink-0 items-center justify-center rounded-full bg-slate-100 p-2.5 transition-colors hover:bg-slate-200"
      aria-label={isMuted ? "Unmute game" : "Mute game"}
      aria-pressed={isMuted}
    >
      <img
        src={isMuted ? muteIcons.off : muteIcons.on}
        alt=""
        className="pointer-events-none h-7 w-7"
        aria-hidden
      />
    </button>
  );
}
