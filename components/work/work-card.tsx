import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

import type { WorkItem } from "@/lib/data/work";

// The top-right "cut" is an illusion: a 3.5rem square patch painted in the
// page background token (bg-section — both card contexts, the home featured
// section and /work, use it) covers the image's corner, so it reads as a
// square notch cut out of the cover. Its inverted radii come from a 1rem
// rounded inner corner plus two 1rem pseudo-element flares — each a tiny
// square filled with a radial gradient that is transparent inside a
// quarter-circle and bg-section outside it — where the cut meets the top and
// right edges. If a card is ever placed on a non-bg-section background, the
// patch will show; switch the token then.
export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link href={`/work/${item.slug}`} className="group block">
      {/* Cover with a square inverted-radius cut in the top-right corner
          (see the patch note above); the + badge nests in the cut. */}
      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-t-3xl">
          <img
            src={item.coverImage}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute right-0 top-0 h-14 w-14 rounded-bl-[1rem] bg-section before:absolute before:right-full before:top-0 before:h-4 before:w-4 before:bg-[radial-gradient(1rem_at_left_bottom,transparent_99%,var(--section))] after:absolute after:right-0 after:top-full after:h-4 after:w-4 after:bg-[radial-gradient(1rem_at_left_bottom,transparent_99%,var(--section))]"
          />
        </div>

        {/* White + badge with a "View details" pill that expands to the left on
            hover. Sits outside the clipped cover so the pill isn't cropped. */}
        <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
          <span className="flex origin-right scale-x-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[oklch(0.18_0.01_286)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100">
            View details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-90">
            <Plus className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="rounded-b-3xl border border-t-0 border-foreground/10 bg-card px-7 pb-8 pt-6">
        <h3 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-1 lg:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {item.summary}
        </p>
        <span className="mt-5 inline-block rounded-full border border-foreground/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {item.category}
        </span>
      </div>
    </Link>
  );
}
