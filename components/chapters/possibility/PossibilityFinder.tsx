"use client";

import type { FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { ArrowButton } from "@/components/editorial/ArrowLink";
import { useJobSearch } from "@/components/jobs/JobSearchProvider";
import { ROLE_FIELD_ID } from "@/components/navigation/SiteHeader";
import { searchSuggestions } from "@/data/jobs";
import { worldOptions, type WorldFilter } from "@/lib/job-search";

const field =
  "display min-w-0 border-0 border-b-2 border-ink/25 bg-transparent px-0 pb-1 text-ink placeholder:text-ink/30 " +
  "transition-colors duration-300 hover:border-ink/50 focus:border-terracotta focus:outline-none focus-visible:outline-none " +
  "[&::-webkit-calendar-picker-indicator]:hidden! [&::-webkit-search-cancel-button]:appearance-none";

const LOCATIONS = ["Jamnagar", "Mumbai", "Navi Mumbai", "Bengaluru"];

/**
 * Job discovery written as a sentence the visitor completes. Three real form
 * controls with accessible names; the connecting words are presentational.
 */
export function PossibilityFinder() {
  const { draft, updateDraft, submitSearch } = useJobSearch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(draft);
  };

  const trySuggestion = (value: string) => {
    const next = LOCATIONS.includes(value)
      ? { ...draft, location: value }
      : { ...draft, keywords: value };
    submitSearch(next);
  };

  return (
    <form id="find" role="search" aria-label="Find opportunities" onSubmit={onSubmit} className="scroll-mt-28">
      <div className="display text-[1.75rem] leading-[1.35] text-ink md:text-[2.5rem] md:leading-[1.4] lg:text-[2.125rem] xl:text-[2.5rem]">
        <span aria-hidden="true">I want to work on </span>
        <input
          id={ROLE_FIELD_ID}
          type="search"
          name="q"
          aria-label="Role or skill"
          placeholder="a role or skill"
          autoComplete="off"
          value={draft.keywords}
          onChange={(event) => updateDraft({ keywords: event.target.value })}
          className={`${field} block w-full md:inline-block md:w-[13.5ch]`}
        />
        <span aria-hidden="true"> in </span>
        <span className="relative inline-block max-md:block">
          <select
            name="world"
            aria-label="Business"
            value={draft.world}
            onChange={(event) => updateDraft({ world: event.target.value as WorldFilter })}
            className={`${field} w-full cursor-pointer appearance-none pr-10 md:w-auto`}
          >
            {worldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 right-1 size-6 -translate-y-1/2 text-ink/50"
          />
        </span>
        <span aria-hidden="true">
          <span className="max-md:hidden">,</span> somewhere around{" "}
        </span>
        <input
          type="text"
          name="location"
          aria-label="Location"
          placeholder="anywhere"
          autoComplete="off"
          list="finder-locations"
          value={draft.location}
          onChange={(event) => updateDraft({ location: event.target.value })}
          className={`${field} block w-full md:inline-block md:w-[9ch]`}
        />
        <datalist id="finder-locations">
          {LOCATIONS.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>
        <span aria-hidden="true" className="max-md:hidden">
          .
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start">
        <ArrowButton type="submit" size="lg">
          Explore opportunities
        </ArrowButton>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <span className="caption mr-2 text-muted-strong">Try</span>
          {searchSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => trySuggestion(suggestion)}
              className="min-h-11 px-2 text-small text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-terracotta-deep hover:decoration-terracotta"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
