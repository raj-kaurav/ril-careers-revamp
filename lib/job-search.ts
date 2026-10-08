import { businesses, getBusiness, isBusinessId, type BusinessId } from "@/data/businesses";
import { careerStages, jobFunctions, type CareerStage, type JobFunction } from "@/data/jobs";

/**
 * Search criteria shared by the hero search, explorer CTAs and the /jobs
 * results page. The URL is the source of truth, so every search is shareable
 * and maps 1:1 onto a future HireSphere jobs query.
 */
export type JobSearchCriteria = {
  query: string;
  location: string;
  business: BusinessId | "all";
  careerStage: CareerStage | "all";
  jobFunction: JobFunction | "all";
};

export const emptyCriteria: JobSearchCriteria = {
  query: "",
  location: "",
  business: "all",
  careerStage: "all",
  jobFunction: "all",
};

export const PARAM = {
  query: "query",
  location: "location",
  business: "business",
  careerStage: "careerStage",
  jobFunction: "function",
} as const satisfies Record<keyof JobSearchCriteria, string>;

export const JOBS_PATH = "/jobs";

export const businessOptions: { value: BusinessId | "all"; label: string }[] = [
  { value: "all", label: "All Businesses" },
  ...businesses.map((business) => ({ value: business.id, label: business.name })),
];

const isCareerStage = (value: string | null): value is CareerStage =>
  careerStages.some((stage) => stage.value === value);
const isJobFunction = (value: string | null): value is JobFunction =>
  jobFunctions.some((item) => item.value === value);

type ParamReader = { get(name: string): string | null };

export function criteriaFromParams(params: ParamReader): JobSearchCriteria {
  const business = params.get(PARAM.business);
  const careerStage = params.get(PARAM.careerStage);
  const jobFunction = params.get(PARAM.jobFunction);
  return {
    query: params.get(PARAM.query)?.trim() ?? "",
    location: params.get(PARAM.location)?.trim() ?? "",
    business: isBusinessId(business) ? business : "all",
    careerStage: isCareerStage(careerStage) ? careerStage : "all",
    jobFunction: isJobFunction(jobFunction) ? jobFunction : "all",
  };
}

export function criteriaToParams(criteria: Partial<JobSearchCriteria>) {
  const params = new URLSearchParams();
  for (const key of Object.keys(PARAM) as (keyof JobSearchCriteria)[]) {
    const value = criteria[key]?.trim();
    if (value && value !== "all") params.set(PARAM[key], value);
  }
  return params;
}

/** `/jobs?query=…&business=…` — the prototype stand-in for a HireSphere search. */
export function jobsHref(criteria: Partial<JobSearchCriteria> = {}) {
  const query = criteriaToParams(criteria).toString();
  return query ? `${JOBS_PATH}?${query}` : JOBS_PATH;
}

export function jobHref(jobId: string) {
  return `${JOBS_PATH}/${jobId}`;
}

export function applyHref(jobId: string) {
  return `${JOBS_PATH}/${jobId}/apply`;
}

export function activeFilterCount(criteria: JobSearchCriteria) {
  return [criteria.business, criteria.careerStage, criteria.jobFunction].filter((value) => value !== "all").length +
    (criteria.location ? 1 : 0);
}

/** Human-readable chips describing the active search. */
export function describeCriteria(criteria: JobSearchCriteria) {
  const chips: { key: keyof JobSearchCriteria; label: string }[] = [];
  if (criteria.query) chips.push({ key: "query", label: `“${criteria.query}”` });
  if (criteria.location) chips.push({ key: "location", label: criteria.location });
  if (criteria.business !== "all") chips.push({ key: "business", label: getBusiness(criteria.business)?.name ?? "" });
  if (criteria.careerStage !== "all") {
    chips.push({ key: "careerStage", label: careerStages.find((s) => s.value === criteria.careerStage)?.label ?? "" });
  }
  if (criteria.jobFunction !== "all") {
    chips.push({ key: "jobFunction", label: jobFunctions.find((f) => f.value === criteria.jobFunction)?.label ?? "" });
  }
  return chips;
}
