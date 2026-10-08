import type { Transition, Variants } from "motion/react";

export const easePremium = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.18,
  base: 0.32,
  slow: 0.7,
} as const;

const baseTransition: Transition = { duration: durations.slow, ease: easePremium };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
};

export const imageScale: Variants = {
  hidden: { scale: 1.06 },
  visible: { scale: 1, transition: { duration: 1.4, ease: easePremium } },
};

export function stagger(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export function withDelay(variants: Variants, delay: number): Variants {
  if (!delay) return variants;
  const visible = variants.visible;
  if (!visible || typeof visible === "function") return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
}

export const hoverLift = { y: -4, transition: { duration: durations.base, ease: easePremium } };

export const revealVariants = { fadeUp, fade, sectionReveal, imageScale } as const;
export type RevealVariant = keyof typeof revealVariants;
