"use client";

import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, ChevronDown, MapPin, Search } from "lucide-react";
import { popularSearches } from "@/data/site";
import {
  JOBS_PATH,
  PARAM,
  businessOptions,
  emptyCriteria,
  jobsHref,
  type JobSearchCriteria,
} from "@/lib/job-search";
import { getJobLocations } from "@/lib/jobs-service";
import { cn } from "@/lib/utils";

const jobLocations = getJobLocations();

function Field({
  labelId,
  label,
  icon,
  className,
  children,
}: {
  labelId: string;
  label: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex min-w-0 cursor-text flex-col justify-center gap-1 rounded-lg px-4 py-3 transition-colors duration-200 md:px-5",
        "hover:bg-primary/[0.035] focus-within:bg-white focus-within:ring-2 focus-within:ring-accent-secondary/45",
        className,
      )}
    >
      <span id={labelId} className="text-body-sm font-semibold text-primary">
        {label}
      </span>
      <span className="flex items-center gap-2.5 text-text-muted">
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}

const inputClasses =
  "h-8 w-full min-w-0 bg-transparent text-body text-text placeholder:text-text-muted focus:outline-none focus-visible:outline-none md:text-body-lg";

/**
 * Job search used in the hero and on /jobs. It is a real GET form targeting
 * /jobs, so it works without JavaScript; with JavaScript it navigates
 * client-side and drops empty parameters.
 */
export function JobSearchForm({
  variant = "hero",
  initial = emptyCriteria,
  id = "job-search",
}: {
  variant?: "hero" | "results";
  /** Current criteria — prefills fields; filters not shown in the form are preserved on submit. */
  initial?: JobSearchCriteria;
  id?: string;
}) {
  const router = useRouter();
  const isHero = variant === "hero";
  const ids = {
    query: `${id}-query`,
    location: `${id}-location`,
    business: `${id}-business`,
    locations: `${id}-locations`,
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const next: JobSearchCriteria = {
      ...initial,
      query: text(PARAM.query),
      location: text(PARAM.location),
      business: isHero ? ((text(PARAM.business) || "all") as JobSearchCriteria["business"]) : initial.business,
    };
    if (isHero) router.push(jobsHref(next));
    else window.history.pushState(null, "", jobsHref(next));
  };

  return (
    <div>
      <form
        role="search"
        aria-label="Search jobs"
        action={JOBS_PATH}
        method="get"
        onSubmit={onSubmit}
        className={cn(
          "grid gap-1 rounded-xl border p-2",
          isHero
            ? "border-white/70 bg-white/90 shadow-elevated ring-1 ring-primary/5 backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1fr_auto]"
            : "border-border bg-surface shadow-card md:grid-cols-[1.6fr_1fr_auto]",
        )}
      >
        <Field
          labelId={`${ids.query}-label`}
          label="What do you want to do?"
          icon={<Search className="size-5" />}
          className={cn(isHero && "sm:col-span-2 xl:col-span-1")}
        >
          <input
            id={ids.query}
            aria-labelledby={`${ids.query}-label`}
            name={PARAM.query}
            type="search"
            defaultValue={initial.query}
            placeholder="Search jobs, skills or keywords"
            autoComplete="off"
            enterKeyHint="search"
            className={inputClasses}
          />
        </Field>

        <Field
          labelId={`${ids.location}-label`}
          label="Location"
          icon={<MapPin className="size-5" />}
          className={
            isHero
              ? "max-xl:border-t max-xl:border-border max-xl:rounded-t-none xl:before:absolute xl:before:inset-y-3 xl:before:-left-0.5 xl:before:w-px xl:before:bg-border"
              : "max-md:border-t max-md:border-border max-md:rounded-t-none md:before:absolute md:before:inset-y-3 md:before:-left-0.5 md:before:w-px md:before:bg-border"
          }
        >
          <input
            id={ids.location}
            aria-labelledby={`${ids.location}-label`}
            name={PARAM.location}
            defaultValue={initial.location}
            placeholder="City or state"
            list={ids.locations}
            autoComplete="off"
            className={inputClasses}
          />
        </Field>

        {isHero ? (
          <Field
            labelId={`${ids.business}-label`}
            label="Business"
            icon={<Building2 className="size-5" />}
            className="cursor-pointer max-xl:border-t max-xl:border-border max-xl:rounded-t-none sm:before:absolute sm:before:inset-y-3 sm:before:-left-0.5 sm:before:w-px sm:before:bg-border"
          >
            <span className="relative flex w-full min-w-0 items-center">
              <select
                id={ids.business}
                aria-labelledby={`${ids.business}-label`}
                name={PARAM.business}
                defaultValue={initial.business}
                className={cn(inputClasses, "cursor-pointer appearance-none pr-7")}
              >
                {businessOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-0 size-5" />
            </span>
          </Field>
        ) : null}

        <button
          type="submit"
          className={cn(
            "group/button mt-1 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-lg bg-primary px-7 text-body font-semibold text-white transition-colors duration-200 hover:bg-primary-hover active:translate-y-px md:text-[1.0625rem]",
            isHero ? "sm:col-span-2 xl:col-span-1 xl:mt-0 xl:px-8" : "md:mt-0",
          )}
        >
          Search Jobs
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover/button:translate-x-0.5"
          />
        </button>

        <datalist id={ids.locations}>
          {jobLocations.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </form>

      {isHero ? (
        <div className="mt-5 flex items-center gap-2 max-md:scrollbar-none max-md:-mx-5 max-md:overflow-x-auto max-md:px-5 md:flex-wrap">
          <span className="mr-1 shrink-0 text-body-sm font-semibold text-text-muted">Popular:</span>
          <ul className="flex shrink-0 gap-2 md:flex-wrap" aria-label="Popular searches">
            {popularSearches.map((term) => (
              <li key={term}>
                <Link
                  href={jobsHref({ query: term })}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-primary/15 bg-white/75 px-4 text-body-sm font-semibold whitespace-nowrap text-primary transition-colors hover:border-primary/40 hover:bg-white"
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
