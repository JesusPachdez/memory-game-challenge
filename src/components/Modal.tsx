import { useEffect, useRef } from "react";

type ModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ message, isOpen, onClose }: ModalProps) {
  const okButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      okButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 safe-padding"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-message"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl">
        <p id="modal-message" className="text-base font-semibold text-gray-900 sm:text-lg">
          {message}
        </p>
        <button
          ref={okButtonRef}
          type="button"
          onClick={onClose}
          className="touch-target mt-5 min-w-24 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
