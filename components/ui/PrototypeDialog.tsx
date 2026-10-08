"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

/**
 * Lightweight modal for interactions that are intentionally not wired up in
 * the prototype (view role, view story, candidate account). Uses the native
 * <dialog> element for focus containment and Escape handling.
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
      className="m-auto w-[min(36rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl bg-surface p-0 text-text shadow-elevated open:animate-none"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="eyebrow mb-3 text-accent-strong">{eyebrow}</p> : null}
            <h2 id={titleId} className="text-h3 text-primary">
              {title}
            </h2>
          </div>
          <IconButton label="Close dialog" onClick={onClose} className="-mt-2 -mr-2">
            <X className="size-5" aria-hidden="true" />
          </IconButton>
        </div>
        <div className="mt-5 text-body text-text-muted">{children}</div>
        {footer ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{footer}</div> : null}
      </div>
    </dialog>
  );
}
