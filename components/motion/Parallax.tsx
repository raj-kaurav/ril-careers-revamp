"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Drifts its child vertically while the frame crosses the viewport. The child
 * is over-sized so the drift never exposes an edge. Off for reduced motion.
 */
export function Parallax({
  children,
  className,
  distance = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Total drift as a percentage of the frame height. */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance / 2}%`, `${distance / 2}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${distance / 2}%`,
          bottom: `-${distance / 2}%`,
          y: reduce ? 0 : y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
