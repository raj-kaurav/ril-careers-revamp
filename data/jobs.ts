import type { BusinessId } from "./businesses";

/**
 * Demo opportunities for the homepage concept. These are NOT live RIL
 * vacancies; the real list will come from the ATS / jobs service.
 */
export type DemoJob = {
  id: string;
  title: string;
  businessId: BusinessId;
  location: string;
  experience: string;
  employmentType: "Full-time" | "Internship" | "Contract";
  summary: string;
  skills: string[];
  isDemo: true;
};

export const featuredJobs: DemoJob[] = [
  {
    id: "demo-senior-software-engineer",
    title: "Senior Software Engineer",
    businessId: "jio",
    location: "Navi Mumbai, Maharashtra",
    experience: "5–8 years",
    employmentType: "Full-time",
    summary:
      "Design and scale backend services for consumer digital platforms used across the country.",
    skills: ["Java", "Distributed systems", "Kubernetes"],
    isDemo: true,
  },
  {
    id: "demo-product-manager-digital",
    title: "Product Manager — Digital",
    businessId: "retail",
    location: "Bengaluru, Karnataka",
    experience: "4–7 years",
    employmentType: "Full-time",
    summary:
      "Own discovery-to-delivery for digital commerce journeys that connect stores and online shoppers.",
    skills: ["Product strategy", "Experimentation", "Analytics"],
    isDemo: true,
  },
  {
    id: "demo-process-engineer",
    title: "Process Engineer",
    businessId: "o2c",
    location: "Jamnagar, Gujarat",
    experience: "3–6 years",
    employmentType: "Full-time",
    summary:
      "Optimise unit performance, energy efficiency and safety across large-scale processing assets.",
    skills: ["Process simulation", "HAZOP", "Optimisation"],
    isDemo: true,
  },
  {
    id: "demo-data-scientist",
    title: "Data Scientist",
    businessId: "new-energy",
    location: "Navi Mumbai, Maharashtra",
    experience: "2–5 years",
    employmentType: "Full-time",
    summary:
      "Build forecasting and optimisation models for solar, storage and manufacturing operations.",
    skills: ["Python", "Machine learning", "Forecasting"],
    isDemo: true,
  },
];
