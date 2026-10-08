import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { stories } from "@/data/stories";
import { StoryCard } from "./StoryCard";

export function EmployeeStories() {
  const featured = stories.find((story) => story.featured) ?? stories[0];
  const secondary = stories.filter((story) => story.id !== featured.id);

  return (
    <Section id="life" labelledBy="stories-title" tone="light">
      <Container>
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="stories-title"
            eyebrow="Life at Reliance"
            title={
              <>
                Real people.
                <br />
                Real impact.
              </>
            }
            intro="What does it feel like to work here? Hear it from the people building and transforming Reliance."
          />
          <ButtonLink
            href="/#why-reliance"
            variant="secondary"
            icon={<ArrowRight className="size-5" />}
            className="hidden md:inline-flex"
          >
            Explore life at Reliance
          </ButtonLink>
        </Reveal>

        <Reveal variant="sectionReveal" className="mt-12 md:mt-16">
          <StoryCard story={featured} />
        </Reveal>

        <RevealGroup
          interval={0.12}
          className="mt-16 grid gap-12 border-t border-border pt-12 md:mt-20 md:grid-cols-2 md:gap-10 lg:gap-16"
        >
          {secondary.map((story) => (
            <RevealItem key={story.id}>
              <StoryCard story={story} />
            </RevealItem>
          ))}
        </RevealGroup>

        <ButtonLink
          href="#why-reliance"
          variant="secondary"
          size="lg"
          icon={<ArrowRight className="size-5" />}
          className="mt-12 w-full md:hidden"
        >
          Explore life at Reliance
        </ButtonLink>

        <p className="mt-10 text-body-sm text-text-muted">
          Stories shown are illustrative and do not depict real Reliance employees.
        </p>
      </Container>
    </Section>
  );
}
