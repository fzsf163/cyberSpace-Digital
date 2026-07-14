# Content structure

## Pages

- `app/page.tsx` — home (`/`), the entire single-scroll site
- `app/work/page.tsx` — "view all" works/projects page (`/work`)

Both are plain static App Router pages (no dynamic segments).

## Home page section order

Layout replicated from a dark digital-agency reference (Mortar template's structure, with our own code and copy), in this order:

1. **Navigation** — sticky, links to in-page anchors + `/work` (unchanged through the redesign)
2. **Hero** — eyebrow tag, giant two-line headline, right-shifted sub copy + CTA, stats row, background video, bottom marquee strip
3. **Client logos** — "Trusted by" eyebrow + a continuously auto-scrolling marquee of client wordmarks (text logotypes, no image assets), immediate social proof below the hero
4. **About** — two-column: heading/copy/achievement rows (left) + autoplay muted looping studio-reel video (right, placeholder clip)
5. **CTA marquee** — scrolling "Let's build something great" strip + "Start a project" button (`cta-marquee.tsx`, rendered twice on the page)
6. **Featured Work** — "Selected projects / (2023 — 2026)* / Latest work." header, 4 featured cards in a 2-col grid from the shared data source, centered "View all work" pill → `/work`
7. **Services** — "Scope of work." stacked full-width rows: number, 2-line title, description, `+ capability` list, stat
8. **Team** — "The team." intro copy + a grid of team members (initial-avatar circle, name, role, one-line bio)
9. **CTA marquee** (second instance)
10. **Process** — "Solution in process." 3 giant step rows (Step 01–03) + founder quote block
11. **Testimonials** — "They love us." + REVIEWED badge, carousel of review cards
12. **Contact** — repeated-word marquee strip + final pitch + the contact form (name, email, message). No backend: submit validates client-side and shows a toast
13. **Footer** — unchanged

No package/pricing tiers and no blog/articles section — both were removed; the site does not offer engagement-model pricing and there is no blog to link to.

`metrics-section` was dropped in the redesign (its stats live in the Hero and About sections now). `security-section`, `developers-section`, and `integrations-section` were COMPUTE-product-specific and are long gone.

## Work/project data model

Single source of truth, not duplicated between the home page's Featured Work and `/work`. Put it in `lib/data/work.ts` as a typed array:

```ts
type WorkItem = {
  slug: string
  title: string
  category: string       // e.g. "Brand", "Web", "Product" — used for filtering on /work
  year: number
  client?: string
  summary: string         // one-liner for cards
  coverImage: string       // path under /public
  href?: string            // external case study / live site link, if any
  featured?: boolean       // true = eligible for home page Featured Work
}
```

No per-project detail pages for now — cards link out via `href` if present, otherwise they're static (no dead links to a detail page that doesn't exist).

## `/work` page structure

1. Navigation (shared)
2. Page header — title + short intro
3. Optional category filter (client-side, filters the same `work.ts` array — no backend)
4. Responsive grid of work cards (reuse the card component from the home page's Featured Work section — don't fork a second card component)
5. Footer (shared)

If the work list grows large enough to need pagination, flag it to the user before implementing — don't add pagination speculatively.
