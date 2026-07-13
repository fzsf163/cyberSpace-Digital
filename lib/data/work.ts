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
    coverImage: "/placeholder.jpg",
    featured: true,
  },
  {
    slug: "northwind-storefront",
    title: "Northwind Storefront",
    category: "Web",
    year: 2025,
    client: "Northwind Goods",
    summary: "A headless commerce rebuild that cut checkout time by 40%.",
    coverImage: "/placeholder.jpg",
    href: "https://example.com",
    featured: true,
  },
  {
    slug: "atlas-mobile-app",
    title: "Atlas Mobile App",
    category: "Product",
    year: 2024,
    client: "Atlas Logistics",
    summary:
      "End-to-end UX for a fleet-management app used by 12,000 drivers.",
    coverImage: "/placeholder.jpg",
    featured: true,
  },
  {
    slug: "verdant-growth-engine",
    title: "Verdant Growth Engine",
    category: "Growth",
    year: 2024,
    client: "Verdant Foods",
    summary:
      "An SEO and paid-media overhaul that tripled organic traffic in six months.",
    coverImage: "/placeholder.jpg",
    featured: true,
  },
  {
    slug: "cobalt-visual-identity",
    title: "Cobalt Visual Identity",
    category: "Brand",
    year: 2024,
    client: "Cobalt Finance",
    summary:
      "A confident, technical brand system for a fintech infrastructure company.",
    coverImage: "/placeholder.jpg",
  },
  {
    slug: "harbor-marketing-site",
    title: "Harbor Marketing Site",
    category: "Web",
    year: 2023,
    client: "Harbor Robotics",
    summary: "A high-conversion marketing site rebuilt on a modern static stack.",
    coverImage: "/placeholder.jpg",
    href: "https://example.com",
  },
  {
    slug: "pulse-analytics-dashboard",
    title: "Pulse Analytics Dashboard",
    category: "Product",
    year: 2023,
    client: "Pulse Insights",
    summary:
      "A data-dense dashboard redesigned for clarity and faster decision-making.",
    coverImage: "/placeholder.jpg",
  },
  {
    slug: "meridian-launch-campaign",
    title: "Meridian Launch Campaign",
    category: "Growth",
    year: 2023,
    client: "Meridian Labs",
    summary: "A multi-channel launch campaign that generated 2,400 qualified leads.",
    coverImage: "/placeholder.jpg",
  },
];
