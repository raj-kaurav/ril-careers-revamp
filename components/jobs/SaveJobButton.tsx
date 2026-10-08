"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedJobs } from "@/lib/saved-jobs";
import { cn } from "@/lib/utils";

export function SaveJobButton({
  jobId,
  jobTitle,
  withLabel = false,
  className,
}: {
  jobId: string;
  jobTitle: string;
  /** Show a visible "Save"/"Saved" label next to the icon. */
  withLabel?: boolean;
  className?: string;
}) {
  const { isSaved, toggleSaved } = useSavedJobs();
  const saved = isSaved(jobId);
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      onClick={() => toggleSaved(jobId)}
      aria-pressed={withLabel ? undefined : saved}
      aria-label={withLabel ? undefined : `Save ${jobTitle}`}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md transition-colors",
        withLabel ? "border border-primary/20 px-5 text-label font-semibold hover:border-primary" : "size-11",
        saved ? "text-accent-strong hover:bg-accent/10" : "text-text-muted hover:bg-primary/5 hover:text-primary",
        withLabel && !saved && "text-primary",
        className,
      )}
    >
      <Icon className={cn("size-6", saved && "fill-accent/25", withLabel && "size-5")} aria-hidden="true" />
      {withLabel ? <span>{saved ? "Saved" : "Save role"}</span> : null}
    </button>
  );
}
