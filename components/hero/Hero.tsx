import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { JobSearchForm } from "@/components/search/JobSearchForm";
import { images } from "@/data/images";
import { proofFootnote, proofPoints } from "@/data/site";

export const HERO_SEARCH_ID = "hero-search";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-background">
      <div className="relative xl:min-h-[39rem]">
        <Container className="relative pt-28 md:pt-32 xl:pt-32 xl:pb-12">
          <RevealGroup immediate interval={0.09} className="max-w-2xl xl:max-w-[60%]">
            <RevealItem>
              <p className="eyebrow flex items-center gap-3 text-accent-strong">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                RIL Careers
              </p>
            </RevealItem>
            <RevealItem>
              <h1
                id="hero-title"
                className="mt-6 text-[2.625rem] leading-[1.04] font-bold tracking-[-0.04em] text-primary sm:text-[3.25rem] md:text-[4rem] xl:text-[4.5rem] 2xl:text-[4.75rem]"
              >
                <span className="block">Find where you can</span>
                <span className="block font-light text-primary-hover">build what&apos;s next.</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-[34rem] text-body-lg text-text-muted md:text-[1.25rem] md:leading-[1.55]">
                Explore opportunities across one of India&apos;s most diverse business ecosystems.
              </p>
            </RevealItem>
          </RevealGroup>

          <Reveal immediate delay={0.35} className="relative z-10 mt-8 md:mt-9 xl:w-[88%]">
            <div id={HERO_SEARCH_ID} className="scroll-mt-28">
              <JobSearchForm id="hero-search-form" />
            </div>
          </Reveal>
        </Container>

        <HeroVisual />
      </div>

      <Container className="relative pt-12 pb-16 md:pt-14 md:pb-20 xl:pt-10">
        <Reveal>
          <ul
            aria-label="Reliance at a glance"
            className="grid divide-y divide-border border-t border-border md:grid-cols-3 md:divide-x md:divide-y-0 md:pt-8"
          >
            {proofPoints.map((point) => (
              <li
                key={point.id}
                className="flex items-baseline gap-4 py-5 md:flex-col md:gap-3 md:px-10 md:py-2 md:first:pl-0"
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
          <p className="mt-6 text-body-sm text-text-muted md:mt-7">
            <span aria-hidden="true">* </span>
            {proofFootnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * One dominant cinematic frame. On wide screens it bleeds off the right edge
 * and the search panel overlaps its lower-left corner; below that it runs
 * edge to edge beneath the search.
 */
function HeroVisual() {
  return (
    <div className="relative mt-10 md:mt-12 xl:absolute xl:top-22 xl:right-0 xl:bottom-0 xl:left-[max(60%,calc(50%+6rem))] xl:mt-0">
      <Reveal
        immediate
        variant="fade"
        className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9] xl:aspect-auto xl:h-full xl:rounded-bl-xl"
      >
        <Reveal immediate variant="imageScale" className="relative size-full">
          <Image
            src={images.heroSiteAerial.src}
            alt={images.heroSiteAerial.alt}
            fill
            preload
            sizes="(min-width: 1280px) 42vw, 100vw"
            className="object-cover"
            style={{ objectPosition: images.heroSiteAerial.focus }}
          />
        </Reveal>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary-dark/10 via-45% to-transparent xl:bg-gradient-to-b xl:from-primary-dark/70 xl:via-primary-dark/5 xl:via-40% xl:to-transparent"
        />
        <p className="absolute bottom-6 left-5 flex flex-col text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-white sm:left-8 md:bottom-8 md:text-[1.625rem] xl:top-10 xl:bottom-auto xl:left-10">
          <span aria-hidden="true" className="mb-4 block h-0.5 w-10 bg-accent" />
          <span>Build what&apos;s next.</span>
          <span className="font-light text-white/85">With Reliance.</span>
        </p>
      </Reveal>
    </div>
  );
}
