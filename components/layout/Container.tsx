import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  width = "content",
}: {
  children: ReactNode;
  className?: string;
  width?: "content" | "header";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10",
        width === "content" ? "max-w-content" : "max-w-header",
        className,
      )}
    >
      {children}
    </div>
  );
}
