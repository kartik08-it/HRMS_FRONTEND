import { type ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  maxWidthClassName?: string;
};

export default function Dialog({
  open,
  title,
  children,
  footer,
  onClose,
  maxWidthClassName = "max-w-2xl",
}: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${maxWidthClassName} rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden`}
      >
        {(title || footer) && (
          <div className="px-6 py-4 border-b border-gray-100">
            {title && (
              <h3 id={titleId} className="text-xl font-black text-gray-900">
                {title}
              </h3>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
