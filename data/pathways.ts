import { jobsHref } from "@/lib/job-search";
import { images, type ImageAsset } from "./images";
import type { CareerStage } from "./jobs";

export type PathwayId = "students" | "professionals" | "leaders";

export type Pathway = {
  id: PathwayId;
  careerStage: CareerStage;
  label: string;
  /** Short line shown under the selector label. */
  descriptor: string;
  title: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  image: ImageAsset;
};

export const pathways: Pathway[] = [
  {
    id: "students",
    careerStage: "student",
    label: "Students & Graduates",
    descriptor: "Internships, programmes and first roles",
    title: "Start with possibility.",
    description: "Build your foundation through graduate programmes, internships and early-career roles.",
    features: ["Graduate programmes", "Internships", "Structured rotations", "Mentorship"],
    cta: { label: "Explore early-career roles", href: jobsHref({ careerStage: "student" }) },
    image: images.pathStudents,
  },
  {
    id: "professionals",
    careerStage: "experienced",
    label: "Experienced Professionals",
    descriptor: "Deepen your craft at scale",
    title: "Bring your expertise to scale.",
    description: "Take on complex, high-impact work in businesses that operate at national scale.",
    features: ["Technology", "Engineering", "Operations", "Product", "Finance"],
    cta: { label: "Explore professional roles", href: jobsHref({ careerStage: "experienced" }) },
    image: images.pathExperienced,
  },
  {
    id: "leaders",
    careerStage: "leadership",
    label: "Leaders & Specialists",
    descriptor: "Lead transformation and new ventures",
    title: "Shape what's next.",
    description: "Lead transformation, build new capabilities and guide the teams shaping Reliance's next chapter.",
    features: ["Business leadership", "Transformation", "AI & technology", "New energy"],
    cta: { label: "Explore leadership roles", href: jobsHref({ careerStage: "leadership" }) },
    image: images.pathLeaders,
  },
];

export const defaultPathwayId: PathwayId = "students";

export function isPathwayId(value: string): value is PathwayId {
  return pathways.some((pathway) => pathway.id === value);
}
