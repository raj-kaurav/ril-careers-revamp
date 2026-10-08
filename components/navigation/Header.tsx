"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Search, UserRound } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { PrototypeDialog } from "@/components/ui/PrototypeDialog";
import { primaryNav } from "@/data/navigation";
import { cn, scrollToId } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export const MOBILE_MENU_ID = "mobile-menu";

export function goToSearch() {
  scrollToId("search", { focusId: "job-keywords" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openAccount = useCallback(() => setAccountOpen(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-primary px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-premium",
          scrolled
            ? "border-border bg-white/90 shadow-subtle backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <Container width="header" className="flex h-18 items-center justify-between gap-4 lg:h-20">
          <a href="#top" aria-label="RIL Careers — home" className="shrink-0 rounded-sm">
            <Wordmark compact preload />
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="relative inline-flex h-11 items-center px-3 text-label text-primary/80 transition-colors hover:text-primary after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Go to job search" onClick={goToSearch} className="hidden sm:inline-flex">
              <Search className="size-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              label="My Careers"
              onClick={() => setAccountOpen(true)}
              className="hidden xl:inline-flex 2xl:hidden"
            >
              <UserRound className="size-5" aria-hidden="true" />
            </IconButton>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="hidden h-11 items-center gap-2 rounded-md px-3 text-label text-primary transition-colors hover:bg-primary/6 2xl:inline-flex"
            >
              <UserRound className="size-5" aria-hidden="true" />
              My Careers
            </button>
            <ButtonLink
              href="#search"
              onClick={(event) => {
                event.preventDefault();
                goToSearch();
              }}
              className="px-4 sm:px-5"
            >
              Find Jobs
            </ButtonLink>
            <IconButton
              ref={menuButtonRef}
              label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              onClick={() => setMenuOpen(true)}
              className="xl:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </IconButton>
          </div>
        </Container>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        returnFocusRef={menuButtonRef}
        onSearch={goToSearch}
        onAccount={openAccount}
      />

      <PrototypeDialog
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        eyebrow="My Careers"
        title="Candidate accounts are coming soon"
        footer={
          <ButtonLink
            href="#search"
            onClick={(event) => {
              event.preventDefault();
              setAccountOpen(false);
              goToSearch();
            }}
          >
            Search jobs instead
          </ButtonLink>
        }
      >
        <p>
          Saved jobs, applications and alerts will live here once sign-in is connected. This homepage concept does not
          include authentication.
        </p>
      </PrototypeDialog>
    </>
  );
}
