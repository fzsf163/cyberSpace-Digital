# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (pinned via `packageManager` in [package.json](package.json); Docker build uses `corepack prepare pnpm@latest`).

- `pnpm dev` — start the Next.js dev server
- `pnpm build` — production build (static export, see below)
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (`eslint .`)
- `pnpm test` — run unit tests once (Vitest + React Testing Library, jsdom); `pnpm test:watch` for watch mode. Tests are colocated next to source files as `*.test.ts(x)`.

## Architecture

This is a single-page marketing/landing site for a fictional "COMPUTE" AI-agent product, generated with v0.app and built on Next.js 16 (App Router).

- **Single page composition**: [app/page.tsx](app/page.tsx) renders one long page by stacking section components from `components/landing/` in order (Navigation, Hero, Features, HowItWorks, Infrastructure, Metrics, Integrations, Security, Developers, Testimonials, Pricing, CTA, Footer). To add/reorder/remove a section, edit that list — each section is self-contained.
- **`components/landing/`** — page-specific sections. `ascii-scene.tsx` renders a 3D/canvas scene using `@react-three/fiber` + `three`.
- **`components/ui/`** — shadcn/ui primitives (`style: "new-york"`, configured in [components.json](components.json)). Path aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (all map to root via `@/*` in [tsconfig.json](tsconfig.json)). Use the shadcn CLI conventions when adding new primitives rather than hand-rolling them.
- **Styling**: Tailwind CSS v4, CSS-first config (no `tailwind.config.*` file) — theme tokens/colors are defined as CSS variables directly in [app/globals.css](app/globals.css) using `@import 'tailwindcss'` and `@theme`/`:root` variables (oklch color space). Dark mode uses a custom variant (`@custom-variant dark (&:is(.dark *))`).
- **`lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge) used throughout for conditional class names.
- **`hooks/`** — `use-mobile.ts`, `use-toast.ts` shared hooks.

### Build/deploy shape

- [next.config.mjs](next.config.mjs) sets `output: "export"` (fully static HTML export to `out/`), `images.unoptimized: true`, and `typescript.ignoreBuildErrors: true` — TS errors will not fail `pnpm build`, so don't rely on the build to catch type errors.
- Deployment targets: Netlify ([netlify.toml](netlify.toml), publishes `out/`) and a Docker/nginx setup ([Dockerfile](Dockerfile), [compose.yaml](compose.yaml)) — multi-stage build that installs deps, runs `pnpm build`, and serves the static `out/` directory via Chainguard's hardened nginx image on port 8080.
- Since output is a static export, no Next.js server-side features (API routes, middleware, ISR, server actions) are available — everything must work as static HTML/client-side JS.

## Digital agency rebuild (in progress)

This site is being rebuilt from the COMPUTE product landing page into a two-page digital agency site (`/` home + `/work` view-all works page). The rules for that rebuild live in [docs/](docs/README.md), split by concern (planning, design, code, test, content structure, component conventions, deployment) so each subagent only loads what it needs. Matching subagents are defined in `.claude/agents/{planning,design,code,test,docker}.md`. Read `docs/README.md` before starting any work on this rebuild — the architecture described above still reflects the current (pre-rebuild) state of the code.
