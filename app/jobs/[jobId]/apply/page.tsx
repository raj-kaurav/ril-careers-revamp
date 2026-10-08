import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer/Footer";
import { HireSphereHandoff } from "@/components/hiresphere/HireSphereHandoff";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/navigation/Header";
import { getBusiness } from "@/data/businesses";
import { routes } from "@/data/navigation";
import { hiringPlatform } from "@/data/site";
import { jobHref } from "@/lib/job-search";
import { getAllJobIds, getJob } from "@/lib/jobs-service";

export function generateStaticParams() {
  return getAllJobIds().map((jobId) => ({ jobId }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[jobId]/apply">): Promise<Metadata> {
  const job = getJob((await params).jobId);
  return { title: job ? `Apply: ${job.title} — RIL Careers` : "Role not found — RIL Careers" };
}

export default function ApplyPage({ params }: PageProps<"/jobs/[jobId]/apply">) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-background-muted focus:outline-none">
        <Container className="pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-3xl">
            <Suspense fallback={<div aria-hidden="true" className="h-[30rem] rounded-xl bg-surface" />}>
              <ApplyHandoff params={params} />
            </Suspense>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

async function ApplyHandoff({ params }: { params: PageProps<"/jobs/[jobId]/apply">["params"] }) {
  const job = getJob((await params).jobId);
  if (!job) notFound();
  const business = getBusiness(job.businessId);
  const city = job.location.split(",")[0];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Find jobs", href: routes.jobs },
          { label: job.title, href: jobHref(job.id) },
          { label: "Apply" },
        ]}
      />
      <div className="mt-6">
        <HireSphereHandoff
          eyebrow="Apply for"
          title={job.title}
          context={`${business?.name} · ${city}`}
          continueLabel="Continue to application"
          destination={hiringPlatform.applyUrl}
          back={{ href: jobHref(job.id), label: "Back to role" }}
        >
          <p>
            Your application will continue through {hiringPlatform.name}, {hiringPlatform.description}. You can track
            its progress any time from My Careers.
          </p>
        </HireSphereHandoff>
      </div>
    </>
  );
}
