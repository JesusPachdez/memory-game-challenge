import type { ReactNode } from "react";

type ScreenShellProps = {
  children: ReactNode;
  className?: string;
  /** Vertically center content (intro / resolve) */
  centered?: boolean;
};

export function ScreenShell({
  children,
  className = "",
  centered = false,
}: ScreenShellProps) {
  return (
    <div className={`screen-gradient safe-padding safe-padding-top ${className}`}>
      <div
        className={`mx-auto flex w-full max-w-lg flex-col ${
          centered
            ? "min-h-full justify-center py-8"
            : "min-h-full flex-1 gap-4 py-4 sm:gap-5 sm:py-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
