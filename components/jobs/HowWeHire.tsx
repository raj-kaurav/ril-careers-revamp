import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { hiringSteps } from "@/data/site";

export function HowWeHire() {
  return (
    <Section id="how-we-hire" labelledBy="hiring-title" tone="muted" spacing="none" className="pb-20 md:pb-28 lg:pb-[8.5rem]">
      <Container>
        <div className="border-t border-primary/15 pt-14 md:pt-20">
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
          <RevealGroup as="ol" interval={0.1} className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 md:mt-14 lg:grid-cols-4 lg:gap-8">
            {hiringSteps.map((step) => (
              <RevealItem as="li" key={step.id} className="grid grid-cols-[3.5rem_1fr] sm:block">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="text-[2rem] leading-none font-light tracking-[-0.04em] text-accent-strong tabular-nums sm:text-[2.5rem]"
                  >
                    {step.number}
                  </span>
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-primary/20 sm:block" />
                </div>
                <div>
                  <h3 className="text-h3 text-primary sm:mt-6">{step.title}</h3>
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
