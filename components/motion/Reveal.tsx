"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealVariants, stagger, withDelay, type RevealVariant } from "@/lib/motion";

const elements = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  as?: keyof typeof elements;
  /** Animate on mount instead of when scrolled into view (above-the-fold content). */
  immediate?: boolean;
};

export function Reveal({ children, className, variant = "fadeUp", delay = 0, as = "div", immediate }: RevealProps) {
  const Element = elements[as];
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Element
      className={className}
      initial="hidden"
      {...trigger}
      variants={withDelay(revealVariants[variant], delay)}
    >
      {children}
    </Element>
  );
}

/** Parent that staggers any <RevealItem> children as they enter the viewport. */
export function RevealGroup({
  children,
  className,
  as = "div",
  interval = 0.08,
  delay = 0,
  immediate,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof elements;
  interval?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const Element = elements[as];
  const trigger = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "0px 0px -12% 0px" } };
  return (
    <Element className={className} initial="hidden" {...trigger} variants={stagger(interval, delay)}>
      {children}
    </Element>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof elements;
  variant?: RevealVariant;
}) {
  const Element = elements[as];
  return (
    <Element className={className} variants={revealVariants[variant]}>
      {children}
    </Element>
  );
}
