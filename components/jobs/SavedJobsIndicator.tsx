"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { routes } from "@/data/navigation";
import { useSavedJobs } from "@/lib/saved-jobs";

export function SavedJobsIndicator() {
  const { savedIds } = useSavedJobs();
  const count = savedIds.length;

  return (
    <Link
      href={routes.myCareers}
      className="inline-flex min-h-11 items-center gap-2 text-body-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
    >
      <Bookmark className="size-4" aria-hidden="true" />
      <span aria-live="polite">{count === 0 ? "No saved roles" : `${count} saved ${count === 1 ? "role" : "roles"}`}</span>
    </Link>
  );
}
