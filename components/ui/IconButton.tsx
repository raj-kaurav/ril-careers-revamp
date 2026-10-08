import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ComponentProps<"button"> & {
  /** Required: icon-only controls must have an accessible name. */
  label: string;
  children: ReactNode;
  tone?: "light" | "dark";
};

export function IconButton({ label, children, className, tone = "light", type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
        tone === "light" ? "text-ink hover:bg-ink/6" : "text-ivory hover:bg-ivory/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
