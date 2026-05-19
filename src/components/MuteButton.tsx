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
      className="touch-target flex shrink-0 items-center justify-center rounded-full p-2 transition-opacity hover:opacity-80"
      aria-label={isMuted ? "Unmute game" : "Mute game"}
      aria-pressed={isMuted}
    >
      <img
        src={isMuted ? muteIcons.off : muteIcons.on}
        alt=""
        className="pointer-events-none h-8 w-8"
        aria-hidden
      />
    </button>
  );
}
