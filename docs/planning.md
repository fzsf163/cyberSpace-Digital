# Planning rules

Scope work before design/code touch files. Output a short plan, not code.

## Scope discipline

- This is a **two-page static site**: `/` and `/work` (see [content-structure.md](content-structure.md)). Any request should map onto one of those two pages or a shared component (nav/footer). If it doesn't, stop and confirm with the user before scoping further.
- Don't plan for features that aren't requested: no CMS, no auth, no blog, no per-project detail pages, no backend/API routes. The site is a static export (`output: "export"`) — anything requiring a server is out of scope by construction.
- Prefer reskinning/reordering existing `components/landing/*` sections over inventing new ones. Check [content-structure.md](content-structure.md) for the canonical section list first.

## What a plan should cover

For any non-trivial task, produce:

1. **Which page(s)** it touches (`/`, `/work`, or both via shared nav/footer)
2. **Which subagent(s)** are needed — design (visual/markup/styling) vs code (data, routing, logic). Small copy-only changes may not need either.
3. **Files touched** — net-new vs edited, called out explicitly
4. **Data model impact** — does this add/change fields in `lib/data/work.ts`? If so note it so code.md's single-source-of-truth rule isn't violated
5. **Whether [content-structure.md](content-structure.md) needs updating** as a result of the change (e.g. reordering sections, adding a new one) — if the plan changes the canonical structure, say so explicitly so the docs stay accurate

## Handoff

- Planning does not edit source files. It produces the plan and stops.
- Design and code subagents should each be given only the relevant docs file(s) plus [component-conventions.md](component-conventions.md) — not the full plan verbatim if it's long; extract the part relevant to their task.
