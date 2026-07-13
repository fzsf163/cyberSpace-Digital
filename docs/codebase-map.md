# Codebase map

Orientation file: what lives where and what each file contains, so you don't have to re-explore the tree every session. **Keep this updated** — when you add, rename, delete, or repurpose a file, update the matching line here in the same change.

Last synced: 2026-07-14 (Mortar-layout home redesign, branch `feat/mortar-dark-home`).

## Top-level layout

```
app/                  Routes (App Router, standalone output)
components/landing/   Home-page sections + shared chrome (nav/footer)
components/work/      /work-specific pieces (shared work card)
components/ui/        shadcn/ui primitives (generated — don't hand-edit)
lib/                  utils + data
hooks/                shared hooks
docs/                 rebuild rules (this folder — see README.md index)
public/               static assets (placeholder images, icons)
out/                  OBSOLETE former static-export output — still committed but no longer produced (build emits .next/standalone now); untrack+delete is a pending cleanup
.claude/agents/       subagent definitions (planning/design/code/test/docker)
.claude/skills/       project skills / slash commands (pr, add-work, new-section, dev-report)
```

Docs at root: [README.md](../README.md) (public-facing documentation — pages, commands, structure, deploy) and [CLAUDE.md](../CLAUDE.md) (Claude Code guidance). Config at root: [next.config.mjs](../next.config.mjs) (standalone output, images unoptimized, TS build errors ignored), [components.json](../components.json) (shadcn, new-york style), [tsconfig.json](../tsconfig.json) (`@/*` → root), [eslint.config.mjs](../eslint.config.mjs) (flat config; `react-hooks/set-state-in-effect` + `react-hooks/purity` disabled for the animation-heavy sections), [postcss.config.mjs](../postcss.config.mjs), deploy files ([netlify.toml](../netlify.toml), [Dockerfile](../Dockerfile), [compose.yaml](../compose.yaml)).

## app/

| File | Contents |
|---|---|
| `layout.tsx` | Root layout. Loads the 3 fonts as CSS variables (`--font-instrument` Sans / `--font-instrument-serif` / `--font-jetbrains` Mono), site metadata ("CyberSpace Digital — Brand, Web & Product Agency"), Vercel `<Analytics />`, sonner `<Toaster />`. |
| `page.tsx` | Home (`/`). Pure composition — stacks the landing sections in order: Navigation → Hero → About → CtaMarquee → FeaturedWork → Services → CtaMarquee → Process → Testimonials → Articles → Pricing → Contact → Footer. |
| `work/page.tsx` | `/work`. Own `metadata`, "Selected projects / (2023 — 2026)* / All work." header, 2-col grid of ALL `workItems` via `WorkCard`, wrapped in shared Navigation + FooterSection. |
| `globals.css` | Tailwind v4 CSS-first config: `@import 'tailwindcss'`, dark oklch tokens on `:root` (`--background`, `--foreground`, `--radius: 0.25rem`, chart/sidebar vars), `@custom-variant dark`. The only styling config file — there is no tailwind.config. |

## components/landing/

All section files are `"use client"` (animation hooks throughout). Each section is self-contained: its copy/data lives as consts at the top of its own file — to edit content, edit that file's const arrays, no external CMS/data file (except featured-work). Layout follows a dark agency reference (Mortar template structure; our code/copy).

| File | Export | Anchor | Contents |
|---|---|---|---|
| `navigation.tsx` | `Navigation` | — | Sticky nav. Links: `#services`, `#process`, `#pricing`, `/work`; primary CTA "Start a project" → `#contact`. |
| `hero-section.tsx` | `HeroSection` | — | Full-screen: eyebrow tag "(2016 — 2026)", giant static "Pioneering digital excellence." headline, right-shifted sub copy + CTA pill, stats row, background video (vercel-blob mp4), bottom scrolling marquee strip. |
| `about-section.tsx` | `AboutSection` | — | Two-column: heading/copy + achievement rows with big numerals (left); autoplay muted looping studio-reel `<video>` with placeholder poster (right, sticky). "See the work" → `#work`. |
| `cta-marquee.tsx` | `CtaMarquee` | — | Reusable band: scrolling "Let's build something great" display-text marquee + centered "Start a project" pill → `#contact`. Rendered twice on the home page. |
| `services-section.tsx` | `ServicesSection` | `services` | "Scope of work." — 4 stacked full-width rows: number, 2-line display title, description, `+ capability` list, right-aligned stat. |
| `process-section.tsx` | `ProcessSection` | `process` | "Solution in process." — 3 giant step rows (Step 01–03) on the raised dark bg + founder quote block (Alex Morgan placeholder). |
| `featured-work-section.tsx` | `FeaturedWorkSection` | `work` | "Selected projects / (2023 — 2026)* / Latest work." — first 4 `featured` items from `lib/data/work.ts` via shared `WorkCard` in a 2-col grid; centered "View all work" pill → `/work`. Only landing section with an external data source. |
| `testimonials-section.tsx` | `TestimonialsSection` | — | "They love us." + 5-star REVIEWED badge; static 2×2 grid of review cards (avatar initial, name/role, bold headline, quote). |
| `articles-section.tsx` | `ArticlesSection` | — | "Latest articles." — 4 static journal rows (category chip, mono date, display title). Deliberately non-clickable: no blog exists, no dead links. |
| `pricing-section.tsx` | `PricingSection` | `pricing` | 3 engagement models: Starter $2,400/mo, Growth $5,500/mo (most popular), Enterprise custom. Kept through the redesign so the nav's `#pricing` anchor resolves. |
| `contact-section.tsx` | `ContactSection` | `contact` | Repeated-word "Contact" marquee strip + contact form (name/email/message) — react-hook-form + zod schema (`contactFormSchema`) + shadcn Form/Input/Textarea/Button. No API call: valid submit fires a sonner toast and resets. |
| `footer-section.tsx` | `FooterSection` | — | 4 link columns (Services/Company/Resources/Legal) + socials. Several links are `href="#"` placeholders (Careers, FAQ, Blog, Privacy, Terms, socials). |
| `ascii-scene.tsx` | `AsciiScene` | — | ⚠️ **Dead code.** R3F/three 3D scene, no longer imported anywhere since the COMPUTE sections were deleted. Delete it (and check if `@react-three/fiber`/`three` deps become removable) or repurpose deliberately. |

