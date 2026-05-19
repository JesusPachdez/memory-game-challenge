import { useCallback, useEffect, useRef, useState } from "react";
import { sounds } from "../assets";

type SfxKey = "correct" | "incorrect" | "ticking";

export function useAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const backgroundRef = useRef<HTMLAudioElement | null>(null);
  const sfxRefs = useRef<Record<SfxKey, HTMLAudioElement | null>>({
    correct: null,
    incorrect: null,
    ticking: null,
  });

  useEffect(() => {
    const background = new Audio(sounds.background);
    background.loop = true;
    backgroundRef.current = background;

    const sfxKeys: SfxKey[] = ["correct", "incorrect", "ticking"];
    const sfxElements = Object.fromEntries(
      sfxKeys.map((key) => [key, new Audio(sounds[key])]),
    ) as Record<SfxKey, HTMLAudioElement>;

    sfxRefs.current = sfxElements;

    return () => {
      background.pause();
      backgroundRef.current = null;
      sfxKeys.forEach((key) => {
        sfxElements[key].pause();
      });
      sfxRefs.current = { correct: null, incorrect: null, ticking: null };
    };
  }, []);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    if (isMuted) {
      background.pause();
      return;
    }

    background.play().catch(() => {
      // Autoplay blocked until user interacts (e.g. unmutes)
    });
  }, [isMuted]);

  const playSfx = useCallback(
    (key: SfxKey) => {
      if (isMuted) return;

      const audio = sfxRefs.current[key];
      if (!audio) return;

      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [isMuted],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((muted) => !muted);
  }, []);

  return {
    isMuted,
    toggleMute,
    playCorrect: () => playSfx("correct"),
    playIncorrect: () => playSfx("incorrect"),
    playTicking: () => playSfx("ticking"),
  };
}
