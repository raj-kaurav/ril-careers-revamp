import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Clock3, Layers, MapPin } from "lucide-react";
import { Footer } from "@/components/footer/Footer";
import { PoweredByHireSphere } from "@/components/hiresphere/PoweredByHireSphere";
import { JobCard } from "@/components/jobs/JobCard";
import { SaveJobButton } from "@/components/jobs/SaveJobButton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/navigation/Header";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { getBusiness } from "@/data/businesses";
import { jobFunctions } from "@/data/jobs";
import { routes } from "@/data/navigation";
import { hiringPlatform, site } from "@/data/site";
import { applyHref, jobsHref } from "@/lib/job-search";
import { getAllJobIds, getJob, getRelatedJobs, toOpportunity } from "@/lib/jobs-service";

export function generateStaticParams() {
  return getAllJobIds().map((jobId) => ({ jobId }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[jobId]">): Promise<Metadata> {
  const job = getJob((await params).jobId);
  return { title: job ? `${job.title} — RIL Careers` : "Role not found — RIL Careers" };
}

export default function JobDetailPage({ params }: PageProps<"/jobs/[jobId]">) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<JobDetailFallback />}>
          <JobDetail params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function JobDetailFallback() {
  return (
    <div aria-hidden="true" className="bg-background-muted pt-28 pb-12 md:pt-36 md:pb-16">
      <Container>
        <div className="h-4 w-48 rounded bg-primary/10" />
        <div className="mt-10 h-14 max-w-xl rounded bg-primary/10" />
        <div className="mt-8 h-6 max-w-2xl rounded bg-primary/5" />
      </Container>
    </div>
  );
}

async function JobDetail({ params }: { params: PageProps<"/jobs/[jobId]">["params"] }) {
  const job = getJob((await params).jobId);
  if (!job) notFound();

  const business = getBusiness(job.businessId);
  const functionLabel = jobFunctions.find((item) => item.value === job.function)?.label;
  const related = getRelatedJobs(job);

  const meta = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Clock3, label: "Employment type", value: job.employmentType },
    { icon: BriefcaseBusiness, label: "Experience", value: job.experience },
    { icon: Layers, label: "Function", value: functionLabel },
  ];

  return (
    <>
        <div className="bg-background-muted pt-28 pb-12 md:pt-36 md:pb-16">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Careers", href: routes.home },
                { label: "Find jobs", href: routes.jobs },
                { label: job.title },
              ]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="eyebrow text-accent-strong">{business?.name}</p>
              <span className="rounded-sm border border-dashed border-text-muted/50 px-2 py-0.5 text-body-sm font-medium text-text-muted">
                Demo role
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-h1 text-primary">{job.title}</h1>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:gap-x-10 lg:flex lg:flex-wrap">
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                  <div>
                    <dt className="text-body-sm text-text-muted">{label}</dt>
                    <dd className="text-body font-semibold text-text">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={applyHref(job.id)} size="lg" icon={<ArrowRight className="size-5" />}>
                Apply now
              </ButtonLink>
              <SaveJobButton jobId={job.id} jobTitle={job.title} withLabel className="h-14" />
            </div>
          </Container>
        </div>

        <Container className="py-16 md:py-24">
          <div className="layout-grid gap-y-14">
            <div className="col-span-4 space-y-12 md:col-span-8 lg:col-span-7">
              <section aria-labelledby="overview-title">
                <h2 id="overview-title" className="text-h3 text-primary">
                  Overview
                </h2>
                <p className="mt-4 text-body-lg text-text">{job.summary}</p>
              </section>
              <section aria-labelledby="responsibilities-title">
                <h2 id="responsibilities-title" className="text-h3 text-primary">
                  What you&apos;ll do
                </h2>
                <ul className="mt-5 space-y-3">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-4 text-body-lg text-text">
                      <span aria-hidden="true" className="mt-[0.7rem] h-0.5 w-4 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="skills-title">
                <h2 id="skills-title" className="text-h3 text-primary">
                  Skills
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border px-4 py-1.5 text-body font-medium text-text"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
              <p className="border-t border-border pt-6 text-body-sm text-text-muted">{site.demoJobsNotice}</p>
            </div>

            {business ? (
              <aside
                aria-labelledby="business-title"
                className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9"
              >
                <div className="overflow-hidden rounded-xl border border-border lg:sticky lg:top-28">
                  <div className="relative aspect-[16/10] bg-primary">
                    <Image
                      src={business.image.src}
                      alt={business.image.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover"
                      style={{ objectPosition: business.image.focus }}
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="eyebrow text-accent-strong">{business.category}</p>
                    <h2 id="business-title" className="mt-3 text-h3 text-primary">
                      About {business.name}
                    </h2>
                    <p className="mt-3 text-body text-text-muted">{business.description}</p>
                    <TextLink href={jobsHref({ business: business.id })} className="mt-4">
                      All {business.name} roles
                    </TextLink>
                    <div className="mt-6 border-t border-border pt-6">
                      <p className="text-body-sm text-text-muted">
                        Applications continue through {hiringPlatform.name}, {hiringPlatform.description}.
                      </p>
                      <PoweredByHireSphere className="mt-3" />
                    </div>
                  </div>
                </div>
              </aside>
            ) : null}
          </div>
        </Container>

        {related.length > 0 ? (
          <section aria-labelledby="related-title" className="bg-background-muted py-16 md:py-24">
            <Container>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 id="related-title" className="text-h2 text-primary">
                  More at {business?.name}
                </h2>
                <TextLink href={jobsHref({ business: job.businessId })}>View all</TextLink>
              </div>
              <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {related.map((other) => (
                  <li key={other.id}>
                    <JobCard job={toOpportunity(other)} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ) : null}
    </>
  );
}
