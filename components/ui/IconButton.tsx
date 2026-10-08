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
        "inline-flex size-11 shrink-0 items-center justify-center rounded-md transition-colors duration-200",
        tone === "light" ? "text-primary hover:bg-primary/6" : "text-white hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
