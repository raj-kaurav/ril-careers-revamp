"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { Photo } from "@/components/editorial/Photo";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { IconButton } from "@/components/ui/IconButton";
import { impactMoments, type ImpactMoment } from "@/data/impact";
import { cn, prefersReducedMotion } from "@/lib/utils";

/* Phones/tablets size frames by width; desktop sizes them by viewport height. */
const frame: Record<ImpactMoment["shape"], { width: string; aspect: string }> = {
  tall: { width: "w-[72vw] sm:w-[20rem]", aspect: "aspect-[3/4]" },
  wide: { width: "w-[86vw] sm:w-[30rem]", aspect: "aspect-[4/3]" },
  square: { width: "w-[78vw] sm:w-[24rem]", aspect: "aspect-square" },
};

export function ImpactStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: stripRef });

  const step = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.7, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      id="life"
      aria-labelledby="life-title"
      data-tone="dark"
      className="chapter-y relative overflow-hidden bg-ink text-ivory"
    >
      <div className="page-x mx-auto grid max-w-page gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
        <div className="lg:col-span-7">
          <ChapterMarker id="life" tone="dark" />
          <h2 id="life-title" className="display mt-6 text-giant">
            <RiseLine>The scale is big.</RiseLine>
            <RiseLine delay={0.1} className="lg:pl-[12%]">
              The work is <em className="text-saffron">personal.</em>
            </RiseLine>
          </h2>
        </div>
        <Reveal className="flex flex-col gap-6 lg:col-span-5 lg:pb-2">
          <p className="max-w-md text-body text-ivory/80 md:text-[1.0625rem]">
            A group this size could feel distant. Day to day it is a team, a mentor, a plant floor, a product review —
            work that is unmistakably yours.
          </p>
          <div className="flex gap-2">
            <IconButton tone="dark" label="Scroll moments back" onClick={() => step(-1)} className="border border-line-inverse">
              <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </IconButton>
            <IconButton tone="dark" label="Scroll moments forward" onClick={() => step(1)} className="border border-line-inverse">
              <ArrowRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </IconButton>
          </div>
        </Reveal>
      </div>

      <div
        ref={stripRef}
        role="region"
        aria-label="Life at Reliance — moments, scroll horizontally"
        tabIndex={0}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory scroll-px-[var(--page-pad)] overflow-x-auto overscroll-x-contain focus-visible:outline-offset-[-4px]"
      >
        <ul className="flex items-start gap-6 px-[max(var(--page-pad),calc((100vw-96rem)/2+var(--page-pad)))] md:gap-8">
          {impactMoments.map((moment, index) => (
            <li key={moment.id} className={cn("shrink-0 snap-start lg:w-auto", frame[moment.shape].width)}>
              <figure>
                <Photo
                  image={moment.image}
                  sizes="(min-width: 1024px) 36rem, 86vw"
                  className={cn("lg:h-[clamp(18rem,44svh,26rem)]", frame[moment.shape].aspect)}
                />
                <figcaption className="mt-5 lg:w-0 lg:min-w-full">
                  <p className="caption text-saffron">
                    0{index + 1} — {moment.theme}
                  </p>
                  <p className="display mt-2 max-w-[24rem] text-[1.375rem] leading-[1.15] md:text-[1.5rem]">
                    {moment.statement}
                  </p>
                  <p className="mt-2 max-w-[24rem] text-small text-ivory/65">{moment.detail}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="page-x mx-auto mt-10 max-w-page">
        <div aria-hidden="true" className="h-px w-full bg-line-inverse">
          <motion.div className="h-px origin-left bg-saffron" style={{ scaleX: scrollXProgress }} />
        </div>
        <p className="caption mt-4 text-ivory/45">Indicative themes — programme details to be confirmed</p>
      </div>
    </section>
  );
}
