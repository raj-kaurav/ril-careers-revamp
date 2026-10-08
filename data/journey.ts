/**
 * One illustrative, cross-business career used to make mobility tangible.
 * Fictional — not a real employee's history.
 */
export type JourneyTheme = "Scale" | "Learning" | "Mobility" | "Impact" | "Leadership";

export type JourneyStop = {
  id: string;
  year: string;
  world: string;
  role: string;
  place: string;
  theme: JourneyTheme;
  note: string;
};

export const journeyPerson = {
  name: "Priya",
  label: "One illustrative career · five chapters",
};

export const journey: JourneyStop[] = [
  {
    id: "technology",
    year: "2013",
    world: "Technology",
    role: "Network engineer",
    place: "Navi Mumbai",
    theme: "Scale",
    note: "Her first release reached a city. Her fifth reached a country.",
  },
  {
    id: "product",
    year: "2016",
    world: "Product",
    role: "Product manager, digital commerce",
    place: "Navi Mumbai",
    theme: "Learning",
    note: "From code to customers — with a mentor and a year of on-the-job programmes.",
  },
  {
    id: "retail",
    year: "2019",
    world: "Retail",
    role: "Head of store technology",
    place: "Bengaluru",
    theme: "Mobility",
    note: "An internal move into a new world. No resignation letter required.",
  },
  {
    id: "new-energy",
    year: "2022",
    world: "New Energy",
    role: "Programme lead, factory systems",
    place: "Jamnagar",
    theme: "Impact",
    note: "Digital systems for a clean-energy complex still being built.",
  },
  {
    id: "leadership",
    year: "2026",
    world: "Leadership",
    role: "Business head",
    place: "Wherever she chooses next",
    theme: "Leadership",
    note: "Five chapters, four cities, one employer — and the next move is hers.",
  },
];
