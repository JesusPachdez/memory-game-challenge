type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-6 p-6">
      <p className="text-2xl font-semibold">Intro (placeholder)</p>
      <button
        type="button"
        onClick={onStart}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Start
      </button>
    </main>
  );
}
