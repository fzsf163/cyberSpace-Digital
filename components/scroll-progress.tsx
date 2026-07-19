"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin page-scroll indicator pinned to the very top of the viewport. Uses the
// theme's --foreground token so it reads in both light and dark mode. Kept
// deliberately minimal (2px, no glow) per docs/design.md — subtle motion only.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-foreground/80"
    />
  );
}
