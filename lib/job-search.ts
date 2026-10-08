import type { DemoJob } from "@/data/jobs";
import { getWorld, isWorldId, worlds, type WorldId } from "@/data/worlds";

export type WorldFilter = "all" | WorldId;

export type JobSearchCriteria = {
  keywords: string;
  location: string;
  world: WorldFilter;
};

/** Contract for the future jobs/ATS integration. The prototype ships no implementation. */
export interface JobSearchService {
  search(criteria: JobSearchCriteria): Promise<{ total: number; jobs: unknown[] }>;
}

export const emptyCriteria: JobSearchCriteria = { keywords: "", location: "", world: "all" };

export const worldOptions: { value: WorldFilter; label: string }[] = [
  { value: "all", label: "any world" },
  ...worlds.map((world) => ({ value: world.id, label: world.name })),
];

const PARAM = { keywords: "q", location: "location", world: "world" } as const;

export function criteriaFromParams(params: URLSearchParams): JobSearchCriteria {
  const world = params.get(PARAM.world);
  return {
    keywords: params.get(PARAM.keywords)?.trim() ?? "",
    location: params.get(PARAM.location)?.trim() ?? "",
    world: isWorldId(world) ? world : "all",
  };
}

export function applyCriteriaToParams(params: URLSearchParams, criteria: JobSearchCriteria) {
  const next = new URLSearchParams(params);
  const entries: [string, string][] = [
    [PARAM.keywords, criteria.keywords.trim()],
    [PARAM.location, criteria.location.trim()],
    [PARAM.world, criteria.world === "all" ? "" : criteria.world],
  ];
  for (const [key, value] of entries) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  return next;
}

export function hasCriteria(criteria: JobSearchCriteria) {
  return Boolean(criteria.keywords.trim() || criteria.location.trim() || criteria.world !== "all");
}

export function describeCriteria(criteria: JobSearchCriteria): string[] {
  const parts: string[] = [];
  if (criteria.keywords.trim()) parts.push(`“${criteria.keywords.trim()}”`);
  if (criteria.world !== "all") parts.push(getWorld(criteria.world)?.name ?? "");
  if (criteria.location.trim()) parts.push(criteria.location.trim());
  return parts.filter(Boolean);
}

/**
 * Narrows the demo list in the browser so the interaction feels real.
 * The live product would call a `JobSearchService` instead.
 */
export function filterDemoJobs(jobs: DemoJob[], criteria: JobSearchCriteria | null): DemoJob[] {
  if (!criteria || !hasCriteria(criteria)) return jobs;
  const keywords = criteria.keywords.trim().toLowerCase();
  const location = criteria.location.trim().toLowerCase();
  return jobs.filter((job) => {
    if (criteria.world !== "all" && job.worldId !== criteria.world) return false;
    if (location && !job.location.toLowerCase().includes(location)) return false;
    if (!keywords) return true;
    const haystack = [job.title, job.business, job.summary, ...job.skills].join(" ").toLowerCase();
    return keywords.split(/\s+/).every((word) => haystack.includes(word));
  });
}
