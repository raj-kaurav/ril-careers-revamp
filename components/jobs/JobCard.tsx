"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import type { Opportunity } from "@/lib/jobs-service";
import { cn } from "@/lib/utils";
import { SaveJobButton } from "./SaveJobButton";

export function JobCard({
  job,
  headingLevel = "h3",
  className,
}: {
  job: Opportunity;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const titleId = `${job.id}-title`;
  const Heading = headingLevel;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-[box-shadow,border-color] duration-300 ease-premium hover:border-primary/25 hover:shadow-card md:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow pt-3 text-accent-strong">{job.business.name}</p>
        <SaveJobButton jobId={job.id} jobTitle={job.title} className="relative z-10 -mt-1 -mr-3" />
      </div>

      <Heading id={titleId} className="mt-3 text-h3 text-primary">
        <Link
          href={job.url}
          className="underline-offset-[5px] decoration-accent decoration-2 group-hover:underline after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none"
        >
          {job.title}
        </Link>
      </Heading>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-body text-text-muted">
        <li className="inline-flex items-center gap-2">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Location: </span>
          {job.location}
        </li>
        <li className="inline-flex items-center gap-2">
          <BriefcaseBusiness className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Experience: </span>
          {job.experience}
        </li>
      </ul>

      <ul aria-label="Key skills" className="mt-4 mb-6 flex flex-wrap gap-x-2.5 gap-y-1 text-body-sm font-medium text-text">
        {job.skills.slice(0, 3).map((skill) => (
          <li
            key={skill}
            className="after:ml-2.5 after:text-accent-strong after:content-['·'] last:after:content-none"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        <p className="flex items-center gap-2.5 text-body-sm text-text-muted">
          {job.employmentType}
          {job.isPrototype ? (
            <span className="rounded-sm border border-dashed border-text-muted/40 px-1.5 text-[0.75rem] leading-5">
              Prototype
            </span>
          ) : null}
        </p>
        <span aria-hidden="true" className="inline-flex min-h-11 items-center gap-2 text-label font-semibold text-primary">
          View role
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
