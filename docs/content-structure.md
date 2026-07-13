# Content structure

## Pages

- `app/page.tsx` — home (`/`), the entire single-scroll site
- `app/work/page.tsx` — "view all" works/projects page (`/work`)

Both are plain static App Router pages (no dynamic segments) — consistent with `output: "export"` in [next.config.mjs](../next.config.mjs).

## Home page section order

Replace the current COMPUTE-product sections with the agency equivalents, in this order:

1. **Navigation** — sticky, links to in-page anchors + `/work`
2. **Hero** — agency positioning statement + primary CTA (e.g. "Start a project")
3. **Services** — what the agency does (replaces `features-section`)
4. **Process** — how engagements run, step by step (replaces `how-it-works-section`)
5. **Featured Work** — 4–6 curated project cards pulled from the same data source as `/work`, with a "View all work" link to `/work` (replaces `infrastructure-section` / `integrations-section`)
6. **Metrics** — stats: years active, projects shipped, clients, retention, etc. (keep `metrics-section`, reskin copy)
7. **Testimonials** — client quotes (keep `testimonials-section`)
8. **Pricing / Engagement models** — packages or ways to work with the agency (keep `pricing-section`, reskin copy)
9. **Contact** — final pitch + a contact form (name, email, message). Replaces `cta-section` — don't keep a separate banner-only CTA section directly above it, that would be a redundant bottom-of-page prompt. No backend: submit handler doesn't call an API (static export, see [code.md](code.md)); show a client-side success state (e.g. a toast) instead.
10. **Footer** — keep `footer-section`

`security-section`, `developers-section`, and `integrations-section` are COMPUTE-product-specific — drop them entirely, don't try to reskin them into agency copy.

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
