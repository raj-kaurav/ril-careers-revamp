"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { primaryNav, routes } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export const MOBILE_MENU_ID = "mobile-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
          <Link href={routes.home} aria-label="RIL Careers — home" className="shrink-0 rounded-sm">
            <Wordmark compact preload />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="relative inline-flex h-11 items-center px-3 text-label text-primary/80 transition-colors hover:text-primary after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={routes.myCareers}
              aria-label="My Careers"
              className="hidden size-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary/6 xl:inline-flex 2xl:hidden"
            >
              <UserRound className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={routes.myCareers}
              className="hidden h-11 items-center gap-2 rounded-md px-3 text-label text-primary transition-colors hover:bg-primary/6 2xl:inline-flex"
            >
              <UserRound className="size-5" aria-hidden="true" />
              My Careers
            </Link>
            <ButtonLink href={routes.jobs} className="px-4 sm:px-5">
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

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />
    </>
  );
}
