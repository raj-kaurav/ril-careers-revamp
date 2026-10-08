import { getBusiness, type BusinessId } from "@/data/businesses";
import { demoJobs, jobFunctions, type DemoJob } from "@/data/jobs";
import { jobHref, type JobSearchCriteria } from "./job-search";

/**
 * Jobs service boundary.
 *
 * Every component reads jobs through these functions — never from
 * `data/jobs.ts` directly — so swapping the local mock for HireSphere's jobs
 * API only changes this module. The mock is synchronous; a HireSphere-backed
 * version would make these async and add loading/error states.
 */

export type JobSearchResult = { total: number; jobs: DemoJob[] };

/**
 * Display model for a role card, shaped like a HireSphere job listing so the
 * card UI does not change when the source does.
 */
export type Opportunity = {
  id: string;
  business: { id: BusinessId; name: string };
  title: string;
  location: string;
  experience: string;
  skills: string[];
  employmentType: string;
  url: string;
  /** From the candidate's session once signed in; anonymous saves live in `lib/saved-jobs`. */
  saved?: boolean;
  /** True for prototype listings that are not live vacancies. */
  isPrototype: boolean;
};

export function toOpportunity(job: DemoJob): Opportunity {
  return {
    id: job.id,
    business: { id: job.businessId, name: getBusiness(job.businessId)?.name ?? "" },
    title: job.title,
    location: job.location,
    experience: job.experience,
    skills: job.skills,
    employmentType: job.employmentType,
    url: jobHref(job.id),
    isPrototype: job.isDemo,
  };
}

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[-_/]/g, " ")
    .split(/[^a-z0-9+#]+/)
    .filter(Boolean);
}

function searchableWords(job: DemoJob) {
  const business = getBusiness(job.businessId);
  const functionLabel = jobFunctions.find((item) => item.value === job.function)?.label ?? "";
  return tokens(
    [job.title, job.summary, functionLabel, business?.name, business?.category, ...job.skills].join(" "),
  );
}

function matchesQuery(job: DemoJob, query: string) {
  const wanted = tokens(query);
  if (wanted.length === 0) return true;
  const words = searchableWords(job);
  return wanted.every((token) => words.some((word) => word.startsWith(token)));
}

export function searchJobs(criteria: JobSearchCriteria): JobSearchResult {
  const location = criteria.location.toLowerCase();
  const jobs = demoJobs.filter(
    (job) =>
      matchesQuery(job, criteria.query) &&
      (!location || job.location.toLowerCase().includes(location)) &&
      (criteria.business === "all" || job.businessId === criteria.business) &&
      (criteria.careerStage === "all" || job.careerStage === criteria.careerStage) &&
      (criteria.jobFunction === "all" || job.function === criteria.jobFunction),
  );
  return { total: jobs.length, jobs };
}

export function getJob(id: string) {
  return demoJobs.find((job) => job.id === id);
}

export function getAllJobIds() {
  return demoJobs.map((job) => job.id);
}

export function getFeaturedJobs() {
  return demoJobs.filter((job) => job.featured);
}

/** Curated preview for the homepage — a handful of roles, not the full board. */
export function getFeaturedOpportunities(limit = 6) {
  return getFeaturedJobs().slice(0, limit).map(toOpportunity);
}

export function getRelatedJobs(job: DemoJob, limit = 3) {
  return demoJobs.filter((other) => other.id !== job.id && other.businessId === job.businessId).slice(0, limit);
}

/** Distinct cities across all roles, for location suggestions and filters. */
export function getJobLocations() {
  return [...new Set(demoJobs.map((job) => job.location.split(",")[0].trim()))].sort();
}
