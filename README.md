# CyberSpace Digital — Agency Site

Marketing site for CyberSpace Digital, a full-service digital agency (brand, web, product, growth). Two pages: a single-scroll home page and a portfolio view-all page.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Vitest + React Testing Library

## Pages

| Route | Contents |
|---|---|
| `/` | Navigation → Hero → Client logos (auto-scroll) → About → CTA marquee → Featured Work → Services → Team → CTA marquee → Process → Testimonials (carousel) → Contact → Footer |
| `/work` | Full portfolio grid — all projects from the shared data source |
| `/work/[slug]` | Individual project detail page |

There is no pricing/package-tier section and no blog — both were deliberately removed; don't re-add a `#pricing` link or blog references.

The contact form validates client-side (react-hook-form + zod) and POSTs valid submissions to [Web3Forms](https://web3forms.com) directly from the browser (no backend of our own), surfacing success/error as toasts. The access key is set in `.env` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.

The floating nav pill (`components/landing/navigation.tsx`) and the right-edge theme toggle (`components/theme-toggle.tsx`, tap button with an animated Sun/Moon swap) are both mounted site-wide and work identically on every route/theme combination.

## Getting started

Requires Node.js 20+ and pnpm (via corepack — the version is pinned in `package.json`).

```bash
corepack enable
pnpm install
pnpm dev          # dev server at http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (standalone output, see below) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config) |
| `pnpm test` | Run unit tests once (`pnpm test:watch` for watch mode) |

## Project structure

```
app/                  Routes: / (page.tsx), /work, layout, global styles/tokens
components/landing/   Home-page sections — copy lives as consts inside each section file
components/work/      WorkCard — the one shared portfolio card
components/ui/        shadcn/ui primitives (generated; add via shadcn CLI)
lib/data/work.ts      Portfolio data — single source of truth for / and /work
docs/                 Working rules & codebase map (start at docs/README.md)
.claude/              Claude Code subagents (agents/) and workflow skills (skills/)
```

To add a portfolio project, edit `lib/data/work.ts` — the `WorkItem` type documents the shape, and `lib/data/work.test.ts` enforces it (unique slugs, required fields, featured count).

## Styling

Tailwind v4 CSS-first config — there is no `tailwind.config.*`; design tokens are oklch CSS variables in `app/globals.css`. Dark, minimal aesthetic with three font roles: Instrument Sans (body), Instrument Serif (display headlines), JetBrains Mono (labels/metadata).

## Testing

Vitest + React Testing Library in jsdom, colocated as `*.test.ts(x)` next to the code they cover. `vitest.setup.ts` stubs the browser APIs jsdom lacks (IntersectionObserver, ResizeObserver, matchMedia). Tests never hit the network.

## Build & deployment

`next.config.mjs` sets `output: "standalone"`: `pnpm build` produces a self-contained Node server at `.next/standalone/server.js`. To run it, copy the static assets in first — they are not included automatically:

```bash
pnpm build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
node .next/standalone/server.js   # PORT/HOSTNAME env vars supported
```

**Docker:** `Dockerfile` and `compose.yaml` are a three-stage, non-root, read-only build targeting the standalone server (~315MB final image, mostly the `node:24-alpine` base). Run with `docker compose up --build`, served at `http://localhost:3000`.

**Netlify:** `netlify.toml` uses `@netlify/plugin-nextjs`, which understands standalone/SSR output directly — no manual config beyond what's checked in.

## AI-assisted workflow

This repo is developed with Claude Code. The conventions that make that repeatable are checked in:

- `docs/` — rules split by concern (design, code, test, docker, content structure), indexed in `docs/README.md`, plus `docs/codebase-map.md` as a per-file orientation map
- `.claude/agents/` — five scoped subagents (planning, design, code, test, docker)
- `.claude/skills/` — slash-command workflows: `/pr`, `/add-work`, `/new-section`, `/dev-report`

Human or AI, the same rules apply: read `docs/README.md` before making changes.
