import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "demo" | "accent" | "on-dark" | "glass";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-background-muted text-text border border-border",
  demo: "border border-dashed border-text-muted/50 text-text-muted bg-transparent",
  accent: "bg-accent/15 text-accent-strong",
  "on-dark": "border border-white/25 text-white/90",
  glass: "border border-white/40 bg-white/70 text-primary backdrop-blur-md",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-body-sm leading-none font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
