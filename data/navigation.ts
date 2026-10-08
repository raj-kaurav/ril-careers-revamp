export type NavLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SocialPlatform = "linkedin" | "x" | "instagram" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  /** Placeholder — official RIL social URLs to be supplied. */
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Explore Careers", href: "#pathways" },
  { label: "Businesses", href: "#businesses" },
  { label: "Life at Reliance", href: "#life" },
  { label: "Students & Graduates", href: "#students" },
  { label: "How We Hire", href: "#how-we-hire" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Careers",
    links: [
      { label: "Find Jobs", href: "#opportunities" },
      { label: "Students & Graduates", href: "#students" },
      { label: "Experienced Professionals", href: "#professionals" },
      { label: "Leaders & Specialists", href: "#leaders" },
      { label: "Life at Reliance", href: "#life" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Businesses", href: "#businesses" },
      { label: "Culture", href: "#why-reliance" },
      { label: "Learning", href: "#why-reliance" },
      { label: "Diversity & Inclusion", href: "#why-reliance" },
      { label: "How We Hire", href: "#how-we-hire" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Candidate Help", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms of use", href: "#" },
  { label: "Cookie settings", href: "#" },
  { label: "Accessibility", href: "#" },
];

export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "x", label: "X", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
];
