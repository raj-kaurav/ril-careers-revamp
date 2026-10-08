import type { Transition, Variants } from "motion/react";

export const easeEditorial = [0.19, 1, 0.22, 1] as const;

export const durations = {
  fast: 0.2,
  base: 0.45,
  slow: 0.9,
} as const;

const baseTransition: Transition = { duration: durations.slow, ease: easeEditorial };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: easeEditorial } },
};

/** Text rises from behind a mask — pair with an `overflow-hidden` parent. */
export const lineRise: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: easeEditorial } },
};

/** Photograph settles from a slight zoom as it enters. */
export const imageSettle: Variants = {
  hidden: { scale: 1.12, opacity: 0.4 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.6, ease: easeEditorial } },
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

export const revealVariants = { fadeUp, fade, lineRise, imageSettle } as const;
export type RevealVariant = keyof typeof revealVariants;
