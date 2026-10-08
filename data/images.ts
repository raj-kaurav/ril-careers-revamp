/**
 * Central image registry.
 *
 * All photography is temporary prototype imagery (Unsplash licence), stored
 * locally in /public/images. Replace `src`/`alt` here with approved RIL assets;
 * components only reference these keys.
 */
export type ImageAsset = {
  src: string;
  alt: string;
  /** Focal point used for object-position on responsive crops. */
  focus?: string;
  source: "prototype-placeholder" | "approved";
};

function placeholder(file: string, alt: string, focus?: string): ImageAsset {
  return { src: `/images/${file}`, alt, focus, source: "prototype-placeholder" };
}

export const images = {
  heroScientist: placeholder(
    "hero-scientist.jpg",
    "A researcher in safety glasses studies a sample in a bright laboratory",
    "68% 45%",
  ),
  heroSiteAerial: placeholder(
    "hero-site-aerial.jpg",
    "Aerial view of an engineering team in hard hats on a large construction site",
    "55% 62%",
  ),
  heroOffshoreWind: placeholder(
    "hero-offshore-wind.jpg",
    "Offshore wind turbines standing in calm blue water",
    "55% 50%",
  ),

  bizJio: placeholder(
    "biz-jio.jpg",
    "A technologist walks between illuminated server racks in a data centre",
    "60% 50%",
  ),
  bizRetail: placeholder(
    "biz-retail.jpg",
    "A store associate assists a customer at a modern retail checkout",
    "55% 40%",
  ),
  bizNewEnergy: placeholder(
    "biz-new-energy.jpg",
    "Rows of solar panels stretching across green fields, seen from above",
  ),
  bizO2C: placeholder("biz-o2c.jpg", "Pipework and equipment inside an industrial processing facility"),
  bizOilGas: placeholder("biz-oil-gas-field.jpg", "Sparks fly as a field technician works with a grinding tool"),
  bizMedia: placeholder(
    "biz-media.jpg",
    "People silhouetted against a wall of illuminated media screens",
  ),
  bizCorporate: placeholder(
    "biz-corporate.jpg",
    "Colleagues collaborate around a table with laptops in a bright office",
    "50% 40%",
  ),

  pathStudents: placeholder(
    "path-students.jpg",
    "Graduates in gowns throw their caps into the air outside a university building",
    "50% 35%",
  ),
  pathExperienced: placeholder(
    "path-experienced.jpg",
    "An engineer programs a robotic arm in a technology lab",
    "40% 50%",
  ),
  pathLeaders: placeholder(
    "path-leaders.jpg",
    "A leader presents ideas to colleagues in a glass-walled meeting room",
    "50% 35%",
  ),

  evpCollaboration: placeholder(
    "evp-team.jpg",
    "Two colleagues review work together on a laptop",
    "50% 50%",
  ),
  evpLab: placeholder(
    "evp-lab.jpg",
    "Two researchers discuss results at a laboratory bench",
    "40% 50%",
  ),

  storyTechnology: placeholder(
    "story-technology.jpg",
    "A software professional works on a laptop in a plant-filled workspace",
    "55% 40%",
  ),
  storyEngineering: placeholder(
    "story-engineering.jpg",
    "An engineer in a hard hat and gloves inspects electrical equipment",
    "40% 40%",
  ),
  storyNewEnergy: placeholder(
    "story-new-energy.jpg",
    "A scientist in a lab coat works at a research bench",
    "50% 35%",
  ),

  ctaMumbai: placeholder(
    "cta-mumbai.jpg",
    "Mumbai's Marine Drive skyline along the Arabian Sea",
  ),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
