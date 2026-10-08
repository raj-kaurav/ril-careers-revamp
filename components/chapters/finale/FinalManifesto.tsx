import { ArrowLink } from "@/components/editorial/ArrowLink";
import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { Photo } from "@/components/editorial/Photo";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { images } from "@/data/images";

/** Campaign close: a colour field, one sentence, two ways forward. */
export function FinalManifesto() {
  return (
    <section id="next-chapter" aria-labelledby="finale-title" className="relative bg-terracotta text-ink">
      <div className="page-x mx-auto max-w-page pt-20 pb-14 md:pt-28 md:pb-20">
        <ChapterMarker id="next-chapter" tone="ink" />
        <h2
          id="finale-title"
          className="display mt-8 text-[clamp(2.75rem,1.2rem+4.6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] md:mt-10"
        >
          <RiseLine>Your next chapter</RiseLine>
          <RiseLine delay={0.08}>could be somewhere</RiseLine>
          <RiseLine delay={0.16} className="lg:pl-[25%]">
            <em className="text-ivory">unexpected.</em>
          </RiseLine>
        </h2>

        <Reveal className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="max-w-md text-lede lg:col-span-4">
            Six worlds, one group, and more than one way forward. Start with a world — or start with a role.
          </p>
          <div className="flex flex-col items-start gap-2 lg:col-span-7 lg:col-start-6 lg:flex-row lg:justify-end lg:gap-14">
            <ArrowLink href="#worlds" size="lg" className="text-ink hover:text-ivory">
              Explore careers
            </ArrowLink>
            <ArrowLink href="#find" size="lg" className="text-ink hover:text-ivory">
              Find opportunities
            </ArrowLink>
          </div>
        </Reveal>
      </div>

      <figure className="relative">
        <Photo image={images.mumbaiDusk} sizes="100vw" parallax={14} className="aspect-[4/3] md:aspect-[21/8] lg:aspect-auto lg:h-[min(46svh,30rem)]" />
        <figcaption className="page-x absolute inset-x-0 bottom-0 mx-auto max-w-page pb-6 md:pb-10">
          <p className="caption text-ivory/85">Mumbai, after dark — somewhere a next chapter is starting.</p>
        </figcaption>
      </figure>
    </section>
  );
}
