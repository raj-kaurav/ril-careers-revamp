import { businesses } from "./businesses";

export const site = {
  name: "RIL Careers",
  conceptLabel: "RIL Careers — 2026 Homepage Concept",
  copyrightYear: 2026,
  legalEntity: "Reliance Industries Limited",
  prototypeNotice: "Design concept for review. Not an official RIL website; all jobs, stories and figures are illustrative.",
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

export const popularSearches = ["Data science", "Process engineering", "Retail operations", "Product management"];

export type EvpPillar = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const evpPillars: EvpPillar[] = [
  {
    id: "scale",
    number: "01",
    title: "Scale that matters",
    description: "Work on products, infrastructure and services that operate at extraordinary scale.",
  },
  {
    id: "many-worlds",
    number: "02",
    title: "Many worlds. One career.",
    description:
      "Explore opportunities across businesses, technologies and industries as your career evolves.",
  },
  {
    id: "grow",
    number: "03",
    title: "Learn. Grow. Lead.",
    description: "Build capability through learning, mobility, mentorship and meaningful challenges.",
  },
  {
    id: "next",
    number: "04",
    title: "Build what's next.",
    description: "Work with teams solving challenges across digital, energy, retail and new energy.",
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
    id: "grow",
    number: "04",
    title: "Grow",
    description: "Join, settle in and keep building your career across Reliance.",
  },
];
