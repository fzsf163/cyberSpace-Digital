export type WorkItem = {
  slug: string;
  title: string;
  category: string; // e.g. "Brand", "Web", "Product" — used for filtering on /work
  year: number;
  client?: string;
  summary: string; // one-liner for cards
  coverImage: string; // path under /public
  href?: string; // external case study / live site link, if any
  featured?: boolean; // true = eligible for home page Featured Work

  // ── Optional detail-page content (/work/[slug]) ──
  // Anything omitted falls back to a sensible default derived from the fields
  // above, so a project renders a complete detail page with only the basics.
  tags?: string[]; // discipline chips shown under the detail title
  industry?: string; // meta row — defaults to `category`
  solution?: string; // meta row — defaults to `category`
  website?: string; // meta row display label, e.g. "lumenhealth.com"
  needs?: string; // "Client needs" paragraph
  approach?: string; // "Our approach" paragraph — defaults to `summary`
  services?: string[]; // "Services provided" list
  challenge?: string; // "Challenges" paragraph
  results?: string[]; // "Results / success metrics" list
};

export const workItems: WorkItem[] = [
  {
    slug: "lumen-rebrand",
    title: "Lumen Rebrand",
    category: "Brand",
    year: 2025,
    client: "Lumen Health",
    summary:
      "A full identity overhaul for a telehealth platform scaling into new markets.",
    coverImage: "/images/bridge.png",
    featured: true,
    tags: ["Branding", "Identity", "Art Direction", "Guidelines"],
    industry: "Healthcare",
    solution: "Brand Identity",
    website: "lumenhealth.com",
    needs:
      "Lumen had outgrown a founder-era logo and a patchwork of visual styles that made a fast-scaling telehealth platform feel smaller than it was. They needed a system that read as trustworthy to patients and credible to enterprise partners.",
    approach:
      "We rebuilt the identity from positioning outward — a warmer wordmark, a calm clinical palette, and a flexible layout system that holds together across the app, marketing, and print.",
    services: [
      "Brand strategy & positioning",
      "Logo & identity system",
      "Design guidelines",
      "Launch collateral",
    ],
    challenge:
      "The rebrand had to roll out across live product surfaces without disrupting active patient sessions, so every asset shipped behind a staged migration plan.",
    results: [
      "3× lift in brand recall in post-launch surveys",
      "Unified design system across app, web and print",
      "Faster partner onboarding with ready-made brand kits",
    ],
  },
  {
    slug: "northwind-storefront",
    title: "Northwind Storefront",
    category: "Web",
    year: 2025,
    client: "Northwind Goods",
    summary: "A headless commerce rebuild that cut checkout time by 40%.",
    coverImage: "/images/whale.png",
    href: "https://example.com",
    featured: true,
    tags: ["Web", "Headless Commerce", "Performance", "UX"],
    industry: "Retail",
    solution: "E-commerce",
    website: "northwindgoods.com",
    needs:
      "A slow, monolithic storefront was bleeding conversions at checkout. Northwind wanted the speed of a modern stack without losing the catalog depth their buyers rely on.",
    approach:
      "We moved them to a headless architecture with a streamlined, single-page checkout and edge-cached product pages, then instrumented the funnel to keep tuning after launch.",
    services: [
      "Headless architecture",
      "Storefront UI/UX",
      "Checkout optimization",
      "Analytics & CRO",
    ],
    challenge:
      "Migrating thousands of SKUs and years of order history with zero downtime during peak retail season.",
    results: [
      "40% faster checkout completion",
      "28% lift in mobile conversion rate",
      "Sub-second product page loads at the edge",
    ],
  },
  {
    slug: "atlas-mobile-app",
    title: "Atlas Mobile App",
    category: "Product",
    year: 2024,
    client: "Atlas Logistics",
    summary:
      "End-to-end UX for a fleet-management app used by 12,000 drivers.",
    coverImage: "/images/shield.png",
    featured: true,
    tags: ["Product", "Mobile", "UX Research", "Design System"],
    industry: "Logistics",
    solution: "Product Design",
    website: "atlaslogistics.com",
    needs:
      "Drivers were juggling three disconnected tools on the road. Atlas needed a single app that worked in gloves, in poor signal, and at a glance.",
    approach:
      "We ran field research in real cabs, then designed an offline-first interface around large touch targets and a component library the in-house team could extend.",
    services: [
      "UX research",
      "Product & interaction design",
      "Design system",
      "Usability testing",
    ],
    challenge:
      "Designing for high-distraction, low-connectivity environments where a mis-tap has real operational cost.",
    results: [
      "12,000 drivers onboarded in the first quarter",
      "Three legacy tools consolidated into one",
      "34% drop in support tickets",
    ],
  },
  {
    slug: "verdant-growth-engine",
    title: "Verdant Growth Engine",
    category: "Growth",
    year: 2024,
    client: "Verdant Foods",
    summary:
      "An SEO and paid-media overhaul that tripled organic traffic in six months.",
    coverImage: "/images/permissions.jpg",
    featured: true,
    tags: ["Growth", "SEO", "Paid Media", "Analytics"],
    industry: "Food & Beverage",
    solution: "Digital Marketing",
    website: "verdantfoods.com",
    needs:
      "Verdant had a great product and near-zero organic visibility. They needed a growth motion that didn't depend entirely on paid spend.",
    approach:
      "We rebuilt their content architecture around high-intent search, tightened technical SEO, and rebalanced paid budgets toward the channels that actually converted.",
    services: [
      "Technical SEO",
      "Content strategy",
      "Paid media management",
      "Conversion tracking",
    ],
    challenge:
      "Growing organic reach in a crowded category without cannibalizing the paid campaigns already driving revenue.",
    results: [
      "3× organic traffic in six months",
      "2,400 qualified leads from content",
      "41% lower blended cost per acquisition",
    ],
  },
  {
    slug: "cobalt-visual-identity",
    title: "Cobalt Visual Identity",
    category: "Brand",
    year: 2024,
    client: "Cobalt Finance",
    summary:
      "A confident, technical brand system for a fintech infrastructure company.",
    coverImage: "/images/encrypted.jpg",
    tags: ["Branding", "Fintech", "Identity"],
    industry: "Fintech",
    solution: "Brand Identity",
  },
  {
    slug: "harbor-marketing-site",
    title: "Harbor Marketing Site",
    category: "Web",
    year: 2023,
    client: "Harbor Robotics",
    summary: "A high-conversion marketing site rebuilt on a modern static stack.",
    coverImage: "/images/isolated.jpg",
    href: "https://example.com",
    tags: ["Web", "Marketing Site", "Performance"],
    industry: "Robotics",
    solution: "Web Development",
  },
  {
    slug: "pulse-analytics-dashboard",
    title: "Pulse Analytics Dashboard",
    category: "Product",
    year: 2023,
    client: "Pulse Insights",
    summary:
      "A data-dense dashboard redesigned for clarity and faster decision-making.",
    coverImage: "/images/audit.jpg",
    tags: ["Product", "Dashboard", "Data Viz"],
    industry: "Analytics",
    solution: "Product Design",
  },
  {
    slug: "meridian-launch-campaign",
    title: "Meridian Launch Campaign",
    category: "Growth",
    year: 2023,
    client: "Meridian Labs",
    summary: "A multi-channel launch campaign that generated 2,400 qualified leads.",
    coverImage: "/images/shield.png",
    tags: ["Growth", "Campaign", "Launch"],
    industry: "Technology",
    solution: "Digital Marketing",
  },
];

/** Look up a single project by its slug (used by /work/[slug]). */
export function getWorkItem(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}

/** Previous / next project in list order, for detail-page navigation (wraps around). */
export function getAdjacentWork(slug: string): { prev: WorkItem; next: WorkItem } | undefined {
  const index = workItems.findIndex((item) => item.slug === slug);
  if (index === -1) return undefined;
  const prev = workItems[(index - 1 + workItems.length) % workItems.length];
  const next = workItems[(index + 1) % workItems.length];
  return { prev, next };
}
