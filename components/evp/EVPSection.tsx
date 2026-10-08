import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { evpPillars } from "@/data/site";

/** Horizontal position (0–100) of the career-path node in each lane. */
const laneStops = [14, 78, 36, 90];

/**
 * One segment of the gold career line. Each row draws from the midpoint shared
 * with the previous lane, through its own node, to the midpoint shared with the
 * next lane, so the segments join into one continuous path across rows.
 */
function lanePath(index: number) {
  const x = laneStops[index];
  const prev = laneStops[index - 1];
  const next = laneStops[index + 1];
  const enter = prev === undefined ? `M ${x} 50` : `M ${(prev + x) / 2} 0 C ${(prev + x) / 2} 25, ${x} 25, ${x} 50`;
  const exit = next === undefined ? "" : ` C ${x} 75, ${(x + next) / 2} 75, ${(x + next) / 2} 100`;
  return enter + exit;
}

function Lane({ index }: { index: number }) {
  const isLast = index === laneStops.length - 1;
  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-10 md:w-14 lg:left-[36%] lg:w-[26%]">
      <span className="absolute inset-x-0 top-1/2 hidden border-t border-dashed border-primary/20 lg:block" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
        <path
          d={lanePath(index)}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background-muted ${
          isLast ? "size-4 bg-primary" : "size-3 bg-accent"
        }`}
        style={{ left: `${laneStops[index]}%` }}
      />
    </div>
  );
}

export function EVPSection() {
  return (
    <Section id="why-reliance" labelledBy="evp-title" tone="muted">
      <Container>
        <div className="layout-grid items-end gap-y-8">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeading id="evp-title" eyebrow="Why Reliance" title="Why build your career here?" />
          </Reveal>
          <Reveal delay={0.1} className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <p className="text-[1.5rem] leading-[1.35] font-semibold tracking-[-0.02em] text-primary md:text-[2rem]">
              A career at Reliance doesn&apos;t have to stay in one lane.{" "}
              <span className="font-medium text-text-muted">Move across businesses, disciplines and places as you grow.</span>
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ol" interval={0.1} className="mt-16 border-b border-primary/15 md:mt-24">
          {evpPillars.map((pillar, index) => (
            <RevealItem
              as="li"
              key={pillar.id}
              className="relative grid gap-y-3 border-t border-primary/15 py-9 pl-16 md:py-12 md:pl-24 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:py-14 lg:pl-0"
            >
              <Lane index={index} />
              <div className="lg:col-span-4">
                <span aria-hidden="true" className="block text-body-sm font-semibold text-accent-strong tabular-nums">
                  {pillar.number}
                </span>
                <h3 className="mt-2 text-[1.75rem] leading-[1.1] font-bold tracking-[-0.03em] text-primary md:text-[2.25rem]">
                  {pillar.title}
                </h3>
              </div>
              <p className="max-w-md text-body-lg text-text-muted lg:col-span-4 lg:col-start-9">{pillar.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
