"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { revealVariants, stagger, withDelay, type RevealVariant } from "@/lib/motion";

/*
 * Reveals rely on <MotionConfig reducedMotion="user"> (see Providers): with
 * reduced motion, transforms (rise, zoom) are skipped and only opacity fades.
 */

const elements = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  figure: motion.figure,
} as const;

type ElementName = keyof typeof elements;

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

function trigger(immediate?: boolean) {
  return immediate ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  as?: ElementName;
  /** Animate on mount instead of when scrolled into view (above-the-fold content). */
  immediate?: boolean;
};

export function Reveal({ children, className, variant = "fadeUp", delay = 0, as = "div", immediate }: RevealProps) {
  const Element = elements[as];
  return (
    <Element
      className={className}
      initial="hidden"
      {...trigger(immediate)}
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
  as?: ElementName;
  interval?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const Element = elements[as];
  return (
    <Element className={className} initial="hidden" {...trigger(immediate)} variants={stagger(interval, delay)}>
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
  as?: ElementName;
  variant?: RevealVariant;
}) {
  const Element = elements[as];
  return (
    <Element className={className} variants={revealVariants[variant]}>
      {children}
    </Element>
  );
}

/**
 * One line of display type rising from behind a mask. Use inside a heading;
 * the masked span keeps descenders visible.
 */
export function RiseLine({
  children,
  className,
  delay = 0,
  immediate,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  return (
    <span className={cn("-mb-[0.12em] block overflow-hidden pb-[0.12em]", className)}>
      <motion.span
        className="block"
        initial="hidden"
        {...trigger(immediate)}
        variants={withDelay(revealVariants.lineRise, delay)}
      >
        {children}
      </motion.span>
    </span>
  );
}
