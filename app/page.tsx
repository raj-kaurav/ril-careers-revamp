import { BusinessExplorer } from "@/components/businesses/BusinessExplorer";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { EVPSection } from "@/components/evp/EVPSection";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { FeaturedJobs } from "@/components/jobs/FeaturedJobs";
import { HowWeHire } from "@/components/jobs/HowWeHire";
import { JobSearchProvider } from "@/components/jobs/JobSearchProvider";
import { Header } from "@/components/navigation/Header";
import { CareerPathways } from "@/components/pathways/CareerPathways";
import { EmployeeStories } from "@/components/stories/EmployeeStories";

export default function HomePage() {
  return (
    <JobSearchProvider>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <BusinessExplorer />
        <CareerPathways />
        <EVPSection />
        <EmployeeStories />
        <FeaturedJobs />
        <HowWeHire />
        <FinalCTA />
      </main>
      <Footer />
    </JobSearchProvider>
  );
}
