"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PrototypeDialog } from "@/components/ui/PrototypeDialog";
import { cn } from "@/lib/utils";

export function StoryDialogButton({
  headline,
  role,
  businessName,
  quote,
  tone = "light",
}: {
  headline: string;
  role: string;
  businessName: string;
  quote: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View story: ${headline}`}
        className={cn(
          "group/story relative z-10 inline-flex min-h-11 items-center gap-2 text-label font-semibold underline-offset-[6px] decoration-accent hover:underline",
          tone === "dark" ? "text-white" : "text-primary",
        )}
      >
        View story
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover/story:translate-x-1"
          aria-hidden="true"
        />
      </button>
      <PrototypeDialog open={open} onClose={() => setOpen(false)} eyebrow="Illustrative story" title={headline}>
        <blockquote className="border-l-2 border-accent pl-4 text-body-lg text-primary">“{quote}”</blockquote>
        <p className="mt-4 text-body-sm font-semibold text-text">
          {role} · {businessName}
        </p>
        <p className="mt-6">
          This is a fictional profile created for the homepage concept. Full stories will be published with approved
          employee features.
        </p>
      </PrototypeDialog>
    </>
  );
}
