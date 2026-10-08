export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Explore", href: "#worlds" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Life", href: "#life" },
  { label: "About", href: "#about" },
];

export const footerLinks: NavLink[] = [
  { label: "Students & graduates", href: "#opportunities" },
  { label: "Experienced professionals", href: "#opportunities" },
  { label: "Career worlds", href: "#worlds" },
  { label: "Life at Reliance", href: "#life" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms of use", href: "#" },
  { label: "Cookie settings", href: "#" },
  { label: "Accessibility", href: "#" },
];

export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "X", href: "#" },
];
