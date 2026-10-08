import { images, type ImageAsset } from "./images";

export type PathwayId = "students" | "professionals" | "leaders";

export type Pathway = {
  id: PathwayId;
  label: string;
  /** Short line shown under the tab label. */
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
    label: "Students & Graduates",
    descriptor: "Programmes, internships, first roles",
    title: "Start with possibility.",
    description:
      "Build your foundation through graduate programmes, internships and early-career opportunities.",
    features: ["Graduate programmes", "Internships", "Early-career roles"],
    cta: { label: "Explore student opportunities", href: "#opportunities" },
    image: images.pathStudents,
  },
  {
    id: "professionals",
    label: "Experienced Professionals",
    descriptor: "Deepen your craft at scale",
    title: "Bring your expertise to scale.",
    description:
      "Take on complex, high-impact work across businesses that operate at national scale — and keep growing as they do.",
    features: ["Technology", "Engineering", "Operations", "Finance", "Marketing", "Digital"],
    cta: { label: "Explore professional roles", href: "#opportunities" },
    image: images.pathExperienced,
  },
  {
    id: "leaders",
    label: "Leaders & Specialists",
    descriptor: "Lead transformation and new ventures",
    title: "Shape what's next.",
    description:
      "Lead transformation, build new capabilities and guide the teams shaping the next chapter of Reliance.",
    features: ["Business leadership", "Transformation", "R&D", "AI & technology", "New energy", "Strategy"],
    cta: { label: "Explore leadership opportunities", href: "#opportunities" },
    image: images.pathLeaders,
  },
];

export const defaultPathwayId: PathwayId = "students";

export function isPathwayId(value: string): value is PathwayId {
  return pathways.some((pathway) => pathway.id === value);
}
