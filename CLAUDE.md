# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (pinned via `packageManager` in [package.json](package.json)).

- `pnpm dev` — start the Next.js dev server
- `pnpm build` — production build (standalone output, see below)
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (flat config in [eslint.config.mjs](eslint.config.mjs))
- `pnpm test` — run unit tests once (Vitest + React Testing Library, jsdom); `pnpm test:watch` for watch mode

## Architecture

Two-page digital agency site for **CyberSpace Digital**, built on Next.js 16 (App Router) + React 19. Originally a v0.app-generated "COMPUTE" product page, since fully rebuilt into agency content — the visual system (dark oklch palette, animation patterns) was kept.

- **Pages**: `/` ([app/page.tsx](app/page.tsx)) stacks section components from `components/landing/` in order: Navigation → Hero → Services → Process → FeaturedWork → Metrics → Testimonials → Pricing → Contact → Footer. `/work` ([app/work/page.tsx](app/work/page.tsx)) is the view-all portfolio grid, sharing Navigation/Footer.
- **Section copy lives in the section file** — each `components/landing/*-section.tsx` is self-contained (`"use client"`, const arrays at the top hold the content). The one exception: Featured Work reads from the shared data source.
- **`lib/data/work.ts`** — single source of truth for portfolio items (`WorkItem[]`); both the home Featured Work section and `/work` render it via the one shared `components/work/work-card.tsx`. Never fork a second card or a second list.
- **Contact form** (`contact-section.tsx`) — react-hook-form + zod validation, sonner toasts. Valid submits POST directly to **Web3Forms** (`api.web3forms.com/submit`) from the browser — there's still no backend of our own; Web3Forms relays the message to the inbox. The access key lives in `.env` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (public by design). Success/error both surface as toasts; fields reset only on success.
- **`components/ui/`** — 57 shadcn/ui primitives (`style: "new-york"`, [components.json](components.json)). Add via shadcn CLI conventions, don't hand-roll. Path aliases `@/*` → repo root ([tsconfig.json](tsconfig.json)); `cn()` from `lib/utils.ts` for conditional classes.
- **Styling**: Tailwind CSS v4, CSS-first config — no `tailwind.config.*`; tokens are oklch/hex CSS variables in [app/globals.css](app/globals.css), split into `:root` (light) and `.dark` (dark) blocks. Light/dark is real and toggleable via `next-themes` (`ThemeProvider` in [app/layout.tsx](app/layout.tsx), `components/theme-provider.tsx`), switched with the floating right-edge capsule `components/theme-toggle.tsx`. `--section`/`--section-2` are the two alternating section-background tokens (`bg-section` / `bg-section-2`) — every full-bleed home section alternates between them except `Navigation`. Fonts: Instrument Sans (body), Instrument Serif (display), JetBrains Mono (labels/meta), wired in [app/layout.tsx](app/layout.tsx).
- For per-file orientation (exports, anchor ids, known dead code), read [docs/codebase-map.md](docs/codebase-map.md) before exploring the tree.

## Testing

Vitest + React Testing Library (jsdom), colocated next to source as `*.test.ts(x)`. Config in [vitest.config.mts](vitest.config.mts); [vitest.setup.ts](vitest.setup.ts) stubs IntersectionObserver/ResizeObserver/matchMedia (jsdom lacks them; the animation-heavy sections need them). Tests import from `vitest` explicitly (no globals) and must never hit the network. No e2e framework.

## Build/deploy shape

- [next.config.mjs](next.config.mjs) sets `output: "standalone"` — `pnpm build` emits `.next/standalone/server.js`, a self-contained Node server. It does **not** include `public/` or `.next/static`; copy both alongside `server.js` to serve assets.
- `typescript.ignoreBuildErrors: true` — a passing build proves nothing about types; check with `tsc --noEmit` when it matters. `images.unoptimized: true` — pre-size/compress images, nothing optimizes them at build time.
- **Windows gotcha**: a running standalone server locks `.next/standalone` — stop it before `pnpm build` or the build fails with EBUSY.
- **Deploy configs are currently stale**: [netlify.toml](netlify.toml) and the [Dockerfile](Dockerfile) still target the old static-export `out/` directory (Netlify "works" only because an obsolete `out/` is still committed). The Docker rework is specced in [docs/docker.md](docs/docker.md) for the `docker` agent.

## Rules, agents, and skills

Working rules live in [docs/](docs/README.md), split by concern (planning, design, code, test, docker, content structure, component conventions, deployment) — read `docs/README.md` for the index and load only what the task needs. Maintenance rule: any file add/rename/delete/repurpose updates its line in `docs/codebase-map.md` in the same change.

Subagents: `.claude/agents/{planning,design,code,test,docker}.md`. Project skills (slash commands): `.claude/skills/{pr,add-work,new-section,dev-report}/` — invoke these for their workflows instead of re-deriving them. Note: `gh` CLI is intentionally not installed; PRs are created via the `/pr` skill's prefilled-link flow.

**Git rule — never run `git pull`** (or otherwise move the user's local branches: merge, rebase, reset). The user syncs their own checkout through VS Code. `git fetch` is fine (read-only). If local `main` is behind after a PR merge, don't fix it — branch new work from the remote tip instead (`git fetch origin && git checkout -b <branch> origin/main`) and leave local `main` alone; if being behind genuinely blocks something, say so and let the user sync.
