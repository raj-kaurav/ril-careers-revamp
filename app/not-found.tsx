import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/data/navigation";

export default function NotFound() {
  return (
    <div className="bg-background-muted">
      <Container className="pt-28 pb-24 md:pt-40 md:pb-32">
        <span aria-hidden="true" className="block h-[3px] w-12 bg-accent" />
        <h1 className="mt-8 text-h2 text-primary">We couldn&apos;t find that page</h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-muted">
          The role or page you&apos;re looking for may have closed or moved. Explore current opportunities instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.jobs} size="lg" icon={<ArrowRight className="size-5" />}>
            Find jobs
          </ButtonLink>
          <ButtonLink href={routes.home} size="lg" variant="secondary">
            Back to RIL Careers
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
