import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { DemoNote } from "@/components/editorial/DemoNote";
import { Photo } from "@/components/editorial/Photo";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { interruptions, leadStory, leadStoryDetail, type PersonStory } from "@/data/people";

export function PeopleStories() {
  const [karan, meera, rohan] = interruptions;

  return (
    <section id="people" aria-labelledby="people-title" className="chapter-y relative overflow-hidden bg-ivory">
      <div className="page-x mx-auto max-w-page">
        {/* Heading and lead story read as one composition. */}
        <ChapterMarker id="people" />
        <h2 id="people-title" className="display mt-6 text-giant text-ink">
          <RiseLine>Meet the people</RiseLine>
          <RiseLine delay={0.08}>
            building <em className="text-terracotta">what&rsquo;s next.</em>
          </RiseLine>
        </h2>

        <article
          aria-labelledby="lead-story-name"
          className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-x-12"
        >
          <Reveal variant="fade" className="bleed-left -mr-5 md:mr-0 lg:col-span-6">
            <Photo
              image={leadStory.image!}
              sizes="(min-width: 1024px) 50vw, 100vw"
              parallax={8}
              className="aspect-square md:aspect-[5/4] lg:aspect-auto lg:h-[min(72svh,46rem)] lg:min-h-[30rem]"
            />
          </Reveal>

          <Reveal className="lg:col-span-6">
            <blockquote>
              <p className="display text-large text-ink">{leadStory.started}</p>
              <p className="display mt-5 text-large text-ink/55 italic">{leadStory.today}</p>
            </blockquote>
            <p className="mt-8 max-w-md text-body text-ink/80 md:text-[1.0625rem]">{leadStoryDetail.note}</p>
            <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-line pt-5 md:grid-cols-4">
              <div className="col-span-2">
                <dt className="sr-only">Name</dt>
                <dd id="lead-story-name" className="display text-[1.625rem] leading-none text-ink">
                  {leadStory.name}
                </dd>
                <dd className="mt-2 text-small text-muted">{leadStory.role}</dd>
              </div>
              <div>
                <dt className="caption text-muted">World</dt>
                <dd className="mt-2 text-small text-ink">{leadStory.world}</dd>
              </div>
              <div>
                <dt className="caption text-muted">Path</dt>
                <dd className="mt-2 text-small text-ink">
                  {leadStoryDetail.joined}
                  <br />
                  {leadStoryDetail.moves}
                </dd>
              </div>
            </dl>
          </Reveal>
        </article>

        {/* Interruption — the place the story happened, with the quote laid over its corner. */}
        <article aria-label={`${karan.name}, ${karan.role}`} className="relative mt-20 md:mt-28 lg:mt-32 lg:pb-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <Reveal variant="fade" className="bleed-x md:mx-0 lg:col-span-8 lg:col-start-1">
              <Photo
                image={karan.image!}
                sizes="(min-width: 1024px) 66vw, 100vw"
                parallax={10}
                className="aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[min(62svh,40rem)]"
              />
            </Reveal>
          </div>
          <Reveal
            delay={0.15}
            className="relative -mt-16 ml-6 bg-ivory pt-8 pl-6 md:-mt-32 md:ml-auto md:w-[58%] md:pl-10 lg:absolute lg:right-0 lg:bottom-0 lg:m-0 lg:w-[42%] lg:p-12 lg:pr-0"
          >
            <StoryQuote story={karan} />
          </Reveal>
        </article>

        {/* Interruption — a type-only story set against a portrait, as one row. */}
        <div className="mt-20 grid gap-12 md:mt-28 lg:mt-32 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="bleed-left -mr-5 md:mr-0 lg:col-span-6">
            <article
              aria-label={`${meera.name}, ${meera.role}`}
              className="bg-terracotta py-12 pr-6 pl-[calc(max(0px,(100vw-96rem)/2)+var(--page-pad))] text-ink md:py-16 md:pr-12"
            >
              <p className="text-[1.125rem] font-semibold">{meera.started}</p>
              <p className="display mt-5 text-large">{meera.today}</p>
              <p className="mt-8 text-[1.0625rem] font-semibold">
                {meera.name} — <span className="font-normal">{meera.role}, {meera.world}</span>
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <article
              aria-label={`${rohan.name}, ${rohan.role}`}
              className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-end gap-6 md:gap-8"
            >
              <Photo image={rohan.image!} sizes="(min-width: 1024px) 22vw, 45vw" className="aspect-[3/4]" />
              <div className="pb-1">
                <StoryQuote story={rohan} compact />
              </div>
            </article>
          </Reveal>
        </div>

        <DemoNote className="mt-14 md:mt-16">All names, roles and quotes in this chapter are illustrative prototype content</DemoNote>
      </div>
    </section>
  );
}

function StoryQuote({ story, compact }: { story: PersonStory; compact?: boolean }) {
  return (
    <>
      <blockquote>
        <p className={compact ? "text-body text-ink/70" : "text-body text-ink/70 md:text-lede"}>{story.started}</p>
        <p
          className={
            compact
              ? "display mt-3 text-[1.5rem] leading-[1.1] text-ink md:text-[1.75rem]"
              : "display mt-4 text-title text-ink"
          }
        >
          {story.today}
        </p>
      </blockquote>
      <p className="caption mt-5 text-ink">
        {story.name}
        <span className="text-muted"> — {story.role}</span>
      </p>
      <p className="caption mt-2 text-terracotta-deep">{story.world}</p>
    </>
  );
}
