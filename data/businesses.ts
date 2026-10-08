import { images, type ImageAsset } from "./images";

export type BusinessId = "jio" | "retail" | "new-energy" | "o2c" | "oil-gas" | "media" | "corporate";

export type BusinessCardSize = "featured" | "medium" | "compact";

export type Business = {
  id: BusinessId;
  name: string;
  category: string;
  /** Short editorial line used on the featured card. */
  tagline: string;
  description: string;
  skills: string[];
  image: ImageAsset;
  /** Mock value for layout testing only — never render as a live vacancy count. */
  demoJobCount: number;
  size: BusinessCardSize;
};

export const businesses: Business[] = [
  {
    id: "jio",
    name: "Jio",
    category: "Digital & Technology",
    tagline: "Digital life, built for India.",
    description:
      "Build the networks, platforms and digital services that connect people, homes and enterprises across India.",
    skills: ["Software engineering", "Cloud & networks", "Data & AI", "Product", "Cybersecurity"],
    image: images.bizJio,
    demoJobCount: 120,
    size: "featured",
  },
  {
    id: "retail",
    name: "Reliance Retail",
    category: "Retail & Consumer",
    tagline: "Everyday commerce, reimagined.",
    description:
      "Shape how India shops — from neighbourhood stores and brands to supply chains and digital commerce.",
    skills: ["Store operations", "Category & buying", "Supply chain", "E-commerce", "Marketing"],
    image: images.bizRetail,
    demoJobCount: 90,
    size: "medium",
  },
  {
    id: "new-energy",
    name: "New Energy",
    category: "New Energy & Materials",
    tagline: "Clean energy, end to end.",
    description:
      "Help build an integrated clean-energy ecosystem spanning solar, storage, hydrogen and advanced materials.",
    skills: ["Electrochemistry", "Power systems", "Manufacturing", "Project engineering", "R&D"],
    image: images.bizNewEnergy,
    demoJobCount: 60,
    size: "medium",
  },
  {
    id: "o2c",
    name: "O2C",
    category: "Energy & Materials",
    tagline: "Molecules that move the world.",
    description:
      "Operate and improve complex oil-to-chemicals assets that turn feedstock into fuels, polymers and materials.",
    skills: ["Process engineering", "Reliability", "Operations", "Safety", "Digital plant"],
    image: images.bizO2C,
    demoJobCount: 75,
    size: "compact",
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    category: "Exploration & Production",
    tagline: "Energy from the ground up.",
    description:
      "Work on exploration and production — from subsurface insight to safe, efficient field operations.",
    skills: ["Geoscience", "Reservoir engineering", "Drilling", "Production", "HSE"],
    image: images.bizOilGas,
    demoJobCount: 30,
    size: "compact",
  },
  {
    id: "media",
    name: "Media & Entertainment",
    category: "Media & Entertainment",
    tagline: "Stories for every screen.",
    description:
      "Create and distribute stories, news and entertainment for audiences on every screen.",
    skills: ["Content & editorial", "Production", "Streaming tech", "Ad sales", "Audience insight"],
    image: images.bizMedia,
    demoJobCount: 25,
    size: "compact",
  },
  {
    id: "corporate",
    name: "Corporate Functions",
    category: "Business & Corporate",
    tagline: "The backbone of every business.",
    description:
      "Partner with every business through finance, strategy, people, legal, sustainability and more.",
    skills: ["Finance", "Strategy", "Human resources", "Legal", "Sustainability"],
    image: images.bizCorporate,
    demoJobCount: 40,
    size: "compact",
  },
];

export function getBusiness(id: BusinessId) {
  return businesses.find((business) => business.id === id);
}
