import { businesses, getBusiness, type BusinessId } from "@/data/businesses";

export type BusinessFilter = "all" | BusinessId;

export type JobSearchCriteria = {
  keywords: string;
  location: string;
  business: BusinessFilter;
};

/** Contract for the future jobs/ATS integration. The prototype ships no implementation. */
export interface JobSearchService {
  search(criteria: JobSearchCriteria): Promise<{ total: number; jobs: unknown[] }>;
}

export const emptyCriteria: JobSearchCriteria = { keywords: "", location: "", business: "all" };

export const businessOptions: { value: BusinessFilter; label: string }[] = [
  { value: "all", label: "All Businesses" },
  ...businesses.map((business) => ({ value: business.id, label: business.name })),
];

const PARAM = { keywords: "q", location: "location", business: "business" } as const;

function isBusinessFilter(value: string | null): value is BusinessFilter {
  return value === "all" || businesses.some((business) => business.id === value);
}

export function criteriaFromParams(params: URLSearchParams): JobSearchCriteria {
  const business = params.get(PARAM.business);
  return {
    keywords: params.get(PARAM.keywords)?.trim() ?? "",
    location: params.get(PARAM.location)?.trim() ?? "",
    business: isBusinessFilter(business) ? business : "all",
  };
}

export function applyCriteriaToParams(params: URLSearchParams, criteria: JobSearchCriteria) {
  const next = new URLSearchParams(params);
  const entries: [string, string][] = [
    [PARAM.keywords, criteria.keywords.trim()],
    [PARAM.location, criteria.location.trim()],
    [PARAM.business, criteria.business === "all" ? "" : criteria.business],
  ];
  for (const [key, value] of entries) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  return next;
}

export function hasCriteria(criteria: JobSearchCriteria) {
  return Boolean(criteria.keywords.trim() || criteria.location.trim() || criteria.business !== "all");
}

export function describeCriteria(criteria: JobSearchCriteria): string[] {
  const parts: string[] = [];
  if (criteria.keywords.trim()) parts.push(`“${criteria.keywords.trim()}”`);
  if (criteria.location.trim()) parts.push(criteria.location.trim());
  parts.push(criteria.business === "all" ? "All businesses" : (getBusiness(criteria.business)?.name ?? ""));
  return parts.filter(Boolean);
}
