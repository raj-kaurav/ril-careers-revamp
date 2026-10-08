"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Masthead } from "@/components/brand/Masthead";
import { IconButton } from "@/components/ui/IconButton";
import { primaryNav } from "@/data/navigation";
import { cn, scrollToId } from "@/lib/utils";
import { MenuOverlay } from "./MenuOverlay";

export const MENU_ID = "site-menu";
export const ROLE_FIELD_ID = "find-role";

export function goToFinder() {
  scrollToId("find", { focusId: ROLE_FIELD_ID });
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="caption sr-only z-[70] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-editorial)",
          scrolled ? "border-b border-line bg-ivory/90 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <div className="page-x mx-auto flex h-16 max-w-page items-center justify-between gap-6 lg:h-[4.5rem]">
          <a href="#top" aria-label="Reliance Careers — back to the start" className="shrink-0">
            <Masthead />
          </a>

          <div className="flex items-center gap-1 md:gap-2">
            <nav aria-label="Primary" className="mr-4 hidden md:block">
              <ul className="flex items-center gap-7">
                {primaryNav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="relative inline-flex min-h-11 items-center text-small font-medium text-ink/75 transition-colors hover:text-ink after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-right after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <IconButton label="Find opportunities" onClick={goToFinder}>
              <Search className="size-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
            </IconButton>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen(true)}
              className="group inline-flex min-h-11 items-center gap-3 rounded-full pr-1 pl-3 text-small font-medium text-ink"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="flex w-6 flex-col items-end gap-[5px]">
                <span className="h-px w-6 bg-current" />
                <span className="h-px w-4 bg-current transition-[width] duration-300 group-hover:w-6" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay id={MENU_ID} open={menuOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} onFind={goToFinder} />
    </>
  );
}
