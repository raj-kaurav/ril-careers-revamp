import type { WorldId } from "./worlds";

/**
 * Demo opportunities for the homepage concept. These are NOT live RIL
 * vacancies; the real list will come from the ATS / jobs service.
 */
export type DemoJob = {
  id: string;
  title: string;
  worldId: WorldId;
  /** Business label shown alongside the role, e.g. "Jio". */
  business: string;
  location: string;
  experience: string;
  summary: string;
  skills: string[];
  isDemo: true;
};

export const demoJobs: DemoJob[] = [
  {
    id: "demo-senior-software-engineer",
    title: "Senior Software Engineer",
    worldId: "technology",
    business: "Jio",
    location: "Bengaluru",
    experience: "5–8 years",
    summary: "Design and scale backend services for consumer platforms used across the country.",
    skills: ["Java", "Distributed systems", "Kubernetes"],
    isDemo: true,
  },
  {
    id: "demo-product-manager",
    title: "Product Manager",
    worldId: "retail",
    business: "Retail",
    location: "Mumbai",
    experience: "4–7 years",
    summary: "Own discovery-to-delivery for digital journeys that connect stores and online shoppers.",
    skills: ["Product strategy", "Experimentation", "Analytics"],
    isDemo: true,
  },
  {
    id: "demo-energy-systems-engineer",
    title: "Energy Systems Engineer",
    worldId: "new-energy",
    business: "New Energy",
    location: "Jamnagar",
    experience: "3–6 years",
    summary: "Model and integrate solar, storage and grid systems for a large clean-energy complex.",
    skills: ["Power systems", "Simulation", "Grid integration"],
    isDemo: true,
  },
  {
    id: "demo-ux-designer",
    title: "UX Designer",
    worldId: "technology",
    business: "Digital",
    location: "Mumbai",
    experience: "3–5 years",
    summary: "Shape everyday digital experiences, from research and flows to polished interfaces.",
    skills: ["Interaction design", "Research", "Prototyping"],
    isDemo: true,
  },
  {
    id: "demo-process-engineer",
    title: "Process Engineer",
    worldId: "energy",
    business: "Oil to chemicals",
    location: "Jamnagar",
    experience: "3–6 years",
    summary: "Optimise unit performance, energy efficiency and safety across large processing assets.",
    skills: ["Process simulation", "HAZOP", "Optimisation"],
    isDemo: true,
  },
  {
    id: "demo-category-manager",
    title: "Category Manager, Fashion",
    worldId: "retail",
    business: "Retail",
    location: "Bengaluru",
    experience: "5–8 years",
    summary: "Build assortments, partner with brands and grow a category across stores and online.",
    skills: ["Buying", "Merchandising", "Negotiation"],
    isDemo: true,
  },
  {
    id: "demo-video-producer",
    title: "Senior Video Producer",
    worldId: "media",
    business: "Media",
    location: "Mumbai",
    experience: "4–7 years",
    summary: "Lead shoots and edits for original formats across broadcast and streaming.",
    skills: ["Production", "Storytelling", "Post-production"],
    isDemo: true,
  },
  {
    id: "demo-sustainability-analyst",
    title: "Sustainability Analyst",
    worldId: "corporate",
    business: "Group functions",
    location: "Navi Mumbai",
    experience: "2–4 years",
    summary: "Measure, report and improve environmental performance across the group's businesses.",
    skills: ["ESG reporting", "Data analysis", "Carbon accounting"],
    isDemo: true,
  },
];

export const searchSuggestions = ["Data", "Product", "Jamnagar", "Design"];
