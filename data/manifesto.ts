import { images, type ImageAsset } from "./images";

/**
 * The opening manifesto cycles through a handful of possible futures. Each
 * future swaps the verb in the headline and the photograph beside it.
 */
export type Future = {
  id: string;
  verb: string;
  world: string;
  caption: string;
  image: ImageAsset;
};

export const futures: Future[] = [
  {
    id: "build",
    verb: "build",
    world: "Infrastructure",
    caption: "Site engineering teams shaping the ground plan of a new campus.",
    image: images.siteAerial,
  },
  {
    id: "power",
    verb: "power",
    world: "Energy",
    caption: "Operations that run through the night, every night.",
    image: images.refineryBlueHour,
  },
  {
    id: "connect",
    verb: "connect",
    world: "Digital & networks",
    caption: "Networks and platforms that link a city — and a country.",
    image: images.seaLink,
  },
  {
    id: "move",
    verb: "move",
    world: "Engineering",
    caption: "Projects where the work is measured in kilometres and decades.",
    image: images.railTunnel,
  },
];

export const manifestoCopy = {
  staticHeadline: "There is more than one way to build the future.",
  intro:
    "Energy, technology, retail, new energy, media and the teams behind them. One group, many directions — and a career that can move between them.",
};
