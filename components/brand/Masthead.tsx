import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Editorial masthead: emblem, a spaced RELIANCE and an italic serif "Careers".
 * Uses the existing emblem asset; the lock-up itself is a prototype treatment.
 */
export function Masthead({
  tone = "light",
  size = "md",
  className,
}: {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const large = size === "lg";
  return (
    <span className={cn("inline-flex items-center", large ? "gap-4" : "gap-2.5", className)}>
      <Image
        src="/brand/logo-emblem.png"
        alt=""
        width={1024}
        height={947}
        className={cn("w-auto shrink-0", large ? "h-12" : "h-7")}
      />
      <span className={cn("flex items-baseline", large ? "gap-3" : "gap-2")}>
        <span
          className={cn(
            "font-semibold tracking-[0.24em]",
            large ? "text-[1.125rem]" : "text-[0.8125rem]",
            tone === "light" ? "text-ink" : "text-ivory",
          )}
        >
          RELIANCE
        </span>
        <span
          className={cn(
            "display italic",
            large ? "text-[1.75rem]" : "text-[1.1875rem]",
            tone === "light" ? "text-terracotta-deep" : "text-saffron",
          )}
        >
          Careers
        </span>
      </span>
    </span>
  );
}
