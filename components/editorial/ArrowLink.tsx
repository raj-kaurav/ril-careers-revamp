import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";
type Size = "md" | "lg";

const base =
  "group/arrow inline-flex min-h-11 items-center gap-3 font-medium whitespace-nowrap transition-colors duration-300 ease-(--ease-editorial)";

const tones: Record<Tone, string> = {
  light: "text-ink hover:text-terracotta-deep",
  dark: "text-ivory hover:text-saffron",
};

const sizes: Record<Size, string> = {
  md: "text-body",
  lg: "display text-[1.625rem] leading-none md:text-[2rem]",
};

export function arrowClasses({ tone = "light", size = "md", className }: { tone?: Tone; size?: Size; className?: string }) {
  return cn(base, tones[tone], sizes[size], className);
}

function Content({ children, size = "md" }: { children: ReactNode; size?: Size }) {
  return (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-(--ease-editorial) group-hover/arrow:scale-x-100",
            size === "lg" ? "-bottom-1.5" : "-bottom-0.5",
          )}
        />
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={cn(
          "shrink-0 transition-transform duration-500 ease-(--ease-editorial) group-hover/arrow:translate-x-1.5",
          size === "lg" ? "size-7" : "size-5",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </>
  );
}

/** Editorial call to action: words first, an arrow that leans forward on hover. */
export function ArrowLink({
  children,
  tone,
  size,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; tone?: Tone; size?: Size; children: ReactNode }) {
  return (
    <a className={arrowClasses({ tone, size, className })} {...props}>
      <Content size={size}>{children}</Content>
    </a>
  );
}

export function ArrowButton({
  children,
  tone,
  size,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; size?: Size; children: ReactNode }) {
  return (
    <button type={type} className={arrowClasses({ tone, size, className })} {...props}>
      <Content size={size}>{children}</Content>
    </button>
  );
}
