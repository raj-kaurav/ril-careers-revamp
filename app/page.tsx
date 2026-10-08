import { FinalManifesto } from "@/components/chapters/finale/FinalManifesto";
import { ImpactStrip } from "@/components/chapters/impact/ImpactStrip";
import { ManifestoHero } from "@/components/chapters/manifesto/ManifestoHero";
import { CareerMoves } from "@/components/chapters/moves/CareerMoves";
import { PeopleStories } from "@/components/chapters/people/PeopleStories";
import { Possibility } from "@/components/chapters/possibility/Possibility";
import { CareerWorlds } from "@/components/chapters/worlds/CareerWorlds";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { JobSearchProvider } from "@/components/jobs/JobSearchProvider";
import { SiteHeader } from "@/components/navigation/SiteHeader";

/** Variant 02 — the homepage read as seven chapters of one campaign. */
export default function HomePage() {
  return (
    <JobSearchProvider>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <ManifestoHero />
        <CareerWorlds />
        <PeopleStories />
        <CareerMoves />
        <Possibility />
        <ImpactStrip />
        <FinalManifesto />
      </main>
      <SiteFooter />
    </JobSearchProvider>
  );
}
