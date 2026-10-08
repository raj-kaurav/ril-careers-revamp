import { chapter, chapters, type ChapterId } from "@/data/site";
import { cn } from "@/lib/utils";

type MarkerTone = "light" | "dark" | "ink";

const tones: Record<MarkerTone, { text: string; number: string; rule: string }> = {
  light: { text: "text-muted", number: "text-terracotta-deep", rule: "bg-ink/30" },
  dark: { text: "text-ivory/70", number: "text-saffron", rule: "bg-ivory/30" },
  /* For saturated colour fields, where only full ink keeps AA contrast. */
  ink: { text: "text-ink", number: "text-ink", rule: "bg-ink" },
};

/**
 * Running chapter label, e.g. "02 / 07 — Where could you go?". Each chapter
 * still has its own real heading.
 */
export function ChapterMarker({
  id,
  tone = "light",
  className,
}: {
  id: ChapterId;
  tone?: MarkerTone;
  className?: string;
}) {
  const current = chapter(id);
  const colors = tones[tone];
  return (
    <p className={cn("caption flex items-center gap-4", colors.text, className)}>
      <span className={cn("whitespace-nowrap", colors.number)}>
        {current.number}
        <span aria-hidden="true" className="opacity-60">
          {" "}
          / {String(chapters.length).padStart(2, "0")}
        </span>
      </span>
      <span aria-hidden="true" className={cn("h-px w-10", colors.rule)} />
      <span>{current.title}</span>
    </p>
  );
}
