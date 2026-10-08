import { images, type ImageAsset } from "./images";

export type WorldId = "technology" | "energy" | "retail" | "new-energy" | "media" | "corporate";

export type WorldAccent = "sky" | "saffron" | "terracotta" | "leaf" | "ivory";

/**
 * Career "worlds" — the Reliance ecosystem presented as places a career can
 * go, rather than as a business directory.
 */
export type World = {
  id: WorldId;
  number: string;
  name: string;
  /** Businesses the world maps to, shown as editorial metadata. */
  businesses: string;
  line: string;
  description: string;
  disciplines: string[];
  places: string;
  accent: WorldAccent;
  image: ImageAsset;
};

export const worlds: World[] = [
  {
    id: "technology",
    number: "01",
    name: "Technology",
    businesses: "Jio Platforms · Digital services",
    line: "Build the systems millions of people rely on.",
    description:
      "Networks, cloud, platforms and apps that serve homes, enterprises and entire cities — engineered for national scale from day one.",
    disciplines: ["Software engineering", "Cloud & networks", "Data & AI", "Cybersecurity", "Product"],
    places: "Navi Mumbai · Bengaluru · Hyderabad",
    accent: "sky",
    image: images.developer,
  },
  {
    id: "energy",
    number: "02",
    name: "Energy",
    businesses: "Oil to chemicals · Exploration & production",
    line: "Run some of the most complex assets anywhere.",
    description:
      "Refining, petrochemicals and upstream operations where precision, safety and reliability are everyday craft.",
    disciplines: ["Process engineering", "Reliability", "Operations", "Safety", "Geoscience"],
    places: "Jamnagar · Hazira · Kakinada",
    accent: "saffron",
    image: images.welding,
  },
  {
    id: "retail",
    number: "03",
    name: "Retail",
    businesses: "Reliance Retail · Consumer brands",
    line: "Shape how India shops, lives and connects.",
    description:
      "Neighbourhood stores, brands, supply chains and digital commerce — retail at a scale that reaches every corner of the country.",
    disciplines: ["Store operations", "Category & buying", "Supply chain", "E-commerce", "Marketing"],
    places: "Mumbai · Bengaluru · across India",
    accent: "terracotta",
    image: images.nightMarket,
  },
  {
    id: "new-energy",
    number: "04",
    name: "New Energy",
    businesses: "Solar · Storage · Hydrogen · Materials",
    line: "Work on what comes next.",
    description:
      "An integrated clean-energy ecosystem being built end to end — from cells and modules to storage, electrolysers and green chemistry.",
    disciplines: ["Electrochemistry", "Power systems", "Manufacturing", "Project engineering", "R&D"],
    places: "Jamnagar · Navi Mumbai",
    accent: "leaf",
    image: images.solarAerial,
  },
  {
    id: "media",
    number: "05",
    name: "Media",
    businesses: "Media & entertainment",
    line: "Tell stories for every screen in India.",
    description:
      "News, entertainment, sport and streaming — the craft of making stories and the technology that carries them.",
    disciplines: ["Content & editorial", "Production", "Streaming tech", "Ad sales", "Audience insight"],
    places: "Mumbai · Delhi",
    accent: "terracotta",
    image: images.studioPortrait,
  },
  {
    id: "corporate",
    number: "06",
    name: "Corporate",
    businesses: "Group functions",
    line: "Be the backbone behind every business.",
    description:
      "Finance, strategy, people, legal and sustainability teams that partner with every world in the group.",
    disciplines: ["Finance", "Strategy", "Human resources", "Legal", "Sustainability"],
    places: "Mumbai · Navi Mumbai",
    accent: "ivory",
    image: images.teamMeeting,
  },
];

export function getWorld(id: WorldId) {
  return worlds.find((world) => world.id === id);
}

export function isWorldId(value: string | null | undefined): value is WorldId {
  return worlds.some((world) => world.id === value);
}
