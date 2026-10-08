import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { hiringSteps } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The one intentionally sequential block on the page: connecting lines run
 * between steps (horizontal on wide screens, vertical on phones) and stop at
 * the final step.
 */
export function HowWeHire() {
  return (
    <Section id="how-we-hire" labelledBy="hiring-title" tone="muted" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="border-t border-primary/15 pt-12 md:pt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3 text-accent-strong">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                Our process
              </p>
              <h2 id="hiring-title" className="text-[2rem] leading-[1.1] font-bold tracking-[-0.03em] text-primary md:text-[2.5rem]">
                How we hire
              </h2>
            </div>
            <p className="text-body-sm text-text-muted">Indicative — steps vary by role, business and level.</p>
          </div>
          <RevealGroup as="ol" interval={0.1} className="mt-10 grid sm:grid-cols-2 sm:gap-10 md:mt-12 lg:grid-cols-4 lg:gap-8">
            {hiringSteps.map((step, index) => (
              <RevealItem
                as="li"
                key={step.id}
                className="group relative grid grid-cols-[3.5rem_1fr] items-start pb-8 last:pb-0 sm:block sm:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-11 bottom-2 left-[1.05rem] w-px bg-primary/20 group-last:hidden sm:hidden"
                />
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="text-[2rem] leading-none font-light tracking-[-0.04em] text-accent-strong tabular-nums sm:text-[2.5rem]"
                  >
                    {step.number}
                  </span>
                  {index < hiringSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={cn("hidden h-px flex-1 bg-primary/20 sm:block", index % 2 === 1 && "sm:hidden lg:block")}
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-h3 text-primary sm:mt-5">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-body text-text-muted">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
