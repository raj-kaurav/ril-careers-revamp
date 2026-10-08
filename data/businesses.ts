import { images, type ImageAsset } from "./images";

export type BusinessId = "jio" | "retail" | "new-energy" | "o2c" | "oil-gas" | "media" | "corporate";

export type Business = {
  id: BusinessId;
  name: string;
  category: string;
  /** One-line statement shown in the Business Explorer canvas. */
  shortDescription: string;
  /** Longer description used on job detail pages ("About the business"). */
  description: string;
  /** Four headline capability areas shown as tags. */
  capabilities: string[];
  image: ImageAsset;
  cta: { label: string };
};

export const businesses: Business[] = [
  {
    id: "jio",
    name: "Jio",
    category: "Digital & Technology",
    shortDescription: "Connecting people, businesses and possibilities through digital platforms and technology.",
    description:
      "Build the networks, platforms and digital services that connect people, homes and enterprises across India.",
    capabilities: ["Digital", "AI & Data", "Product", "Engineering"],
    image: images.bizJio,
    cta: { label: "Explore Jio opportunities" },
  },
  {
    id: "retail",
    name: "Reliance Retail",
    category: "Retail & Consumer",
    shortDescription: "Shaping how India shops, from neighbourhood stores and brands to digital commerce.",
    description:
      "Shape how India shops — from neighbourhood stores and brands to supply chains and digital commerce.",
    capabilities: ["Store operations", "Supply chain", "E-commerce", "Brand & marketing"],
    image: images.bizRetail,
    cta: { label: "Explore Retail opportunities" },
  },
  {
    id: "new-energy",
    name: "New Energy",
    category: "New Energy & Materials",
    shortDescription: "Building an integrated clean-energy ecosystem, from solar and storage to hydrogen.",
    description:
      "Help build an integrated clean-energy ecosystem spanning solar, storage, hydrogen and advanced materials.",
    capabilities: ["Power systems", "Electrochemistry", "Manufacturing", "R&D"],
    image: images.bizNewEnergy,
    cta: { label: "Explore New Energy opportunities" },
  },
  {
    id: "o2c",
    name: "O2C",
    category: "Oil to Chemicals",
    shortDescription: "Turning feedstock into the fuels, polymers and materials that everyday life depends on.",
    description:
      "Operate and improve complex oil-to-chemicals assets that turn feedstock into fuels, polymers and materials.",
    capabilities: ["Process engineering", "Reliability", "Operations", "Digital plant"],
    image: images.bizO2C,
    cta: { label: "Explore O2C opportunities" },
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    category: "Exploration & Production",
    shortDescription: "Unlocking energy safely, from subsurface insight to efficient field operations.",
    description:
      "Work on exploration and production — from subsurface insight to safe, efficient field operations.",
    capabilities: ["Geoscience", "Reservoir engineering", "Drilling", "HSE"],
    image: images.bizOilGas,
    cta: { label: "Explore Oil & Gas opportunities" },
  },
  {
    id: "media",
    name: "Media & Entertainment",
    category: "Media & Entertainment",
    shortDescription: "Creating stories, news and entertainment for audiences on every screen.",
    description: "Create and distribute stories, news and entertainment for audiences on every screen.",
    capabilities: ["Content", "Production", "Streaming tech", "Audience insight"],
    image: images.bizMedia,
    cta: { label: "Explore Media opportunities" },
  },
  {
    id: "corporate",
    name: "Corporate Functions",
    category: "Business & Corporate",
    shortDescription: "Partnering with every business through finance, strategy, people and sustainability.",
    description:
      "Partner with every business through finance, strategy, people, legal, sustainability and more.",
    capabilities: ["Finance", "Strategy", "People", "Sustainability"],
    image: images.bizCorporate,
    cta: { label: "Explore Corporate opportunities" },
  },
];

export function getBusiness(id: BusinessId) {
  return businesses.find((business) => business.id === id);
}

export function isBusinessId(value: string | null | undefined): value is BusinessId {
  return businesses.some((business) => business.id === value);
}
