"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search, UserRound, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { primaryNav } from "@/data/navigation";
import { easePremium } from "@/lib/motion";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  id,
  open,
  onClose,
  returnFocusRef,
  onSearch,
  onAccount,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onSearch: () => void;
  onAccount: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTo = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, onClose, returnFocusRef]);

  const closeThen = (action?: () => void) => () => {
    onClose();
    if (action) requestAnimationFrame(action);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-surface xl:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: easePremium }}
        >
          <div className="flex h-18 shrink-0 items-center justify-between border-b border-border px-5 sm:px-6 md:px-8">
            <Wordmark compact />
            <IconButton ref={closeRef} label="Close menu" onClick={onClose}>
              <X className="size-6" aria-hidden="true" />
            </IconButton>
          </div>

          <nav aria-label="Primary" className="flex-1 px-5 pt-6 sm:px-6 md:px-8">
            <ul className="divide-y divide-border">
              {primaryNav.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.3, ease: easePremium }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex min-h-16 items-center justify-between py-3 text-[1.5rem] font-bold tracking-[-0.02em] text-primary"
                  >
                    {item.label}
                    <ArrowRight
                      className="size-5 text-accent-strong transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-border bg-background-muted px-5 py-6 sm:grid-cols-2 sm:px-6 md:px-8">
            <Button size="lg" onClick={closeThen(onSearch)} icon={<Search className="size-5" />}>
              Find Jobs
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={closeThen(onAccount)}
              icon={<UserRound className="size-5" />}
            >
              My Careers
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
