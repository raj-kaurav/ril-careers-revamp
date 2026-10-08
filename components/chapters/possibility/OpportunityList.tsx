"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowButton } from "@/components/editorial/ArrowLink";
import { DemoNote } from "@/components/editorial/DemoNote";
import { RESULTS_ID, SEARCH_STATUS_ID, useJobSearch } from "@/components/jobs/JobSearchProvider";
import { goToFinder } from "@/components/navigation/SiteHeader";
import { PrototypeDialog } from "@/components/ui/PrototypeDialog";
import { demoJobs, type DemoJob } from "@/data/jobs";
import { getWorld } from "@/data/worlds";
import { describeCriteria, filterDemoJobs } from "@/lib/job-search";
import { easeEditorial } from "@/lib/motion";

const pad = (value: number) => String(value).padStart(2, "0");

/** Opportunities as an editorial index — type, rules and whitespace, no cards. */
export function OpportunityList() {
  const { submitted, clearSearch } = useJobSearch();
  const [viewing, setViewing] = useState<DemoJob | null>(null);
  const results = useMemo(() => filterDemoJobs(demoJobs, submitted), [submitted]);
  const criteria = submitted ? describeCriteria(submitted) : [];

  return (
    <div id={RESULTS_ID} className="scroll-mt-24">
      <div className="flex flex-col gap-3 border-b-2 border-ink pb-4 md:flex-row md:items-end md:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-end">
        <div>
          <h3 className="display text-title">Opportunities</h3>
          <div id={SEARCH_STATUS_ID} tabIndex={-1} role="status" className="mt-2 text-small text-muted-strong focus:outline-none">
            {criteria.length > 0 ? (
              <>
                {pad(results.length)} of {pad(demoJobs.length)} demo roles for{" "}
                <span className="text-ink">{criteria.join(" · ")}</span>
              </>
            ) : (
              <>A selection of {pad(demoJobs.length)} demo roles across worlds</>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {criteria.length > 0 ? (
            <button
              type="button"
              onClick={clearSearch}
              className="min-h-11 text-small font-medium text-ink underline decoration-terracotta underline-offset-4 hover:text-terracotta-deep"
            >
              Clear and show all
            </button>
          ) : null}
          <DemoNote className="text-muted-strong">Demo listings · not live vacancies</DemoNote>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="border-b border-line py-14">
          <p className="display text-title text-ink">Nothing in the demo list matches — yet.</p>
          <p className="mt-3 max-w-xl text-body text-muted-strong">
            In the live product this is where every matching role would appear. Try a broader word, or another world.
          </p>
        </div>
      ) : (
        <ol>
          <AnimatePresence initial={false}>
            {results.map((job, index) => {
              const world = getWorld(job.worldId);
              return (
                <motion.li
                  key={job.id}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeEditorial }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => setViewing(job)}
                    className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1.5 py-5 text-left md:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_5.5rem_1.5rem] md:gap-x-5 lg:grid-cols-[2.5rem_1fr_auto] lg:py-4 xl:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_5.5rem_1.5rem] xl:py-5"
                  >
                    <span className="caption text-muted-strong">N°{pad(index + 1)}</span>
                    <span className="display text-[1.5rem] leading-[1.1] text-ink transition-[color,transform] duration-500 ease-(--ease-editorial) group-hover:translate-x-2 group-hover:text-terracotta-deep md:text-[1.625rem]">
                      {job.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="row-span-2 self-center text-[1.5rem] text-ink/40 transition-[color,transform] duration-500 group-hover:translate-x-1 group-hover:text-terracotta md:order-last md:row-span-1 lg:order-none lg:row-span-2 xl:order-last xl:row-span-1"
                    >
                      →
                    </span>
                    <span className="col-start-2 text-small text-ink md:col-start-auto lg:col-start-2 xl:col-start-auto">
                      <span className="font-medium">{job.business}</span>{" "}
                      <span className="text-muted-strong">· {job.location}</span>
                    </span>
                    <span className="hidden text-small text-muted-strong md:block lg:hidden xl:block">{job.experience}</span>
                    <span className="sr-only">
                      {world ? `, ${world.name} world` : ""}. Demo role — opens details.
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      )}

      <div className="mt-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-small text-muted-strong">
          In the live site, every role, filter and application comes from the careers portal.
        </p>
        <ArrowButton onClick={goToFinder}>Refine your search</ArrowButton>
      </div>

      <PrototypeDialog
        open={viewing !== null}
        onClose={() => setViewing(null)}
        eyebrow="Demo opportunity · not a live vacancy"
        title={viewing?.title ?? "Demo opportunity"}
        footer={
          <>
            <ArrowButton disabled aria-describedby="apply-disabled-note" className="opacity-50">
              Apply — not in prototype
            </ArrowButton>
            <button
              type="button"
              onClick={() => setViewing(null)}
              className="min-h-11 text-small font-medium text-ink underline decoration-ink/30 underline-offset-4"
            >
              Back to the list
            </button>
          </>
        }
      >
        {viewing ? (
          <>
            <p className="caption text-ink">
              {viewing.business} · {viewing.location} · {viewing.experience}
            </p>
            <p className="display mt-5 text-[1.5rem] leading-[1.2] text-ink">{viewing.summary}</p>
            <p className="mt-5 text-small text-ink">{viewing.skills.join("  /  ")}</p>
            <p id="apply-disabled-note" className="mt-8 border-t border-line pt-5 text-small text-muted">
              Sample content for the homepage concept — not a live Reliance vacancy. Full details and applications will
              come from the applicant tracking system.
            </p>
          </>
        ) : null}
      </PrototypeDialog>
    </div>
  );
}
