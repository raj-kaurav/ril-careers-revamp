import type { BusinessId } from "./businesses";
import { images, type ImageAsset } from "./images";

/**
 * Illustrative stories only. The roles and quotes are fictional and do not
 * represent real RIL employees; replace with approved employee stories.
 */

/** What a story is about, independent of business — lets the homepage sample a spread of experiences. */
export type StoryTopic =
  | "engineering"
  | "operations"
  | "technology"
  | "research"
  | "customer"
  | "leadership"
  | "learning-growth"
  | "inclusion"
  | "community-impact";

export type EmployeeStory = {
  id: string;
  /** Eyebrow label shown above the headline. */
  theme: string;
  topic: StoryTopic;
  headline: string;
  businessId: BusinessId;
  role: string;
  quote: string;
  image: ImageAsset;
  /** Full story page, once Life at Reliance exists. Until then "View story" opens a dialog. */
  url?: string;
  featured?: boolean;
  isIllustrative: true;
};

export const stories: EmployeeStory[] = [
  {
    id: "story-new-energy",
    theme: "New Energy",
    topic: "research",
    headline: "Working on technologies shaping tomorrow.",
    businessId: "new-energy",
    role: "Research Scientist, Energy Storage",
    quote:
      "We're building capabilities that didn't exist here a few years ago. The learning curve is steep — and that's exactly the point.",
    image: images.storyNewEnergy,
    featured: true,
    isIllustrative: true,
  },
  {
    id: "story-engineering",
    theme: "Engineering",
    topic: "engineering",
    headline: "Solving complex problems in the physical world.",
    businessId: "o2c",
    role: "Reliability Engineer",
    quote:
      "My work lives in pumps, pipes and control rooms. When a fix holds, you can see the difference on the plant floor.",
    image: images.storyEngineering,
    isIllustrative: true,
  },
  {
    id: "story-learning",
    theme: "Learning & growth",
    topic: "learning-growth",
    headline: "Growing a career across many businesses.",
    businessId: "corporate",
    role: "Finance Business Partner",
    quote:
      "In four years I've partnered with retail, energy and digital teams. Each move taught me a new business — without changing companies.",
    image: images.evpCollaboration,
    isIllustrative: true,
  },
];
