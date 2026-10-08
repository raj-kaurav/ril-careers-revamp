export const site = {
  name: "Reliance Careers",
  conceptLabel: "Reliance Careers — Variant 02 · Editorial concept",
  copyrightYear: 2026,
  legalEntity: "Reliance Industries Limited",
  prototypeNotice:
    "Design concept for review. Not an official RIL website; all roles, people, stories and figures are illustrative.",
  photoCredit: "Photography: Unsplash contributors — temporary prototype placeholders.",
} as const;

export type Chapter = {
  id: string;
  number: string;
  title: string;
};

/** Chapter order drives the menu overlay and the chapter markers on the page. */
export const chapters = [
  { id: "top", number: "01", title: "A manifesto" },
  { id: "worlds", number: "02", title: "Where could you go?" },
  { id: "people", number: "03", title: "The people" },
  { id: "moves", number: "04", title: "Careers move" },
  { id: "opportunities", number: "05", title: "What could you build?" },
  { id: "life", number: "06", title: "Big scale, personal work" },
  { id: "next-chapter", number: "07", title: "Your next chapter" },
] as const satisfies Chapter[];

export type ChapterId = (typeof chapters)[number]["id"];

export function chapter(id: ChapterId): Chapter {
  return chapters.find((item) => item.id === id) ?? chapters[0];
}
