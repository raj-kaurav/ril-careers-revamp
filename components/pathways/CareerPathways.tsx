"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { defaultPathwayId, isPathwayId, pathways, type PathwayId } from "@/data/pathways";
import { easePremium } from "@/lib/motion";
import { cn, scrollToId } from "@/lib/utils";

const tabId = (id: PathwayId) => `pathway-tab-${id}`;
const panelId = (id: PathwayId) => `pathway-panel-${id}`;

export function CareerPathways() {
  const [activeId, setActiveId] = useState<PathwayId>(defaultPathwayId);
  const tabRefs = useRef<Partial<Record<PathwayId, HTMLButtonElement | null>>>({});

  // Deep links such as #students or #leaders open the matching pathway.
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!isPathwayId(hash)) return;
      setActiveId(hash);
      scrollToId("pathways");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const focusTab = (index: number) => {
    const next = pathways[(index + pathways.length) % pathways.length];
    setActiveId(next.id);
    const node = tabRefs.current[next.id];
    node?.focus();
    node?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = pathways.findIndex((pathway) => pathway.id === activeId);
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowDown: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      ArrowUp: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(pathways.length - 1),
    };
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <Section id="pathways" labelledBy="pathways-title" tone="light">
      <Container>
        <div className="layout-grid gap-y-10 lg:items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                id="pathways-title"
                eyebrow="Career pathways"
                title="Where are you in your career journey?"
              />
            </Reveal>

            <div
              role="tablist"
              aria-label="Career stage"
              onKeyDown={onKeyDown}
              aria-orientation="vertical"
              className="mt-8 flex flex-col border-l border-border lg:mt-9"
            >
              {pathways.map((pathway, index) => {
                const selected = pathway.id === activeId;
                return (
                  <button
                    key={pathway.id}
                    ref={(node) => {
                      tabRefs.current[pathway.id] = node;
                    }}
                    id={tabId(pathway.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId(pathway.id)}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(pathway.id)}
                    className={cn(
                      "group relative flex min-h-11 flex-col items-start rounded-r-lg py-3.5 pr-4 pl-5 text-left transition-colors duration-200 md:py-4 lg:py-5 lg:pl-7",
                      selected ? "text-primary" : "text-text-muted hover:bg-background-muted hover:text-primary",
                    )}
                  >
                    {!selected ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-3 -left-px w-[3px] origin-center scale-y-0 bg-primary/25 transition-transform duration-300 ease-premium group-hover:scale-y-100"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-body-sm font-semibold tabular-nums transition-colors",
                        selected ? "text-accent-strong" : "group-hover:text-primary",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span className="mt-1 text-[1.125rem] leading-tight font-bold tracking-[-0.02em] lg:mt-1.5 lg:text-h3">
                      {pathway.label}
                    </span>
                    <span className="mt-1 hidden text-body text-text-muted sm:block lg:mt-1.5">{pathway.descriptor}</span>
                    {selected ? (
                      <motion.span
                        layoutId="pathway-indicator"
                        aria-hidden="true"
                        className="absolute inset-y-0 -left-px w-[3px] bg-accent"
                        transition={{ duration: 0.4, ease: easePremium }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            {pathways.map((pathway) => {
              const selected = pathway.id === activeId;
              return (
                <div
                  key={pathway.id}
                  id={panelId(pathway.id)}
                  role="tabpanel"
                  aria-labelledby={tabId(pathway.id)}
                  hidden={!selected}
                  tabIndex={0}
                  className="rounded-xl focus-visible:outline-offset-8"
                >
                  {selected ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: easePremium }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary-dark sm:aspect-[16/9]">
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.9, ease: easePremium }}
                        >
                          <Image
                            src={pathway.image.src}
                            alt={pathway.image.alt}
                            fill
                            sizes="(min-width: 1280px) 800px, (min-width: 1024px) 64vw, 100vw"
                            className="object-cover"
                            style={{ objectPosition: pathway.image.focus }}
                          />
                        </motion.div>
                      </div>

                      <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
                        <h3 className="text-[2.25rem] leading-[1.04] font-bold tracking-[-0.04em] text-primary md:text-[2.75rem] xl:text-[3.25rem]">
                          {pathway.title}
                        </h3>
                        <div>
                          <p className="text-body-lg text-text-muted">{pathway.description}</p>
                          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-body font-semibold text-primary">
                            {pathway.features.map((feature) => (
                              <li
                                key={feature}
                                className="after:ml-3 after:font-normal after:text-accent-strong after:content-['·'] last:after:content-none"
                              >
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <ButtonLink
                            href={pathway.cta.href}
                            size="lg"
                            icon={<ArrowRight className="size-5" />}
                            className="mt-8 w-full sm:w-auto"
                          >
                            {pathway.cta.label}
                          </ButtonLink>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
