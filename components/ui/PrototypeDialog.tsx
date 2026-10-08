"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

/**
 * Lightweight modal for interactions that are intentionally not wired up in
 * the prototype (view role, apply). Uses the native <dialog> element for
 * focus containment and Escape handling.
 */
export function PrototypeDialog({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(40rem,calc(100vw-2rem))] overflow-y-auto bg-ivory p-0 text-ink"
    >
      <div className="border-t-4 border-terracotta p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="caption mb-4 text-terracotta-deep">{eyebrow}</p> : null}
            <h2 id={titleId} className="display text-title">
              {title}
            </h2>
          </div>
          <IconButton label="Close dialog" onClick={onClose} className="-mt-2 -mr-2">
            <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </IconButton>
        </div>
        <div className="mt-6 text-body text-ink/75">{children}</div>
        {footer ? <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">{footer}</div> : null}
      </div>
    </dialog>
  );
}
