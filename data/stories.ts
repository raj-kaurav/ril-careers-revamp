import type { BusinessId } from "./businesses";
import { images, type ImageAsset } from "./images";

/**
 * Illustrative stories only. The roles and quotes are fictional and do not
 * represent real RIL employees; replace with approved employee stories.
 */
export type EmployeeStory = {
  id: string;
  theme: string;
  headline: string;
  businessId: BusinessId;
  role: string;
  quote: string;
  image: ImageAsset;
  featured?: boolean;
  isIllustrative: true;
};

export const stories: EmployeeStory[] = [
  {
    id: "story-new-energy",
    theme: "New Energy",
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
    id: "story-technology",
    theme: "Technology",
    headline: "Building digital experiences at scale.",
    businessId: "jio",
    role: "Platform Engineer",
    quote:
      "Every release reaches people across the country. That changes how carefully — and how ambitiously — you build.",
    image: images.storyTechnology,
    isIllustrative: true,
  },
  {
    id: "story-engineering",
    theme: "Engineering",
    headline: "Solving complex problems in the physical world.",
    businessId: "o2c",
    role: "Reliability Engineer",
    quote:
      "My work lives in pumps, pipes and control rooms. When a fix holds, you can see the difference on the plant floor.",
    image: images.storyEngineering,
    isIllustrative: true,
  },
];
