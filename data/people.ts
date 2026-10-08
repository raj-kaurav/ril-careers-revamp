import { images, type ImageAsset } from "./images";

/**
 * Illustrative people only. Names, roles and words are fictional and do not
 * represent real RIL employees; replace with approved employee stories.
 */
export type PersonStory = {
  id: string;
  name: string;
  role: string;
  world: string;
  /** "I started in…" — the beginning of the story. */
  started: string;
  /** "…and today I'm" — where it has led. */
  today: string;
  image?: ImageAsset;
  isIllustrative: true;
};

export const leadStory: PersonStory = {
  id: "ananya",
  name: "Ananya Rao",
  role: "Product Lead, Digital Platforms",
  world: "Technology · Navi Mumbai",
  started: "I started in network operations, watching dashboards at 3 a.m.",
  today: "Today I lead product for a platform that millions of families open every morning.",
  image: images.portraitAnanya,
  isIllustrative: true,
};

export const leadStoryDetail = {
  joined: "Joined 2015",
  moves: "3 roles · 2 worlds",
  note: "“Nobody handed me a ladder. They handed me problems that kept getting bigger.”",
};

export const interruptions: PersonStory[] = [
  {
    id: "karan",
    name: "Karan Mehta",
    role: "Project Engineer",
    world: "New Energy · Jamnagar",
    started: "My first site was a refinery.",
    today: "My second is a factory that didn't exist when I joined.",
    image: images.solarEngineer,
    isIllustrative: true,
  },
  {
    id: "meera",
    name: "Meera Iyer",
    role: "Category Manager",
    world: "Retail · Bengaluru",
    started: "I moved from finance to fashion buying.",
    today: "Nobody told me I had to pick one.",
    isIllustrative: true,
  },
  {
    id: "rohan",
    name: "Rohan Desai",
    role: "Graduate Engineer Trainee",
    world: "Energy · Class of 2025",
    started: "Day one, I was handed a hard hat and a mentor.",
    today: "Day ninety, I presented my first fix to the plant head.",
    image: images.graduate,
    isIllustrative: true,
  },
];
