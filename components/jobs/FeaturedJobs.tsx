import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/data/navigation";
import { site } from "@/data/site";
import { getFeaturedOpportunities } from "@/lib/jobs-service";
import { cn } from "@/lib/utils";
import { JobCard } from "./JobCard";

const MOBILE_PREVIEW_COUNT = 4;

/**
 * A curated preview of roles, not a job board — full search lives in the
 * hero and on /jobs.
 */
export function FeaturedJobs() {
  const opportunities = getFeaturedOpportunities();

  return (
    <Section
      id="opportunities"
      labelledBy="jobs-title"
      tone="muted"
      spacing="none"
      className="pt-20 pb-14 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="jobs-title"
            eyebrow="Opportunities"
            title="Opportunities worth exploring"
            intro="Find roles where your skills can make an impact."
          />
          <ButtonLink
            href={routes.jobs}
            variant="secondary"
            icon={<ArrowRight className="size-5" />}
            className="hidden shrink-0 md:inline-flex"
          >
            Explore all opportunities
          </ButtonLink>
        </Reveal>

        <RevealGroup
          as="ul"
          interval={0.06}
          className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
        >
          {opportunities.map((opportunity, index) => (
            <RevealItem as="li" key={opportunity.id} className={cn(index >= MOBILE_PREVIEW_COUNT && "max-md:hidden")}>
              <JobCard job={opportunity} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm text-text-muted">{site.demoJobsNotice}</p>
          <ButtonLink
            href={routes.jobs}
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="size-5" />}
            className="w-full md:hidden"
          >
            Explore all opportunities
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
