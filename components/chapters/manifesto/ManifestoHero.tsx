"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { ArrowLink } from "@/components/editorial/ArrowLink";
import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { futures, manifestoCopy } from "@/data/manifesto";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ROTATE_MS = 4800;

export function ManifestoHero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const current = futures[index];

  // Reduced motion: hold on the first future unless the visitor presses play.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with the OS preference
    if (reduce) setPlaying(false);
  }, [reduce]);

  useEffect(() => {
    if (!playing || !inView) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex((value) => (value + 1) % futures.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [playing, inView]);

  return (
    <section ref={sectionRef} id="top" aria-labelledby="manifesto-title" className="relative bg-ivory pt-24 md:pt-28">
      <div className="page-x mx-auto max-w-page">
        <Reveal immediate variant="fade">
          <ChapterMarker id="top" />
        </Reveal>

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h1 id="manifesto-title" className="display text-mega text-ink lg:col-span-8">
            <span className="sr-only">{manifestoCopy.staticHeadline}</span>
            <span aria-hidden="true" className="block">
              <RiseLine immediate delay={0.05}>
                There is <em className="text-terracotta">more</em>
              </RiseLine>
              <RiseLine immediate delay={0.13}>
                than one way
              </RiseLine>
              <RiseLine immediate delay={0.21}>
                to{" "}
                <span className="relative inline-flex overflow-hidden pr-[0.06em] pb-[0.1em] -mb-[0.1em] align-bottom">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.em
                      key={current.verb}
                      className="block text-terracotta"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.55, ease: easeEditorial }}
                    >
                      {current.verb}
                    </motion.em>
                  </AnimatePresence>
                </span>
              </RiseLine>
              <RiseLine immediate delay={0.29}>
                the future.
              </RiseLine>
            </span>
          </h1>

          <Reveal immediate delay={0.55} className="max-w-md lg:col-span-4 lg:pb-2">
            <p className="text-body text-ink/80 md:text-[1.0625rem]">{manifestoCopy.intro}</p>
            <div className="mt-5 flex flex-col items-start gap-1 sm:flex-row sm:gap-8 lg:flex-col lg:gap-0 xl:flex-row xl:gap-8">
              <ArrowLink href="#worlds">Explore possibilities</ArrowLink>
              <ArrowLink href="#find" className="text-ink/70">
                Find opportunities
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cinematic frame: bleeds right, and drops into the dark chapter below. */}
      <div className="page-x mx-auto mt-10 max-w-page pb-12 md:mt-12 md:pb-16 lg:pb-0">
        <figure className="relative z-10 grid gap-6 lg:-mb-32 lg:grid-cols-12 lg:gap-x-8">
          <div className="relative bleed-x lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:ml-0 lg:bleed-right">
            <Reveal
              immediate
              variant="fade"
              delay={0.2}
              className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[2/1] lg:aspect-[21/9]"
            >
              {futures.map((future, i) => (
                <div
                  key={future.id}
                  aria-hidden={i !== index}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-(--ease-editorial)",
                    i === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                >
                  <Image
                    src={future.image.src}
                    alt={future.image.alt}
                    fill
                    preload={i === 0}
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: future.image.focus }}
                  />
                </div>
              ))}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <p
                aria-hidden="true"
                className="display absolute bottom-4 left-5 text-[2.75rem] leading-none text-ivory/90 md:bottom-6 md:left-8 md:text-[4rem]"
              >
                0{index + 1}
              </p>
            </Reveal>
          </div>

          <figcaption className="flex flex-col gap-4 lg:col-span-3 lg:row-start-1 lg:gap-5 lg:pt-2">
            <div className="flex items-center gap-4">
              <ol aria-label="Futures" className="flex gap-1.5">
                {futures.map((future, i) => (
                  <li key={future.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setIndex(i);
                        setPlaying(false);
                      }}
                      aria-label={`Show future ${i + 1}: to ${future.verb} — ${future.world}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group flex h-11 w-8 items-center"
                    >
                      <span
                        className={cn(
                          "h-[3px] w-full transition-colors duration-500",
                          i === index ? "bg-terracotta" : "bg-ink/20 group-hover:bg-ink/45",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pause the rotating futures" : "Play the rotating futures"}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
              >
                {playing ? (
                  <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <Play className="size-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </button>
            </div>
            <div aria-live="off">
              <p className="caption text-terracotta-deep">
                Future 0{index + 1} — {current.world}
              </p>
              <p className="mt-3 max-w-xs text-small text-muted">{current.caption}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
