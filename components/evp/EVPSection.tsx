import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { images } from "@/data/images";
import { evpPillars } from "@/data/site";

/**
 * "The Reliance Difference" — four parallel reasons to join, laid out as an
 * editorial grid. Deliberately no connecting line or sequence: these are not
 * steps in a career path.
 */
export function EVPSection() {
  return (
    <Section id="why-reliance" labelledBy="evp-title" tone="muted">
      <Container>
        <div className="layout-grid items-end gap-y-8">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
            <SectionHeading id="evp-title" eyebrow="Why Reliance" title="The Reliance Difference" />
          </Reveal>
          <Reveal delay={0.1} className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="text-[1.5rem] leading-[1.3] font-semibold tracking-[-0.02em] text-primary md:text-[1.875rem]">
              <span className="block">Different businesses.</span>
              <span className="block">Different challenges.</span>
              <span className="block text-accent-strong">One extraordinary scale.</span>
            </p>
          </Reveal>
        </div>

        <div className="layout-grid mt-14 gap-y-12 md:mt-20">
          <Reveal
            variant="fade"
            className="relative col-span-4 aspect-[16/10] overflow-hidden rounded-xl md:col-span-8 lg:col-span-4 lg:aspect-auto lg:min-h-[30rem]"
          >
            <Image
              src={images.evpLab.src}
              alt={images.evpLab.alt}
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 100vw"
              className="object-cover"
              style={{ objectPosition: images.evpLab.focus }}
            />
          </Reveal>

          <RevealGroup
            as="ul"
            interval={0.08}
            className="col-span-4 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-8 md:gap-y-12 lg:col-span-8 lg:pl-8 xl:gap-x-16 xl:pl-12"
          >
            {evpPillars.map((pillar) => (
              <RevealItem as="li" key={pillar.id} className="border-t-2 border-primary/15 pt-6 md:pt-7">
                <span aria-hidden="true" className="text-body-sm font-semibold text-accent-strong tabular-nums">
                  {pillar.number}
                </span>
                <h3 className="mt-4 text-h3 text-primary">{pillar.title}</h3>
                <p className="mt-3 text-body-lg text-text-muted">{pillar.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
