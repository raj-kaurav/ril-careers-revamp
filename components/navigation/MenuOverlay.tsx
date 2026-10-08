"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Masthead } from "@/components/brand/Masthead";
import { ArrowButton } from "@/components/editorial/ArrowLink";
import { IconButton } from "@/components/ui/IconButton";
import { primaryNav } from "@/data/navigation";
import { chapters, site } from "@/data/site";
import { easeEditorial } from "@/lib/motion";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Full-screen table of contents — the page read as a sequence of chapters. */
export function MenuOverlay({
  id,
  open,
  onClose,
  returnFocusRef,
  onFind,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onFind: () => void;
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

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-tone="dark"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeEditorial }}
        >
          <div className="page-x mx-auto flex h-16 w-full max-w-page shrink-0 items-center justify-between lg:h-[4.5rem]">
            <Masthead tone="dark" />
            <IconButton ref={closeRef} tone="dark" label="Close menu" onClick={onClose}>
              <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </IconButton>
          </div>

          <div className="page-x mx-auto grid w-full max-w-page flex-1 gap-12 pt-8 pb-10 lg:grid-cols-12 lg:pt-14">
            <nav aria-label="Chapters" className="lg:col-span-8">
              <p className="caption text-ivory/60">Contents</p>
              <ol className="mt-6">
                {chapters.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.6, ease: easeEditorial }}
                    className="border-b border-line-inverse"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={onClose}
                      className="group flex min-h-14 items-baseline gap-5 py-3 md:py-4"
                    >
                      <span className="caption w-8 shrink-0 text-saffron">{item.number}</span>
                      <span className="display text-[2rem] leading-none transition-[color,transform] duration-500 ease-(--ease-editorial) group-hover:translate-x-2 group-hover:text-saffron md:text-[2.75rem] lg:text-[3.25rem]">
                        {item.title}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>

            <div className="flex flex-col justify-between gap-10 lg:col-span-3 lg:col-start-10">
              <div>
                <p className="caption text-ivory/60">Go to</p>
                <ul className="mt-5 space-y-1">
                  {primaryNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="inline-flex min-h-11 items-center text-lede text-ivory/85 transition-colors hover:text-saffron"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ArrowButton
                  tone="dark"
                  className="mt-8"
                  onClick={() => {
                    onClose();
                    requestAnimationFrame(onFind);
                  }}
                >
                  Find opportunities
                </ArrowButton>
              </div>
              <p className="text-small text-ivory/60">{site.prototypeNotice}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
