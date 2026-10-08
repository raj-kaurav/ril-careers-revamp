import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/Button";
import { images } from "@/data/images";
import { proofFootnote, proofPoints } from "@/data/site";
import { HeroSearch } from "./HeroSearch";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-background">
      <div className="relative lg:min-h-[44rem]">
        <Container className="relative pt-32 md:pt-40 lg:pt-44 lg:pb-44">
          <RevealGroup immediate interval={0.09} className="max-w-2xl lg:max-w-[54%]">
            <RevealItem>
              <p className="eyebrow flex items-center gap-3 text-accent-strong">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                RIL Careers
              </p>
            </RevealItem>
            <RevealItem>
              <h1 id="hero-title" className="mt-7 text-display text-primary md:max-lg:text-[4rem]">
                <span className="block">Build what&apos;s next.</span>
                <span className="block font-light text-primary-hover">With Reliance.</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-7 max-w-[30rem] text-body-lg text-text-muted md:text-[1.25rem] md:leading-[1.55]">
                Join teams transforming energy, technology, retail and digital services at extraordinary scale.
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <TextLink href="#businesses">Explore the Reliance ecosystem</TextLink>
            </RevealItem>
          </RevealGroup>
        </Container>

        <HeroVisual />
      </div>

      <HeroSearch />

      <Container className="relative pt-14 pb-20 md:pt-20 md:pb-28">
        <Reveal>
          <ul
            aria-label="Reliance at a glance"
            className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {proofPoints.map((point) => (
              <li
                key={point.id}
                className="flex items-baseline gap-4 py-5 first:pt-0 md:flex-col md:gap-3 md:px-10 md:py-2 md:first:pl-0"
              >
                <span className="shrink-0 text-[2.25rem] leading-none font-bold tracking-[-0.035em] text-primary md:text-[3rem]">
                  {point.value}
                  {point.indicative ? (
                    <span aria-hidden="true" className="ml-0.5 align-super text-body-sm font-semibold text-accent-strong">
                      *
                    </span>
                  ) : null}
                </span>
                <span className="text-body text-text-muted md:text-body-lg">
                  {point.label}
                  {point.indicative ? <span className="sr-only"> (indicative figure)</span> : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-body-sm text-text-muted">
            <span aria-hidden="true">* </span>
            {proofFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * One dominant cinematic frame bleeding off the right edge, plus a single
 * supporting fragment. On small screens the frame runs edge to edge.
 */
function HeroVisual() {
  return (
    <div className="relative mt-12 md:mt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[58%] lg:mt-0 lg:pt-24 xl:left-[54%]">
      <Reveal immediate variant="fade" className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9] lg:aspect-auto lg:h-full">
        <Reveal immediate variant="imageScale" className="relative size-full">
          <Image
            src={images.heroSiteAerial.src}
            alt={images.heroSiteAerial.alt}
            fill
            preload
            sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            style={{ objectPosition: images.heroSiteAerial.focus }}
          />
        </Reveal>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-primary-dark/65 via-primary-dark/5 via-30% to-transparent"
        />
        <p className="absolute top-5 right-5 flex items-center gap-3 text-body-sm font-semibold text-white md:top-7 md:right-8">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Infrastructure · Technology · New energy
        </p>
      </Reveal>

      <Reveal
        immediate
        delay={0.3}
        className="absolute bottom-[8.5rem] -left-16 hidden aspect-[4/5] w-40 overflow-hidden bg-white p-1.5 lg:block xl:-left-24 xl:w-52"
      >
        <div className="relative size-full overflow-hidden">
          <Image
            src={images.heroScientist.src}
            alt={images.heroScientist.alt}
            fill
            sizes="210px"
            className="object-cover"
            style={{ objectPosition: images.heroScientist.focus }}
          />
        </div>
      </Reveal>
    </div>
  );
}
