"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { DemoNote } from "@/components/editorial/DemoNote";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { journey, journeyPerson, type JourneyStop } from "@/data/journey";
import { cn } from "@/lib/utils";

/*
 * Tablet/desktop path: five stops stepping down a gutter while swinging left
 * and right; the stop text sits beyond the gutter so the line never crosses
 * it. Coordinates are percentages of the path box.
 */
const STOP_X = [3, 22, 8, 26, 13];
const TEXT_X = 33;
const stopY = (index: number) => index * 20 + 3;
const PATH = STOP_X.reduce((d, x, i) => {
  if (i === 0) return `M${x},${stopY(0)}`;
  const prevX = STOP_X[i - 1];
  const mid = (stopY(i - 1) + stopY(i)) / 2;
  return `${d} C${prevX},${mid} ${x},${mid} ${x},${stopY(i)}`;
}, "");
const lastX = STOP_X[STOP_X.length - 1];
const TAIL = `M${lastX},${stopY(STOP_X.length - 1)} C${lastX},94 ${lastX + 8},94 ${lastX + 10},100`;
const CONNECTORS = STOP_X.map((x, i) => `M${x},${stopY(i)} L${TEXT_X - 2},${stopY(i)}`).join(" ");

export function CareerMoves() {
  const pathRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start 80%", "end 70%"] });
  // Reduced motion: the line is simply complete; read in the transform so the
  // server and first client render produce identical markup.
  const drawn = useTransform(scrollYProgress, (value) => (reduce ? 1 : Math.max(0.02, value)));

  return (
    <section id="moves" aria-labelledby="moves-title" data-tone="dark" className="chapter-y relative bg-forest text-ivory">
      <div className="page-x mx-auto grid max-w-page gap-12 md:gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="lg:col-span-5">
          <ChapterMarker id="moves" tone="dark" />
          <h2 id="moves-title" className="display mt-6 text-giant">
            <RiseLine>Your career</RiseLine>
            <RiseLine delay={0.06}>doesn&rsquo;t have to</RiseLine>
            <RiseLine delay={0.12}>move in a</RiseLine>
            <RiseLine delay={0.18}>
              <em className="text-saffron">straight line.</em>
            </RiseLine>
          </h2>
          <Reveal className="mt-8 max-w-md">
            <p className="text-body text-ivory/80 md:text-[1.0625rem]">
              Across one group, a career can change direction without changing employer. Scale to learn from, the freedom
              to move between worlds, and work whose impact you can see.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line-inverse pb-4">
            <p className="display text-[1.5rem] leading-none">
              {journeyPerson.name}&rsquo;s path
            </p>
            <DemoNote tone="dark">{journeyPerson.label}</DemoNote>
          </div>

          {/* Tablet and desktop: one line swinging down the column. */}
          <ol ref={pathRef} className="relative mt-8 hidden h-[34rem] md:block">
            <li aria-hidden="true" className="absolute inset-0">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
                <path d={CONNECTORS} fill="none" stroke="rgb(247 245 239 / 0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <path d={PATH} fill="none" stroke="rgb(247 245 239 / 0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <motion.path
                  d={PATH}
                  fill="none"
                  stroke="var(--color-saffron)"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: drawn }}
                />
                <path
                  d={TAIL}
                  fill="none"
                  stroke="var(--color-saffron)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {journey.map((stop, index) => (
                <Dot key={stop.id} index={index} progress={drawn} />
              ))}
            </li>
            {journey.map((stop, index) => (
              <li
                key={stop.id}
                className="absolute right-0"
                style={{ left: `${TEXT_X}%`, top: `calc(${stopY(index)}% - 1rem)` }}
              >
                <CompactStopText stop={stop} />
              </li>
            ))}
          </ol>

          {/* Phones: the line wanders down a narrow gutter. */}
          <ol className="mt-10 md:hidden">
            {journey.map((stop, index) => (
              <MobileStop key={stop.id} stop={stop} index={index} last={index === journey.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CompactStopText({ stop }: { stop: JourneyStop }) {
  return (
    <>
      <h3 className="flex items-baseline gap-3">
        <span className="caption text-saffron">{stop.year}</span>
        <span className="display text-[1.75rem] leading-none">{stop.world}</span>
      </h3>
      <p className="mt-2 text-small text-ivory/85">
        {stop.role} <span className="text-ivory/50">· {stop.place}</span>
      </p>
      <p className="mt-1 text-small text-ivory/65">
        <span className="font-semibold text-saffron">{stop.theme}</span> — {stop.note}
      </p>
    </>
  );
}

function StopText({ stop }: { stop: JourneyStop }) {
  return (
    <>
      <p className="caption text-saffron">{stop.year}</p>
      <h3 className="display mt-3 text-[1.75rem] leading-none">{stop.world}</h3>
      <p className="mt-2 text-small text-ivory/85">{stop.role}</p>
      <p className="caption mt-1 text-ivory/50">{stop.place}</p>
      <p className="mt-4 text-small text-ivory/70">
        <em className="display text-[1.125rem] text-saffron not-italic">{stop.theme} — </em>
        {stop.note}
      </p>
    </>
  );
}

function Dot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const at = (index / (journey.length - 1)) * 0.96;
  const opacity = useTransform(progress, [Math.max(0, at - 0.08), Math.max(0.001, at)], [0.25, 1]);
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${STOP_X[index]}%`, top: `${stopY(index)}%` }}
    >
      <motion.span className="block size-4 rounded-full bg-saffron ring-[6px] ring-forest" style={{ opacity }} />
    </span>
  );
}

function MobileStop({ stop, index, last }: { stop: JourneyStop; index: number; last: boolean }) {
  const reduce = useReducedMotion();
  const fromLeft = index % 2 === 0;
  const segment = fromLeft ? "M12,0 C12,50 36,50 36,100" : "M36,0 C36,50 12,50 12,100";
  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-x-4">
      <div aria-hidden="true" className="relative">
        {!last ? (
          <svg viewBox="0 0 48 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <motion.path
              d={segment}
              fill="none"
              stroke="var(--color-saffron)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: reduce ? 0 : 1.2, ease: "easeInOut" }}
            />
          </svg>
        ) : null}
        <span
          className="absolute top-0 size-3.5 -translate-x-1/2 rounded-full bg-saffron ring-[5px] ring-forest"
          style={{ left: fromLeft ? "25%" : "75%" }}
        />
      </div>
      <div className={cn("-mt-1.5", last ? "pb-0" : "pb-12")}>
        <StopText stop={stop} />
      </div>
    </li>
  );
}
