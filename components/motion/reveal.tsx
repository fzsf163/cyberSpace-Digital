"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Shared scroll-reveal primitives (Motion). Keep the motion subtle per
// docs/design.md — a short opacity + rise, once, no bounce. Everything here
// honours prefers-reduced-motion by collapsing to a plain fade (no movement).

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutExpo-ish, calm settle
const DISTANCE = 24;

/**
 * Single-element reveal: fades and rises in the first time it scrolls into
 * view. Drop-in replacement for the old IntersectionObserver + Tailwind
 * opacity/translate pattern.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered group: wrap a list, mark each child with <RevealItem>, and they
 * cascade in one after another as the group enters view.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as];
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : DISTANCE },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
