"use client";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/data/navigation";
import { getJob, toOpportunity } from "@/lib/jobs-service";
import { useSavedJobs } from "@/lib/saved-jobs";
import { JobCard } from "./JobCard";

export function SavedJobsList() {
  const { savedIds } = useSavedJobs();
  const jobs = savedIds.map(getJob).filter((job) => job !== undefined);

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-primary/25 px-6 py-10 text-center">
        <p className="text-body-lg text-text-muted">You haven&apos;t saved any roles on this device yet.</p>
        <ButtonLink href={routes.jobs} variant="secondary" icon={<ArrowRight className="size-5" />} className="mt-6">
          Find jobs
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={toOpportunity(job)} />
        </li>
      ))}
    </ul>
  );
}
