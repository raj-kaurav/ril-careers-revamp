"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowButton } from "@/components/editorial/ArrowLink";
import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { Photo } from "@/components/editorial/Photo";
import { useJobSearch } from "@/components/jobs/JobSearchProvider";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { worlds, type World, type WorldAccent, type WorldId } from "@/data/worlds";
import { emptyCriteria } from "@/lib/job-search";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/utils";

const accentText: Record<WorldAccent, string> = {
  sky: "text-sky",
  saffron: "text-saffron",
  terracotta: "text-terracotta",
  leaf: "text-[#8fb592]",
  ivory: "text-ivory",
};

const accentBg: Record<WorldAccent, string> = {
  sky: "bg-sky",
  saffron: "bg-saffron",
  terracotta: "bg-terracotta",
  leaf: "bg-leaf",
  ivory: "bg-ivory",
};

const panelId = (id: WorldId) => `world-panel-${id}`;
const triggerId = (id: WorldId) => `world-trigger-${id}`;

export function CareerWorlds() {
  // Hover/focus only previews the photograph; selecting a row opens it.
  const [activeId, setActiveId] = useState<WorldId | null>(worlds[0].id);
  const [previewId, setPreviewId] = useState<WorldId | null>(null);
  const shownId = previewId ?? activeId;
  const active = worlds.find((world) => world.id === shownId) ?? worlds[0];
  const { submitSearch } = useJobSearch();

  const toggle = (id: WorldId) => setActiveId((current) => (current === id ? null : id));

  return (
    <section
      id="worlds"
      aria-labelledby="worlds-title"
      data-tone="dark"
      className="relative bg-ink pt-20 pb-20 text-ivory md:pt-24 md:pb-24 lg:pt-56"
    >
      <div className="page-x mx-auto max-w-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <ChapterMarker id="worlds" tone="dark" />
            <h2 id="worlds-title" className="display mt-6 text-giant">
              <RiseLine>
                Where could you <em className="text-saffron">go?</em>
              </RiseLine>
            </h2>
          </div>
          <Reveal className="max-w-md lg:col-span-5 lg:pb-2">
            <p className="text-body text-ivory/75 md:text-[1.0625rem]">
              Six worlds inside one group. Each is a career on its own — and a door into the next.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-12 md:mt-12 lg:grid-cols-12 lg:gap-x-10">
          <ol className="border-b border-line-inverse lg:col-span-7" onPointerLeave={() => setPreviewId(null)}>
            {worlds.map((world) => (
              <WorldRow
                key={world.id}
                world={world}
                active={world.id === activeId}
                highlighted={world.id === shownId}
                onPreview={(on) => setPreviewId(on ? world.id : null)}
                onToggle={() => toggle(world.id)}
                onExplore={() => submitSearch({ ...emptyCriteria, world: world.id })}
              />
            ))}
          </ol>

          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="relative h-full min-h-[26rem] overflow-hidden bg-ink-soft">
                {worlds.map((world) => (
                  <div
                    key={world.id}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-(--ease-editorial)",
                      world.id === active.id ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                  >
                    <Image
                      src={world.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 600px, 40vw"
                      className="object-cover"
                      style={{ objectPosition: world.image.focus }}
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className={cn("absolute top-0 left-0 h-full w-1.5 transition-colors duration-700", accentBg[active.accent])} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    className="absolute inset-x-8 bottom-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: easeEditorial }}
                  >
                    <p className="caption text-ivory/75">{active.businesses}</p>
                    <p className="display mt-3 text-[2rem] leading-[1.05] text-ivory xl:text-[2.25rem]">{active.line}</p>
                    <p className="mt-3 text-small text-ivory/65">{active.places}</p>
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldRow({
  world,
  active,
  highlighted,
  onPreview,
  onToggle,
  onExplore,
}: {
  world: World;
  active: boolean;
  highlighted: boolean;
  onPreview: (on: boolean) => void;
  onToggle: () => void;
  onExplore: () => void;
}) {
  return (
    <li
      className="border-t border-line-inverse"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onPreview(true);
      }}
    >
      <h3>
        <button
          id={triggerId(world.id)}
          type="button"
          aria-expanded={active}
          aria-controls={panelId(world.id)}
          onClick={onToggle}
          onFocus={() => onPreview(true)}
          onBlur={() => onPreview(false)}
          className="group flex w-full items-baseline gap-4 py-4 text-left md:gap-8 lg:py-2.5 xl:py-3"
        >
          <span className={cn("caption w-7 shrink-0 transition-colors", highlighted ? accentText[world.accent] : "text-ivory/45")}>
            {world.number}
          </span>
          <span
            className={cn(
              "display text-[clamp(2rem,1.2rem+1.9vw,3rem)] leading-[1.05] transition-[color,transform] duration-700 ease-(--ease-editorial)",
              highlighted ? cn("translate-x-2 italic md:translate-x-4", accentText[world.accent]) : "text-ivory",
            )}
          >
            {world.name}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "ml-auto shrink-0 self-center text-[1.5rem] leading-none transition-transform duration-500",
              active ? cn("rotate-45", accentText[world.accent]) : "text-ivory/40",
            )}
          >
            +
          </span>
        </button>
      </h3>

      <div
        id={panelId(world.id)}
        role="region"
        aria-labelledby={triggerId(world.id)}
        hidden={!active}
        className="pb-8 md:pl-[3.75rem] lg:pb-6"
      >
        {active ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEditorial }}
          >
            <Photo
              image={world.image}
              sizes="100vw"
              className="bleed-x mb-7 aspect-[16/10] md:mx-0 md:aspect-[2/1] lg:hidden"
            />
            <p className="display text-[1.625rem] leading-[1.1] text-ivory md:text-[2rem] lg:hidden">{world.line}</p>
            <p className="mt-4 max-w-xl text-body text-ivory/75 lg:mt-0">{world.description}</p>
            <p className="caption mt-6 text-ivory/50 lg:hidden">{world.businesses}</p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-small text-ivory/85" aria-label={`Disciplines in ${world.name}`}>
              {world.disciplines.map((discipline) => (
                <li key={discipline} className="after:ml-3 after:text-ivory/30 after:content-['/'] last:after:content-none">
                  {discipline}
                </li>
              ))}
            </ul>
            <ArrowButton tone="dark" className="mt-4" onClick={onExplore}>
              See demo roles in {world.name}
            </ArrowButton>
          </motion.div>
        ) : null}
      </div>
    </li>
  );
}
