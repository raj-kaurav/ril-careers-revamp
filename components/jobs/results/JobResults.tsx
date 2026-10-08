"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { JobCard } from "@/components/jobs/JobCard";
import { Container } from "@/components/layout/Container";
import { JobSearchForm } from "@/components/search/JobSearchForm";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import {
  activeFilterCount,
  criteriaFromParams,
  describeCriteria,
  emptyCriteria,
  jobsHref,
  type JobSearchCriteria,
} from "@/lib/job-search";
import { searchJobs, toOpportunity } from "@/lib/jobs-service";
import { cn } from "@/lib/utils";
import { JobFilters } from "./JobFilters";

const FILTERS_ID = "job-filters";

/**
 * Prototype results experience. Criteria live in the URL; results come from
 * the jobs service (local mock today, HireSphere later).
 */
export function JobResults() {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const criteria = criteriaFromParams(searchParams);
  const { total, jobs } = searchJobs(criteria);
  const chips = describeCriteria(criteria);
  const filterCount = activeFilterCount(criteria);

  // Native history updates keep filtering instant; Next.js syncs useSearchParams with them.
  const update = (next: JobSearchCriteria) => window.history.replaceState(null, "", jobsHref(next));
  const setFilter = (key: keyof JobSearchCriteria, value: string) =>
    update({ ...criteria, [key]: value || (key === "location" || key === "query" ? "" : "all") });
  const clearAll = () => update(emptyCriteria);

  return (
    <>
      <div className="bg-background-muted pb-10 md:pb-12">
        <Container>
          <JobSearchForm
            key={`${criteria.query}|${criteria.location}`}
            variant="results"
            id="results-search"
            initial={criteria}
          />
        </Container>
      </div>

      <Container className="pt-10 pb-20 md:pt-14 md:pb-28">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <aside aria-labelledby="filters-title" className="lg:col-span-4 xl:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <h2 id="filters-title" className="text-h3 text-primary max-lg:sr-only">
                Filters
              </h2>
              <Button
                variant="secondary"
                aria-expanded={filtersOpen}
                aria-controls={FILTERS_ID}
                onClick={() => setFiltersOpen((open) => !open)}
                icon={<SlidersHorizontal className="size-4" />}
                className="w-full lg:hidden"
              >
                {filtersOpen ? "Hide filters" : "Show filters"}
                {filterCount > 0 ? ` (${filterCount})` : ""}
              </Button>
              {filterCount > 0 ? (
                <button
                  type="button"
                  onClick={() => update({ ...emptyCriteria, query: criteria.query })}
                  className="hidden min-h-11 text-label font-semibold text-primary underline decoration-accent underline-offset-4 lg:inline-flex lg:items-center"
                >
                  Reset
                </button>
              ) : null}
            </div>
            <JobFilters
              id={FILTERS_ID}
              criteria={criteria}
              onChange={setFilter}
              className={cn("mt-6", !filtersOpen && "max-lg:hidden")}
            />
          </aside>

          <section aria-labelledby="results-title" className="mt-10 lg:col-span-8 lg:mt-0 xl:col-span-9">
            <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 id="results-title" aria-live="polite" className="text-h3 text-primary">
                  {total} {total === 1 ? "role" : "roles"}
                  {chips.length === 0 ? " across Reliance" : ""}
                </h2>
                <p className="mt-1 text-body-sm text-text-muted">{site.demoJobsNotice}</p>
              </div>
              {chips.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Active search criteria">
                  {chips.map((chip) => (
                    <li key={chip.key}>
                      <button
                        type="button"
                        onClick={() => setFilter(chip.key, "")}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary/[0.06] pr-3 pl-4 text-body-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                      >
                        {chip.label}
                        <X className="size-4" aria-hidden="true" />
                        <span className="sr-only">— remove</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="inline-flex min-h-11 items-center px-2 text-body-sm font-semibold text-primary underline decoration-accent underline-offset-4"
                    >
                      Clear all
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>

            {jobs.length > 0 ? (
              <ul className="mt-8 grid gap-5 xl:grid-cols-2 xl:gap-6">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <JobCard job={toOpportunity(job)} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-xl border border-dashed border-primary/25 bg-background-muted px-6 py-12 text-center md:px-12 md:py-16">
                <p className="text-h3 text-primary">No demo roles match this search</p>
                <p className="mx-auto mt-3 max-w-md text-body text-text-muted">
                  Try a broader keyword or remove a filter. The live HireSphere catalogue will be much larger than this
                  prototype sample.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button onClick={clearAll}>Clear search</Button>
                  <ButtonLink href="/#businesses" variant="secondary">
                    Explore businesses
                  </ButtonLink>
                </div>
              </div>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}
