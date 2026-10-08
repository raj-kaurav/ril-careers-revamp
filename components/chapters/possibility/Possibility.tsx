import { ChapterMarker } from "@/components/editorial/ChapterMarker";
import { Reveal, RiseLine } from "@/components/motion/Reveal";
import { OpportunityList } from "./OpportunityList";
import { PossibilityFinder } from "./PossibilityFinder";

/** Job discovery arrives late, after the story — as a question, not a search bar. */
export function Possibility() {
  return (
    <section id="opportunities" aria-labelledby="possibility-title" className="chapter-y relative bg-paper">
      <div className="page-x mx-auto grid max-w-page gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-12">
        <div className="lg:sticky lg:top-24 lg:col-span-5">
          <ChapterMarker id="opportunities" />
          <h2 id="possibility-title" className="display mt-6 text-giant text-ink">
            <RiseLine>What could</RiseLine>
            <RiseLine delay={0.08}>
              you <em className="text-terracotta">build?</em>
            </RiseLine>
          </h2>
          <Reveal className="mt-8 md:mt-10">
            <PossibilityFinder />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <OpportunityList />
        </div>
      </div>
    </section>
  );
}
