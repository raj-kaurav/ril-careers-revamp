import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "light" | "muted" | "navy" | "dark";

const tones: Record<SectionTone, string> = {
  light: "bg-background text-text",
  muted: "bg-background-muted text-text",
  navy: "bg-primary text-white",
  dark: "bg-background-dark text-white",
};

export function Section({
  id,
  labelledBy,
  tone = "light",
  spacing = "default",
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: SectionTone;
  spacing?: "default" | "compact" | "none";
  className?: string;
  children: ReactNode;
}) {
  const isDark = tone === "navy" || tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-surface={isDark ? "dark" : "light"}
      className={cn(
        "relative",
        tones[tone],
        spacing === "default" && "py-20 md:py-28 lg:py-[8.5rem]",
        spacing === "compact" && "py-16 md:py-20 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Eyebrow + heading + optional intro used to open editorial sections. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
  align = "left",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-6 flex items-center gap-3",
            align === "center" && "justify-center",
            tone === "dark" ? "text-accent" : "text-accent-strong",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={cn("text-h2", tone === "dark" ? "text-white" : "text-primary")}>
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-body-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-text-inverse-muted" : "text-text-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
