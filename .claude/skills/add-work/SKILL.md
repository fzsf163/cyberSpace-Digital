---
name: add-work
description: Add a new project/work item to the portfolio data (lib/data/work.ts) with the correct WorkItem shape, image conventions, and featured-flag rules, then verify with the data-integrity tests. Use whenever the user wants a project, case study, engagement, or portfolio entry added to the site — "add X to our works", "new project for the work page", "put this client project on the site" — even if they only supply partial details.
---

# Add a work/portfolio item

`lib/data/work.ts` is the single source of truth for both the home page's Featured Work section and the `/work` grid (never a second list anywhere). The `WorkItem` shape is documented in docs/content-structure.md; the colocated `lib/data/work.test.ts` enforces integrity, so a wrong entry fails fast.

## Steps

1. **Collect fields; ask, don't invent.** Required: `title`, `category`, `year`, `summary` (one-liner). Optional: `client`, `href` (external case-study/live link), `featured`. If the user gave only a name, ask for the rest — placeholder copy in a real portfolio is worse than a question. Categories currently in use: Brand, Web, Product, Growth — reuse one unless the user clearly intends a new category (it becomes a filter value later, so don't multiply them casually).
2. **Slug**: kebab-case of the title; must be unique across `workItems` (the test enforces this).
3. **Cover image**: if the user supplies one, place it under `public/images/work/`, pre-sized and compressed — there is NO build-time image optimization (`images.unoptimized: true`), and cards render at 4:3, so match that ratio. If no image is supplied, use `"/placeholder.jpg"` and tell the user it's a placeholder. Path must start with `/` (test-enforced).
4. **Featured flag**: the home page shows only `featured: true` items and expects 4–6 of them; the data test requires at least 4 featured overall. Only set `featured: true` if the user says so or the featured pool is thin — and if adding it would push featured past 6, ask which existing item to unfeature.
5. **Insert** keeping the file's reverse-chronological order (newest year first).
6. **Verify**: `pnpm test` (data-integrity suite must pass) and `pnpm lint`. Then check rendering in the browser: `/work` always; the home Featured Work section too if `featured`.
7. **Maintenance rule** (docs/README.md): update the `lib/data/work.ts` line in docs/codebase-map.md — it states the item/featured counts.
