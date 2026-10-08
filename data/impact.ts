import { images, type ImageAsset } from "./images";

/**
 * "Life at Reliance" told as a strip of moments rather than a benefits grid.
 * Copy is indicative and must be confirmed against real programmes.
 */
export type ImpactMoment = {
  id: string;
  theme: string;
  statement: string;
  detail: string;
  image: ImageAsset;
  /** Controls the frame proportion so the strip has rhythm. */
  shape: "tall" | "wide" | "square";
};

export const impactMoments: ImpactMoment[] = [
  {
    id: "people",
    theme: "People",
    statement: "Colleagues who become your toughest critics and best advocates.",
    detail: "Teams that mix disciplines, generations and businesses.",
    image: images.students,
    shape: "wide",
  },
  {
    id: "learning",
    theme: "Learning",
    statement: "You'll learn more in a year than you planned to in five.",
    detail: "Mentors, academies and stretch assignments across worlds.",
    image: images.stepsLaptop,
    shape: "tall",
  },
  {
    id: "wellbeing",
    theme: "Wellbeing",
    statement: "Big ambitions work better with room to breathe.",
    detail: "Support for health, family and the life around your work.",
    image: images.wellbeing,
    shape: "wide",
  },
  {
    id: "inclusion",
    theme: "Inclusion",
    statement: "Every voice in the room changes what the room can build.",
    detail: "Networks, forums and programmes that open doors wider.",
    image: images.forumSpeaker,
    shape: "square",
  },
  {
    id: "impact",
    theme: "Impact",
    statement: "Work you can point to from a train window.",
    detail: "Plants, networks and stores that people use every day.",
    image: images.refineryBlueHour,
    shape: "tall",
  },
];
