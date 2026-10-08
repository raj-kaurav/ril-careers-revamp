"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useJobSearch } from "@/components/jobs/JobSearchProvider";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { businesses, type BusinessId } from "@/data/businesses";
import { easePremium } from "@/lib/motion";
import { scrollToId } from "@/lib/utils";
import { BusinessCard } from "./BusinessCard";

const PANEL_ID = "business-detail";

export function BusinessExplorer() {
  const [selectedId, setSelectedId] = useState<BusinessId>(businesses[0].id);
  const { draft, submitSearch } = useJobSearch();
  const selected = businesses.find((business) => business.id === selectedId) ?? businesses[0];

  const select = (id: BusinessId) => {
    setSelectedId(id);
    // On phones the detail panel sits far below the cards; bring it into view.
    if (window.matchMedia("(max-width: 767px)").matches) {
      requestAnimationFrame(() => scrollToId(PANEL_ID));
    }
  };

  return (
    <Section id="businesses" labelledBy="businesses-title" tone="dark" className="overflow-hidden">
      <Container>
        <Reveal className="layout-grid items-end gap-y-6">
          <SectionHeading
            id="businesses-title"
            eyebrow="Our businesses"
            tone="dark"
            className="col-span-4 md:col-span-8 lg:col-span-7"
            title={
              <>
                One Reliance.
                <br />
                Many possibilities.
              </>
            }
          />
          <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
            <p className="text-body-lg text-text-inverse-muted">
              Build your career across businesses shaping how India lives, works and grows.
            </p>
            <p className="mt-4 text-body-sm text-white/70">Select a business to see the skills it hires for.</p>
          </div>
        </Reveal>

        <Reveal variant="sectionReveal" className="mt-14 md:mt-20">
          <ul
            aria-label="Reliance businesses"
            className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-5 lg:grid-cols-12 lg:grid-rows-[21rem_17rem_auto] lg:gap-x-6 lg:gap-y-6"
          >
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                selected={business.id === selectedId}
                onSelect={() => select(business.id)}
                panelId={PANEL_ID}
              />
            ))}
          </ul>
        </Reveal>

        <div
          id={PANEL_ID}
          aria-live="polite"
          className="mt-16 scroll-mt-24 border-t border-border-dark pt-10 md:mt-20 md:pt-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: easePremium }}
              className="layout-grid gap-y-6"
            >
              <div className="col-span-4 md:col-span-3 lg:col-span-4">
                <p className="eyebrow text-accent">{selected.category}</p>
                <h3 className="mt-4 text-statement text-white">{selected.name}</h3>
              </div>
              <div className="col-span-4 md:col-span-5 lg:col-span-5">
                <p className="text-body-lg text-text-inverse-muted">{selected.description}</p>
                <p className="mt-6 text-body-sm font-semibold text-white/70">Skills we hire for</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-body text-white">
                  {selected.skills.map((skill) => (
                    <li
                      key={skill}
                      className="after:ml-3 after:text-accent after:content-['·'] last:after:content-none"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:flex lg:items-start lg:justify-end">
                <Button
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="size-5" />}
                  onClick={() => submitSearch({ ...draft, business: selected.id })}
                  className="w-full lg:w-auto"
                >
                  Explore opportunities
                  <span className="sr-only"> at {selected.name}</span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
