import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Plain-text marker for illustrative or demo content. Deliberately not a badge. */
export function DemoNote({
  children = "Prototype · illustrative content",
  tone = "light",
  className,
}: {
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("caption flex items-center gap-2", tone === "light" ? "text-muted" : "text-ivory/60", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", tone === "light" ? "bg-terracotta" : "bg-saffron")} />
      {children}
    </p>
  );
}
