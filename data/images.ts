/**
 * Central image registry for Variant 02.
 *
 * All photography is temporary prototype imagery (Unsplash licence), stored
 * locally in /public/v2. Replace `src`/`alt` here with approved RIL assets;
 * components only reference these keys.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  /** Focal point used for object-position on responsive crops. */
  focus?: string;
  source: "prototype-placeholder" | "approved";
};

function placeholder(file: string, alt: string, focus = "50% 50%"): ImageAsset {
  return { src: `/v2/${file}`, alt, focus, source: "prototype-placeholder" };
}

export const images = {
  siteAerial: placeholder(
    "site-aerial.jpg",
    "Seen from above, a team of engineers in hard hats stands on a vast construction deck, long shadows behind them",
    "52% 70%",
  ),
  refineryBlueHour: placeholder(
    "refinery-blue-hour.jpg",
    "An industrial plant glows under a deep blue evening sky",
    "78% 58%",
  ),
  seaLink: placeholder("sea-link.jpg", "A cable-stayed sea bridge stretches across calm water towards the Mumbai skyline", "45% 55%"),
  railTunnel: placeholder(
    "rail-tunnel.jpg",
    "An engineer in a high-visibility vest inspects a newly built rail tunnel",
    "80% 60%",
  ),

  developer: placeholder("developer.jpg", "A software engineer concentrates at his laptop", "42% 40%"),
  welding: placeholder("welding.jpg", "Sparks fly as a technician welds steel in a workshop", "45% 50%"),
  nightMarket: placeholder(
    "night-market.jpg",
    "A busy evening market in Ahmedabad lit by strings of lights, stalls piled high with produce",
    "50% 55%",
  ),
  solarAerial: placeholder("solar-aerial.jpg", "Rows of solar panels stretch across open land, seen from above", "50% 50%"),
  studioPortrait: placeholder(
    "studio-portrait.jpg",
    "A woman in a silk saree poses for a studio shoot against a curtain of warm lights",
    "50% 30%",
  ),
  teamMeeting: placeholder(
    "team-meeting.jpg",
    "A team applauds a colleague presenting in a bright, graphic meeting room",
    "62% 40%",
  ),

  portraitAnanya: placeholder("portrait-ananya.jpg", "Portrait of a smiling woman in a blue kurta", "50% 30%"),
  solarEngineer: placeholder(
    "solar-engineer.jpg",
    "A project engineer in a hard hat and high-visibility vest looks out across a solar plant under construction",
    "62% 45%",
  ),
  graduate: placeholder("graduate.jpg", "A smiling graduate in a cap and gown", "58% 35%"),
  wellbeing: placeholder(
    "wellbeing-udaipur.jpg",
    "A man in white kurta pyjama holds a yoga pose on a lakeside terrace in Udaipur at sunrise",
    "62% 50%",
  ),
  students: placeholder("students.jpg", "Two students look through notes together", "50% 40%"),
  stepsLaptop: placeholder(
    "steps-laptop.jpg",
    "A young man smiles while working on his laptop, sitting on red stone steps",
    "50% 35%",
  ),
  forumSpeaker: placeholder(
    "forum-speaker.jpg",
    "A woman stands to speak into a microphone at a crowded women's forum",
    "58% 35%",
  ),
  mumbaiDusk: placeholder(
    "mumbai-dusk.jpg",
    "Marine Drive in Mumbai at dusk, the curve of city lights reflected in the sea",
    "35% 55%",
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
