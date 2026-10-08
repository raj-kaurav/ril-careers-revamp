import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/data/images";
import { routes } from "@/data/navigation";

export function FinalCTA() {
  return (
    <Section
      labelledBy="cta-title"
      tone="dark"
      spacing="none"
      className="isolate flex min-h-[36rem] items-end overflow-hidden py-24 md:min-h-[40rem] md:py-32 lg:min-h-[44rem] lg:py-36"
    >
      <Image
        src={images.ctaMumbai.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[60%_50%] opacity-70 mix-blend-luminosity"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background-dark via-background-dark/70 to-background-dark/30 md:bg-gradient-to-r md:from-background-dark md:via-background-dark/75 md:to-background-dark/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background-dark to-transparent"
      />
      <Container>
        <Reveal className="max-w-3xl">
          <span aria-hidden="true" className="block h-0.5 w-12 bg-accent" />
          <h2 id="cta-title" className="mt-8 text-h1 text-white">
            <span className="block">Your next chapter</span>
            <span className="block font-light text-text-inverse-muted">could start here.</span>
          </h2>
          <p className="mt-7 max-w-lg text-body-lg text-text-inverse-muted md:text-[1.25rem] md:leading-[1.55]">
            Explore opportunities across one of India&apos;s most diverse business ecosystems.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href={routes.jobs} variant="accent" size="lg" icon={<ArrowRight className="size-5" />}>
              Find jobs
            </ButtonLink>
            <ButtonLink href="/#pathways" variant="outline-inverse" size="lg">
              Explore careers
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
