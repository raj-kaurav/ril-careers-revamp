import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export type ButtonVariant = "primary" | "accent" | "secondary" | "inverse" | "outline-inverse" | "ghost";
export type ButtonSize = "md" | "lg";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-(--ease-premium) " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-subtle hover:bg-primary-hover",
  accent: "bg-accent text-primary-dark hover:bg-[#d8b33a]",
  secondary: "border border-primary/20 bg-surface text-primary hover:border-primary hover:bg-background-muted",
  inverse: "bg-white text-primary hover:bg-background-muted",
  "outline-inverse": "border border-white/35 text-white hover:border-white hover:bg-white/10",
  ghost: "text-primary hover:bg-primary/5",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-label",
  lg: "h-14 px-7 text-body md:text-[1.0625rem]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Content({ children, icon }: Pick<CommonProps, "children" | "icon">) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-(--ease-premium) group-hover/button:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );
}

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: CommonProps & LinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      <Content icon={icon}>{children}</Content>
    </Link>
  );
}

/** Understated text link with an animated arrow — for secondary actions. */
export function TextLink({
  children,
  className,
  tone = "dark",
  ...props
}: LinkProps & { tone?: "dark" | "light" }) {
  return (
    <Link
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-2 text-label font-semibold underline-offset-[6px] hover:underline",
        tone === "dark" ? "text-primary decoration-accent" : "text-white decoration-accent",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 transition-transform duration-200 ease-(--ease-premium) group-hover/link:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
