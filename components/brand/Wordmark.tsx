import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = {
  horizontal: {
    dark: "/brand/logo-horizontal.png",
    light: "/brand/logo-horizontal-reversed.png",
    width: 572,
    height: 152,
  },
  stacked: {
    dark: "/brand/logo-vertical.png",
    light: "/brand/logo-vertical-reversed.png",
    width: 400,
    height: 305,
  },
} as const;

export function Wordmark({
  tone = "dark",
  layout = "horizontal",
  compact = false,
  preload = false,
  className,
}: {
  /** `light` uses the reversed (white text) lock-up for dark surfaces. */
  tone?: "dark" | "light";
  layout?: "horizontal" | "stacked";
  /** Drop the "Careers" descriptor on very narrow screens. */
  compact?: boolean;
  preload?: boolean;
  className?: string;
}) {
  const isLight = tone === "light";
  const logo = logos[layout];
  const isStacked = layout === "stacked";

  return (
    <span className={cn("inline-flex items-center gap-3", isStacked && "flex-col items-start gap-4", className)}>
      <Image
        src={isLight ? logo.light : logo.dark}
        alt="Reliance Industries Limited"
        width={logo.width}
        height={logo.height}
        preload={preload}
        className={cn("w-auto shrink-0", isStacked ? "h-24" : "h-9 lg:h-10")}
      />
      <span
        className={cn(
          isStacked
            ? "eyebrow text-accent"
            : "border-l pl-3 text-[1.0625rem] font-medium leading-none tracking-[-0.01em]",
          !isStacked && (isLight ? "border-white/30 text-white/80" : "border-primary/20 text-text-muted"),
          compact && "max-[399px]:hidden",
        )}
      >
        Careers
      </span>
    </span>
  );
}