`metrics-section.tsx` was deleted in the Mortar-layout redesign — its stats moved into Hero/About.

## components/work/

| File | Contents |
|---|---|
| `work-card.tsx` | `WorkCard({ item: WorkItem })` — the ONE shared card for both FeaturedWorkSection and `/work` (rule: never fork a second). 4:3 cover `<img>` with hover "View details" pill overlay (link variant only), display-size title (+ArrowUpRight if external link), bordered uppercase category chip, mono year/client row, summary. Renders as `<a target="_blank">` when `item.href` exists, plain `<div>` otherwise. |

## components/ui/

57 shadcn/ui primitives (new-york style) — standard generated files, don't document or hand-edit individually. Currently in use by our code: `button`, `input`, `textarea`, `form`, `sonner`. Full set: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button-group, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input-group, input-otp, input, item, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip (+ `use-mobile`, `use-toast` copies).

## lib/ & hooks/

| File | Contents |
|---|---|
| `lib/utils.ts` | `cn()` — clsx + tailwind-merge. Used for all conditional classes. |
| `lib/data/work.ts` | `WorkItem` type + `workItems: WorkItem[]` (8 placeholder projects, 4 `featured: true`, all `coverImage: "/placeholder.jpg"`, 2 with external `href`). Single source of truth for both work displays — shape documented in [content-structure.md](content-structure.md). |
| `hooks/use-mobile.ts` | `useIsMobile()` — matchMedia < 768px. |
| `hooks/use-toast.ts` | Legacy shadcn toast store hook — note the app actually uses **sonner** for toasts (contact form), not this. |

## public/

`placeholder.jpg` (used by all work cards), `placeholder-logo.*`, `placeholder-user.jpg`, favicon set (`icon.svg`, `icon-{light,dark}-32x32.png`, `apple-icon.png`), and `images/` — leftover COMPUTE-era art. Of those, only `images/whale.png` is still referenced (pricing-section background); audit/bridge/encrypted/isolated/permissions/shield are unused and safe to delete.

## Testing

Vitest + React Testing Library (jsdom). `pnpm test` (single run) / `pnpm test:watch`. **Convention: tests are colocated next to the file they cover as `<name>.test.ts(x)`** — discovery is restricted to `**/*.test.{ts,tsx}`. Test files import `describe`/`it`/`expect`/`vi` explicitly from `vitest` (no globals, so ESLint needs no globals config). Tests never hit the network (static export — there is no API).

| File | Contents |
|---|---|
| `vitest.config.mts` (root) | jsdom environment, `vite-tsconfig-paths` (resolves `@/*`), setup file, include/exclude patterns. Not part of the Next.js build. |
| `vitest.setup.ts` (root) | jest-dom matchers, RTL `cleanup()` after each test, inert stubs for `IntersectionObserver` / `ResizeObserver` / `window.matchMedia` (jsdom lacks them; the animation-heavy sections and `use-mobile` need them). |
| `components/work/work-card.test.tsx` | `WorkCard` rendering: title/category/year/client/summary; `<a target="_blank" rel="noopener noreferrer">` only when `item.href` is set. |
| `lib/data/work.test.ts` | `workItems` data integrity: unique slugs, non-empty title/summary/coverImage, ≥4 `featured`, root-relative cover paths. |
| `components/landing/contact-section.test.tsx` | Contact form: 3 zod messages on empty submit; valid submit fires mocked sonner toast + resets fields; asserts no `fetch`. |
