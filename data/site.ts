import { businesses } from "./businesses";

export const site = {
  name: "RIL Careers",
  conceptLabel: "RIL Careers — 2026 Homepage Concept",
  copyrightYear: 2026,
  legalEntity: "Reliance Industries Limited",
  prototypeNotice: "Design concept for review. Not an official RIL website; all jobs, stories and figures are illustrative.",
  demoJobsNotice: "Demo roles for this prototype — not live Reliance vacancies.",
} as const;

export type ProofPoint = {
  id: string;
  value: string;
  label: string;
  /** True when the figure is indicative and must be confirmed before launch. */
  indicative: boolean;
};

export const proofPoints: ProofPoint[] = [
  { id: "people", value: "4L+", label: "people across the Reliance group", indicative: true },
  {
    id: "businesses",
    value: String(businesses.length),
    label: "business areas to build a career in",
    indicative: false,
  },
  { id: "reach", value: "Millions", label: "of lives reached by our products and services", indicative: true },
];

export const proofFootnote = "Indicative figures for this concept — to be confirmed before launch.";

/**
 * The recruitment platform behind search, job detail, applications and
 * candidate accounts. Attributed only in those contexts — never as a co-brand
 * on the homepage. URLs stay null until the HireSphere integration exists.
 */
export const hiringPlatform = {
  name: "HireSphere",
  description: "Reliance's candidate application platform",
  applyUrl: null as string | null,
  accountUrl: null as string | null,
} as const;

export const popularSearches = ["Technology", "Engineering", "Retail", "AI & Data", "New Energy"];

export type EvpPillar = {
  id: string;
  number: string;
  title: string;
  description: string;
};

/** Four parallel reasons to choose Reliance — not steps in a sequence. */
export const evpPillars: EvpPillar[] = [
  {
    id: "scale",
    number: "01",
    title: "Scale that matters",
    description: "Work on products, infrastructure and services operating at extraordinary scale.",
  },
  {
    id: "many-worlds",
    number: "02",
    title: "Many worlds. One ecosystem.",
    description: "Explore technology, energy, retail, media, new energy and more.",
  },
  {
    id: "complexity",
    number: "03",
    title: "Learn through complexity",
    description: "Solve ambitious problems where technology, business and real-world impact meet.",
  },
  {
    id: "impact",
    number: "04",
    title: "Build meaningful impact",
    description: "Work on ideas and systems that shape how people live, work and grow.",
  },
];

export type HiringStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const hiringSteps: HiringStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Explore businesses and roles to find where your skills fit best.",
  },
  {
    id: "apply",
    number: "02",
    title: "Apply",
    description: "Share your profile and apply for roles that match your ambitions.",
  },
  {
    id: "connect",
    number: "03",
    title: "Connect",
    description: "Meet our teams through assessments and interviews tailored to the role.",
  },
  {
    id: "offer-join",
    number: "04",
    title: "Offer & Join",
    description: "Receive your offer, complete the next steps and start your journey at Reliance.",
  },
];
