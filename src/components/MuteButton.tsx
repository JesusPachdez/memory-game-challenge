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
      className="absolute right-4 top-4 z-10 rounded-full p-2 transition-opacity hover:opacity-80"
      aria-label={isMuted ? "Unmute game" : "Mute game"}
      aria-pressed={isMuted}
    >
      <img
        src={isMuted ? muteIcons.off : muteIcons.on}
        alt=""
        className="h-8 w-8"
      />
    </button>
  );
}
