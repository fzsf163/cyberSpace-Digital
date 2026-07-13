---
name: new-section
description: Scaffold a new home-page section for the agency site following all repo conventions — component file, anchor id, nav wiring, page composition order, and docs updates. Use whenever the user asks to add a section to the landing/home page (FAQ, team, clients, awards, blog teaser, stats, etc.) or says "add a … section", even if they describe it loosely or only name the content.
---

# Add a landing-page section

Sections are self-contained components in `components/landing/`, stacked in order by `app/page.tsx`. The binding rules live in docs/ — read **docs/content-structure.md** (canonical section order), **docs/component-conventions.md**, and **docs/design.md** before writing anything.

## Steps

1. **Placement first.** Decide where in the section order it goes and whether it deserves a nav link. If the user didn't say, propose a position (with a one-line reason) before building — order changes are cheap now, awkward later.
2. **Component file**: `components/landing/<kebab-name>-section.tsx`, exporting `function <PascalName>Section()`. All existing sections are `"use client"` with scroll-reveal animation — follow suit. Copy the container/padding/heading pattern from an adjacent section (e.g. services-section.tsx) rather than inventing one; same max-width, same eyebrow-label style (mono font + horizontal rule), same display-serif headline treatment.
3. **Copy lives in the file**: content goes in const arrays at the top of the component, like every other section — no external data file unless it's work-item data (that belongs in `lib/data/work.ts`).
4. **Anchor + nav**: give the section an `id` only if it's nav-linked; if so, add the link in `navigation.tsx` (and footer-section.tsx if it fits an existing column). Don't add anchors nothing points to.
5. **Compose**: insert the import + element into `app/page.tsx` at the agreed position.
6. **Docs (maintenance rule, docs/README.md)**: update the section-order list in docs/content-structure.md AND add the component's row to the table in docs/codebase-map.md — in the same change, not later.
7. **Verify per docs/test.md**: `pnpm lint`, `pnpm test`, `pnpm build`, then browser-check the home page at desktop and mobile widths (new sections most often break at mobile), plus the nav link if one was added. Zero new console errors.

## Design guardrails (from docs/design.md)

Dark oklch tokens only — no new hardcoded colors; `--radius: 0.25rem` sharp corners; type by intent (Instrument Serif = display headlines, JetBrains Mono = labels/metadata, Instrument Sans = body); subtle motion only — nothing competing with the hero.
