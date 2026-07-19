"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Tweens a numeric stat from 0 → its value the first time it scrolls into view.
// Handles the site's stat formats — "120+", "98%", "9 yrs", "3.2x", "45+" — by
// splitting off a non-numeric prefix/suffix and preserving the source's decimal
// places. Honors prefers-reduced-motion (renders the final value, no tween).
// Non-numeric input falls through untouched.

function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, target: parseFloat(num), suffix, decimals };
}

const format = (
  n: number,
  { prefix, suffix, decimals }: { prefix: string; suffix: string; decimals: number },
) => `${prefix}${n.toFixed(decimals)}${suffix}`;

export function CountUp({
  value,
  duration = 1.2,
}: {
  value: string;
  duration?: number;
}) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  // Deterministic first paint (matches SSR): the zero-state, formatted.
  const [display, setDisplay] = useState(() =>
    parsed ? format(0, parsed) : value,
  );

  useEffect(() => {
    if (!parsed || !inView) return;
    if (reduce) {
      setDisplay(format(parsed.target, parsed));
      return;
    }
    const controls = animate(0, parsed.target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(format(latest, parsed)),
    });
    return () => controls.stop();
    // parsed is derived from `value`; depend on the primitives that matter.
  }, [inView, reduce, value, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <>{value}</>;
  return <span ref={ref}>{display}</span>;
}
