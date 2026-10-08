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
        <Reveal>
          <SectionHeading
            id="pathways-title"
            eyebrow="Career pathways"
            title="Where do you want to go next?"
            intro="Starting out, growing your expertise or shaping strategy — there's a place for your ambition here."
          />
        </Reveal>

        <div
          role="tablist"
          aria-label="Career stage"
          onKeyDown={onKeyDown}
          className="scrollbar-none -mx-5 mt-12 flex overflow-x-auto border-b border-border px-5 sm:-mx-6 sm:px-6 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
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
                  "group relative flex min-h-11 shrink-0 flex-col items-start pt-2 pr-8 pb-5 text-left transition-colors duration-200 md:pr-6 md:pb-6",
                  selected ? "text-primary" : "text-text-muted hover:text-primary",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("text-body-sm font-semibold tabular-nums", selected && "text-accent-strong")}
                >
                  0{index + 1}
                </span>
                <span className="mt-2 text-[1.125rem] leading-tight font-bold tracking-[-0.02em] whitespace-nowrap md:text-[1.375rem] md:whitespace-normal lg:text-[1.5rem]">
                  {pathway.label}
                </span>
                <span className="mt-2 hidden text-body-sm text-text-muted md:block">{pathway.descriptor}</span>
                {selected ? (
                  <motion.span
                    layoutId="pathway-indicator"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-[3px] bg-accent md:right-6"
                    transition={{ duration: 0.4, ease: easePremium }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

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
              className="mt-10 rounded-lg focus-visible:outline-offset-8 md:mt-14"
            >
              {selected ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: easePremium }}
                  className="layout-grid items-center gap-y-10"
                >
                  <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-lg md:col-span-8 md:aspect-[16/9] lg:col-span-7 lg:aspect-[5/4]">
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
                        sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: pathway.image.focus }}
                      />
                    </motion.div>
                  </div>

                  <div className="col-span-4 md:col-span-7 lg:col-span-5 lg:pl-6 xl:pl-10">
                    <p className="eyebrow text-accent-strong">{pathway.label}</p>
                    <h3 className="mt-5 text-[2.5rem] leading-[1.02] font-bold tracking-[-0.04em] text-primary md:text-[3.25rem] xl:text-[3.75rem]">
                      {pathway.title}
                    </h3>
                    <p className="mt-6 text-body-lg text-text-muted">{pathway.description}</p>
                    <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-6 text-body font-semibold text-primary">
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
                      className="mt-10 w-full sm:w-auto"
                    >
                      {pathway.cta.label}
                    </ButtonLink>
                  </div>
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
