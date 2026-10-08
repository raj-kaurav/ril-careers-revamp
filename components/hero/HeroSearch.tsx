"use client";

import type { FormEvent } from "react";
import { motion } from "motion/react";
import { Briefcase, Building2, MapPin, Search } from "lucide-react";
import { useJobSearch } from "@/components/jobs/JobSearchProvider";
import { Container } from "@/components/layout/Container";
import { Button, TextLink } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { popularSearches } from "@/data/site";
import { businessOptions, type BusinessFilter } from "@/lib/job-search";
import { easePremium } from "@/lib/motion";

export function HeroSearch() {
  const { draft, updateDraft, submitSearch } = useJobSearch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch(draft);
  };

  return (
    <div id="search" className="relative z-10 -mt-14 md:-mt-20 lg:-mt-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: easePremium }}
          className="relative rounded-lg border border-border bg-surface px-5 pt-7 pb-6 shadow-elevated sm:px-7 md:px-10 md:pt-10 md:pb-8 lg:px-12 lg:pt-11"
        >
          <span aria-hidden="true" className="absolute top-0 left-5 h-[3px] w-14 bg-accent sm:left-7 md:left-10 lg:left-12" />

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <h2 id="search-title" className="text-[1.75rem] leading-[1.15] font-bold tracking-[-0.03em] text-primary md:text-[2.25rem]">
                Find your opportunity
              </h2>
              <p className="mt-2 text-body text-text-muted md:text-body-lg">
                Search roles across every Reliance business.
              </p>
            </div>
            <TextLink href="#opportunities" className="hidden md:inline-flex">
              Explore all opportunities
            </TextLink>
          </div>

          <form
            role="search"
            aria-labelledby="search-title"
            onSubmit={onSubmit}
            className="mt-7 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5 xl:grid-cols-[1.4fr_1fr_1fr_auto] xl:items-end"
          >
            <Input
              id="job-keywords"
              label="What do you want to do?"
              placeholder="Search jobs, skills or keywords"
              icon={<Briefcase className="size-5" />}
              value={draft.keywords}
              onChange={(event) => updateDraft({ keywords: event.target.value })}
              autoComplete="off"
              enterKeyHint="search"
              wrapperClassName="md:col-span-2 xl:col-span-1"
            />
            <Input
              id="job-location"
              label="Location"
              placeholder="City or state"
              icon={<MapPin className="size-5" />}
              value={draft.location}
              onChange={(event) => updateDraft({ location: event.target.value })}
              autoComplete="address-level2"
            />
            <Select
              id="job-business"
              label="Business"
              icon={<Building2 className="size-5" />}
              options={businessOptions}
              value={draft.business}
              onChange={(event) => updateDraft({ business: event.target.value as BusinessFilter })}
            />
            <Button
              type="submit"
              size="lg"
              icon={<Search className="size-5" />}
              className="w-full md:col-span-2 md:h-16 md:px-9 xl:col-span-1 xl:w-auto"
            >
              Search jobs
            </Button>
          </form>

          <div className="mt-7 flex flex-col gap-4 border-t border-border pt-5 md:flex-row md:items-center md:justify-between">
            <div className="scrollbar-none -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:-mx-7 sm:px-7 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              <span className="mr-2 shrink-0 text-body-sm font-semibold text-text-muted">Popular searches</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => submitSearch({ ...draft, keywords: term })}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-border px-4 text-body-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-background-muted"
                >
                  {term}
                </button>
              ))}
            </div>
            <TextLink href="#opportunities" className="md:hidden">
              Explore all opportunities
            </TextLink>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
