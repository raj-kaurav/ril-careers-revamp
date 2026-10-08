import { Suspense } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { PoweredByHireSphere } from "@/components/hiresphere/PoweredByHireSphere";
import { JobResults } from "@/components/jobs/results/JobResults";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/navigation/Header";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Find jobs — RIL Careers",
  description: "Search opportunities across Reliance businesses. Prototype results using demo roles.",
};

export default function JobsPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <div className="bg-background-muted pt-28 pb-8 md:pt-36 md:pb-10">
          <Container>
            <Breadcrumbs items={[{ label: "Careers", href: routes.home }, { label: "Find jobs" }]} />
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-h2 text-primary">Find your opportunity</h1>
                <p className="mt-3 max-w-xl text-body-lg text-text-muted">
                  Search roles across every Reliance business.
                </p>
              </div>
              <PoweredByHireSphere className="md:pb-2" />
            </div>
          </Container>
        </div>
        <Suspense fallback={<ResultsFallback />}>
          <JobResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function ResultsFallback() {
  return (
    <div aria-hidden="true">
      <div className="bg-background-muted pb-10 md:pb-12">
        <Container>
          <div className="h-[9.5rem] rounded-xl border border-border bg-surface md:h-[5.25rem]" />
        </Container>
      </div>
      <Container className="pt-10 pb-20 md:pt-14">
        <div className="grid gap-5 lg:ml-[calc(33.333%+2.5rem)] xl:ml-[calc(25%+3.5rem)] xl:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-xl bg-background-muted" />
          ))}
        </div>
      </Container>
    </div>
  );
}
