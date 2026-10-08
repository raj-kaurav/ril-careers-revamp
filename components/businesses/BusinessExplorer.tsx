"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { businesses, type BusinessId } from "@/data/businesses";
import { jobsHref } from "@/lib/job-search";
import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PANEL_ID = "business-canvas";
const tabId = (id: BusinessId) => `business-tab-${id}`;

/**
 * One interactive explorer: a selector of businesses driving a single shared
 * canvas. Each business's CTA hands off to the jobs experience filtered by
 * that business.
 */
export function BusinessExplorer() {
  const [selectedId, setSelectedId] = useState<BusinessId>(businesses[0].id);
  const tabRefs = useRef<Partial<Record<BusinessId, HTMLButtonElement | null>>>({});
  const selected = businesses.find((business) => business.id === selectedId) ?? businesses[0];

  const focusTab = (index: number) => {
    const next = businesses[(index + businesses.length) % businesses.length];
    setSelectedId(next.id);
    const node = tabRefs.current[next.id];
    node?.focus();
    node?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = businesses.findIndex((business) => business.id === selectedId);
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowDown: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      ArrowUp: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(businesses.length - 1),
    };
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
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
          <p className="col-span-4 text-body-lg text-text-inverse-muted md:col-span-6 lg:col-span-4 lg:col-start-9">
            Explore the businesses, technologies and teams shaping what comes next.
          </p>
        </Reveal>

        <Reveal variant="sectionReveal" className="mt-12 md:mt-16">
          <div
            role="tablist"
            aria-label="Reliance businesses"
            onKeyDown={onKeyDown}
            className="scrollbar-none -mx-5 flex snap-x scroll-px-5 overflow-x-auto border-b border-border-dark px-5 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0"
          >
            {businesses.map((business, index) => {
              const isSelected = business.id === selectedId;
              return (
                <button
                  key={business.id}
                  ref={(node) => {
                    tabRefs.current[business.id] = node;
                  }}
                  id={tabId(business.id)}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={PANEL_ID}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedId(business.id)}
                  className={cn(
                    "group relative flex min-h-11 shrink-0 snap-start flex-col items-start gap-1.5 pt-1 pr-7 pb-5 text-left transition-colors duration-200 lg:pr-4",
                    isSelected ? "text-white" : "text-white/60 hover:text-white",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-body-sm font-semibold tabular-nums transition-colors",
                      isSelected ? "text-accent" : "text-white/45",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] leading-tight font-bold tracking-[-0.015em] whitespace-nowrap lg:text-[1.125rem] lg:whitespace-normal">
                    {business.name}
                  </span>
                  {isSelected ? (
                    <motion.span
                      layoutId="business-indicator"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-[3px] bg-accent lg:right-4"
                      transition={{ duration: 0.4, ease: easePremium }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={tabId(selected.id)}
            tabIndex={0}
            className="mt-8 rounded-xl focus-visible:outline-offset-8 md:mt-12"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary sm:aspect-[16/10] lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={selected.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easePremium }}
                  >
                    <Image
                      src={selected.image.src}
                      alt={selected.image.alt}
                      fill
                      sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: selected.image.focus }}
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-dark/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-primary-dark/40"
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  className="flex flex-col lg:order-1 lg:col-span-5 lg:justify-center lg:py-6 lg:pr-12 xl:pr-16"
                >
                  <p className="eyebrow text-accent">{selected.category}</p>
                  <h3 className="mt-4 text-[2.5rem] leading-none font-bold tracking-[-0.04em] text-white md:text-[3.5rem]">
                    {selected.name}
                  </h3>
                  <p className="mt-6 max-w-md text-body-lg text-text-inverse-muted md:text-[1.25rem] md:leading-[1.5]">
                    {selected.shortDescription}
                  </p>

                  <div className="mt-8 border-t border-border-dark pt-6">
                    <p className="text-body-sm font-semibold text-white/70">Capabilities</p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${selected.name} capabilities`}>
                      {selected.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="rounded-full border border-white/20 px-3.5 py-1.5 text-body-sm font-semibold text-white"
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ButtonLink
                    href={jobsHref({ business: selected.id })}
                    variant="accent"
                    size="lg"
                    icon={<ArrowRight className="size-5" />}
                    className="mt-10 w-full sm:w-auto sm:self-start"
                  >
                    {selected.cta.label}
                  </ButtonLink>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
