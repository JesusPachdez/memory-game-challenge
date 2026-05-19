/** Play a one-shot sound (Phase 6+). Browsers may block until user gesture. */
export function playSound(src: string): void {
  const audio = new Audio(src);
  audio.play().catch(() => {
    // Autoplay blocked or missing file — ignore
  });
}
