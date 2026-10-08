"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bookmark, SearchCheck, UserRound, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button, ButtonLink, TextLink } from "@/components/ui/Button";
import { PrototypeDialog } from "@/components/ui/PrototypeDialog";
import { getBusiness } from "@/data/businesses";
import { featuredJobs, type DemoJob } from "@/data/jobs";
import { describeCriteria } from "@/lib/job-search";
import { easePremium } from "@/lib/motion";
import { JobCard } from "./JobCard";
import { SEARCH_STATUS_ID, useJobSearch } from "./JobSearchProvider";

export function FeaturedJobs() {
  const { submitted, clearSearch } = useJobSearch();
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [viewing, setViewing] = useState<DemoJob | null>(null);

  const toggleSave = (id: string) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Section
      id="opportunities"
      labelledBy="jobs-title"
      tone="muted"
      spacing="none"
      className="pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-[8.5rem] lg:pb-24"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading
              id="jobs-title"
              eyebrow="Recommended opportunities"
              title="Opportunities worth exploring"
              intro="A selection of roles across Reliance where your skills can make an impact."
            />
            <p className="mt-4 inline-flex items-center gap-2 text-body-sm text-text-muted">
              <UserRound className="size-4 shrink-0 text-accent-strong" aria-hidden="true" />
              Recommendations tailored to your profile will appear here once you sign in.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-6">
            <p aria-live="polite" className="inline-flex items-center gap-2 text-body-sm font-semibold text-text-muted">
              <Bookmark className="size-4" aria-hidden="true" />
              {savedIds.size === 0 ? "No saved jobs" : `${savedIds.size} saved`}
            </p>
            <TextLink href="#search" className="hidden md:inline-flex">
              Explore all opportunities
            </TextLink>
          </div>
        </Reveal>

        <div id={SEARCH_STATUS_ID} tabIndex={-1} role="status" className="mt-12 focus:outline-none md:mt-14">
          <AnimatePresence initial={false}>
            {submitted ? (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easePremium }}
                className="flex flex-col gap-4 rounded-lg border border-accent-secondary/30 bg-surface p-5 md:flex-row md:items-center md:justify-between md:p-6"
              >
                <div className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-accent-secondary/10 text-accent-secondary">
                    <SearchCheck className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-label text-primary">Search ready</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Your search">
                      {describeCriteria(submitted).map((part) => (
                        <li key={part} className="rounded-sm bg-background-muted px-2.5 py-1 text-body-sm font-semibold text-text">
                          {part}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 max-w-2xl text-body-sm text-text-muted">
                      Live results will appear here once the jobs service is connected. Until then, explore the demo
                      opportunities below.
                    </p>
                  </div>
                </div>
                <Button variant="ghost" onClick={clearSearch} icon={<X className="size-4" />} className="self-start md:self-center">
                  Clear search
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <RevealGroup as="ul" interval={0.08} className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6">
          {featuredJobs.map((job) => (
            <RevealItem as="li" key={job.id}>
              <JobCard
                job={job}
                saved={savedIds.has(job.id)}
                onToggleSave={() => toggleSave(job.id)}
                onView={() => setViewing(job)}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <ButtonLink href="#search" variant="secondary" size="lg" className="mt-8 w-full md:hidden">
          Explore all opportunities
        </ButtonLink>
      </Container>

      <PrototypeDialog
        open={viewing !== null}
        onClose={() => setViewing(null)}
        eyebrow="Demo opportunity"
        title={viewing?.title ?? "Demo opportunity"}
        footer={
          <>
            <Button disabled aria-describedby="apply-disabled-note">
              Apply — not available in prototype
            </Button>
            <Button variant="secondary" onClick={() => setViewing(null)}>
              Back to opportunities
            </Button>
          </>
        }
      >
        {viewing ? (
          <>
            <p className="text-body-sm font-semibold text-text">
              {getBusiness(viewing.businessId)?.name} · {viewing.location} · {viewing.experience}
            </p>
            <p className="mt-4 text-body-lg text-primary">{viewing.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key skills">
              {viewing.skills.map((skill) => (
                <li key={skill} className="rounded-sm bg-background-muted px-2.5 py-1 text-body-sm font-medium text-text">
                  {skill}
                </li>
              ))}
            </ul>
            <p id="apply-disabled-note" className="mt-6 text-body-sm">
              This role is sample content for the homepage concept and is not a live Reliance vacancy. Full job details
              and applications will come from the applicant tracking system.
            </p>
          </>
        ) : null}
      </PrototypeDialog>
    </Section>
  );
}
