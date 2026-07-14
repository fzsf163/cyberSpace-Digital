"use client";

import { useEffect } from "react";

/**
 * Scrolls to the `#section` in the URL when the home page mounts.
 *
 * Landing on this route with a hash (e.g. the nav's `/#process` link clicked
 * from /work) is unreliable natively: `html { scroll-behavior: smooth }`
 * animates the jump, and that animation gets cancelled as the tall page's
 * height keeps changing while sections and media lay out — so the browser
 * often ends up back at the top.
 *
 * We jump to the target immediately and then a few more times as layout
 * settles, using an explicit `behavior: "instant"` so we never mutate the
 * global scroll-behavior (same-page anchor clicks stay smooth).
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    const scrollToTarget = () => {
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
    };

    scrollToTarget();
    // Re-correct as late-loading sections/media shift the target's position.
    const timers = [60, 200, 500, 1000].map((delay) =>
      window.setTimeout(scrollToTarget, delay)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return null;
}
