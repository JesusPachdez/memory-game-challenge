import { useEffect, useRef } from "react";

type ModalVariant = "success" | "error";

type ModalProps = {
  message: string;
  isOpen: boolean;
  variant: ModalVariant;
  onClose: () => void;
};

const VARIANT_CONFIG = {
  success: {
    panelClass: "modal-panel--success",
    icon: "✓",
    iconClass: "bg-green-100 text-green-600",
    title: "Match!",
  },
  error: {
    panelClass: "modal-panel--error",
    icon: "✗",
    iconClass: "bg-red-100 text-red-600",
    title: "No match",
  },
} as const;

export function Modal({ message, isOpen, variant, onClose }: ModalProps) {
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const config = VARIANT_CONFIG[variant];

  useEffect(() => {
    if (isOpen) {
      okButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm safe-padding"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <div
        className={`panel w-full max-w-sm p-6 text-center ${config.panelClass}`}
      >
        <div
          className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${config.iconClass}`}
          aria-hidden
        >
          {config.icon}
        </div>
        <p
          id="modal-title"
          className="text-sm font-semibold uppercase tracking-wide text-slate-500"
        >
          {config.title}
        </p>
        <p
          id="modal-message"
          className="mt-2 text-base font-semibold text-slate-900 sm:text-lg"
        >
          {message}
        </p>
        <button
          ref={okButtonRef}
          type="button"
          onClick={onClose}
          className="btn-primary touch-target mt-6 w-full min-w-24"
        >
          OK
        </button>
      </div>
    </div>
  );
}
