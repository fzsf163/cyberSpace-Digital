# Codebase map

Orientation file: what lives where and what each file contains, so you don't have to re-explore the tree every session. **Keep this updated** — when you add, rename, delete, or repurpose a file, update the matching line here in the same change.

Last synced: 2026-07-15 (floating/route-aware navbar fix, theme-toggle rebuilt as a tap button, work-card 16:9, testimonials carousel, ClientLogos + Team sections added, Pricing/Articles removed, global thin dark scrollbar).

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

`package.json` gained `embla-carousel-autoplay` (testimonials carousel autoplay plugin) and bumped `embla-carousel-react` `8.5.1` → `8.6.0` to satisfy its peer dependency — both via `pnpm add`, reflected in `pnpm-lock.yaml`.

## app/

| File | Contents |
|---|---|
| `layout.tsx` | Root layout. Loads the 3 fonts as CSS variables (`--font-instrument` Sans / `--font-instrument-serif` / `--font-jetbrains` Mono), site metadata ("CyberSpace Digital — Brand, Web & Product Agency"), wraps `{children}` in `ThemeProvider` (`attribute="class"`, `defaultTheme="dark"`, `next-themes`) alongside `<ThemeToggle />`, `<ScrollToTop />`, Vercel `<Analytics />`, sonner `<Toaster />`. `<html>` carries `suppressHydrationWarning` (required by next-themes). |
| `page.tsx` | Home (`/`). Pure composition — renders `HashScroll` then stacks the landing sections in order: Navigation → Hero → ClientLogos → About → CtaMarquee(`variant="b"`) → FeaturedWork → Services → Team → CtaMarquee(`variant="b"`) → Process → Testimonials → Contact → Footer. No Pricing/Articles sections (removed — no package tiers, no blog). Each section owns its own alternating `bg-section` / `bg-section-2` background directly (no flat bg on `<main>`) — see `docs/design.md` for the exact alternation order; `Navigation` is the only piece excluded from it. |
| `work/page.tsx` | `/work`. Own `metadata`, "Selected projects / (2023 — 2026)* / All work." header, 2-col grid of ALL `workItems` via `WorkCard`, wrapped in shared Navigation + FooterSection. `<main>` uses a flat `bg-section` (single page, not alternating stacked sections). |
| `careers/page.tsx` | `/careers`. Fully-designed careers page (server component). Header hero → "What we value" (4 value cards on `bg-section-2`) → "Perks & benefits" (6-item grid) → "How we hire" (4 step rows, Process-section styling) → **Open positions empty state** (no roles currently — bordered panel with "No open roles right now" + `mailto:careers@cyberspace.mx` open-application CTA). Alternates `bg-section`/`bg-section-2`; wrapped in Navigation + FooterSection. |
| `faq/page.tsx` | `/faq`. FAQ page (server component rendering the client `Accordion`). 4 categories (Getting started / Process & timelines / Pricing & engagement / After launch), each a 2-col (sticky category heading + `components/ui/accordion` single-collapsible list). Closes with a "Still have questions?" → `/#contact` CTA. Flat `bg-section`. |
| `privacy/page.tsx` | `/privacy`. Standard privacy policy — thin wrapper that passes `eyebrow`/`title`/`updated`/`intro`/`sections` copy to the shared `components/legal/legal-page.tsx`. 11 sections. |
| `terms/page.tsx` | `/terms`. Standard terms of service — same shared-`LegalPage` wrapper pattern as privacy. 12 sections; governing law = Mexico. |
| `work/[slug]/page.tsx` | `/work/[slug]` project detail page (SSG via `generateStaticParams` over `workItems`; `generateMetadata`; `notFound()` on bad slug). Breadcrumb, title + discipline tags, 16:9 banner, meta bar (industry/client/solution/year/website), Project summary (client needs + approach) / Challenges / Results body with a sticky "Services provided" aside, and prev/next project nav (wraps). Optional `WorkItem` detail fields fall back to defaults. Flat `bg-section`. |
| `globals.css` | Tailwind v4 CSS-first config: `@import 'tailwindcss'`, `:root` (light) + `.dark` (dark) token blocks (`--background`, `--foreground`, `--section`/`--section-2` alternating section-bg pair — dark values are literal hex `#37353e`/`#44444e`, light values are oklch — `--radius: 0.25rem`, chart/sidebar vars), `@custom-variant dark`. `@layer base` also sets a global thin scrollbar (`scrollbar-width: thin` + `::-webkit-scrollbar*`) with a **fixed hardcoded dark color** (`#37353e` thumb / `#1e1c22` track) — deliberately the same in both light and dark mode, not theme-token-driven (user preference: don't let it flip to a light track in light mode). The only styling config file — there is no tailwind.config. |

## components/ (top-level)

| File | Contents |
|---|---|
| `theme-provider.tsx` | Thin `next-themes` `ThemeProvider` wrapper (`"use client"`). Mounted once in `app/layout.tsx`. |
| `legal/legal-page.tsx` | `LegalPage` (server component) + `LegalSection` type — shared shell for the two standalone legal pages (`/privacy`, `/terms`), which are structurally identical (rule: don't fork the layout twice). Header (eyebrow/title/intro/"Last updated") + a 2-col body: sticky numbered table-of-contents (`#id` anchors, `scroll-mt-32`) beside numbered prose sections. Wraps Navigation + FooterSection. |
| `scroll-to-top.tsx` | `ScrollToTop` — fixed bottom-right (`bottom-6 right-6`) circular `motion.button` that appears once `window.scrollY > 400` and smooth-scrolls to top on click. Same solid `bg-muted`/`border-border` surface + `AnimatePresence` spring in/out and hover/tap scale as `theme-toggle.tsx`; `ArrowUp` icon `strokeWidth={2.75}`. Mounted once in `app/layout.tsx`, shows on every route. |
| `scroll-progress.tsx` | `ScrollProgress` — thin (`h-0.5`) fixed top-of-viewport page-scroll indicator; `bg-foreground/80`, `useScroll` + `useSpring` scaling `scaleX` with `originX:0`. Mounted once in `app/layout.tsx`, shows on every route. |
| `motion/reveal.tsx` | Shared Motion scroll-reveal primitives (`"use client"`): `Reveal` (single element fade+rise on `whileInView`, `once`), `RevealGroup` + `RevealItem` (staggered list via variants). All honour `prefers-reduced-motion` (collapse to fade, no movement). Replaced the old per-section IntersectionObserver + Tailwind reveal pattern — now used by services, process, featured-work, client-logos, about, testimonials, team, and contact sections. |
| `motion/count-up.tsx` | `CountUp({ value })` (`"use client"`) — tweens a stat from 0→value the first time it scrolls into view (`useInView` once + `animate`). Parses the site's stat formats (`"120+"`, `"98%"`, `"9 yrs"`, `"3.2x"`) via a prefix/number/suffix regex, preserving decimals; non-numeric input passes through. Reduced-motion → renders the final value, no tween. Used in hero (3 stats) + services (4 stats). |
| `theme-toggle.tsx` | `ThemeToggle` — fixed right-edge half-capsule **tap button** (not a shadcn `Switch` anymore — reverted to the original `feat/light-dark-mode` design: a single `motion.button` from the `motion` package that spring-animates a `Sun`⇄`Moon` icon swap via `AnimatePresence` on click). Button surface is a **solid** `bg-muted`/`border-border` (deliberately not translucent/`backdrop-blur` — an earlier translucent version blended into the page in both themes and was rejected). Icon colors: `Moon` uses `text-foreground` (dark mode), `Sun` uses a hardcoded `text-amber-800` (chosen after measuring: `text-foreground` alone measured ~18:1 contrast — objectively fine — but user found the plain dark sun icon visually flat; a bright accent like `amber-500`/`amber-300` was tried first but actually measures *worse* contrast against a light page since amber is itself high-luminance — `amber-800` is dark enough to both read as "sun-colored" and stay high-contrast). Both icons use `strokeWidth={2.75}` (thicker than lucide's default `2`). Calls `useTheme()` to flip `light`/`dark`. Mounted once in `app/layout.tsx`, shows on every route. |

## components/landing/

All section files are `"use client"` (animation hooks throughout). Each section is self-contained: its copy/data lives as consts at the top of its own file — to edit content, edit that file's const arrays, no external CMS/data file (except featured-work). Layout follows a dark agency reference (Mortar template structure; our code/copy).

| File | Export | Anchor | Contents |
|---|---|---|---|
| `navigation.tsx` | `Navigation` | — | Fixed floating pill nav — always inset from the viewport edges (`top-4/left-4/right-4`, tightening to `top-3/left-3/right-3` once scrolled) with `rounded-2xl` + `backdrop-blur-xl`, not a full-width bar that only becomes a pill on scroll. Route-aware color logic via `isHomeUnscrolled = usePathname() === "/" && !isScrolled`: the hardcoded-white treatment (for floating legibly over the Hero's dark video) only applies in that one case; every other route/state (including `/work`, `/work/[slug]`, and `/` once scrolled) uses theme-aware `text-foreground` tokens. **Fixed bug**: previously `/work` in light mode had invisible white-on-white nav text because the white styling wasn't route-gated. Nav link set (`Services /#services`, `Work /work`, `Process /#process`, `Careers /careers`, `FAQ /faq`) covers every top-level destination except the legal pages, which stay footer-only; CTA is `Start a project /#contact`. Home-section links (`/#services`, `/#process`, `/#contact`) render via `SectionLink` so they work from any route; real routes (`/work`, `/careers`, `/faq`) use the client router. Desktop link gap is `gap-8 lg:gap-10` (tightened from `gap-12` to fit 5 links). The `/#pricing` link was removed (no Pricing section exists). |
| `section-link.tsx` | `SectionLink` | — | Anchor to a home section (`/#id`). On `/` it smooth-scrolls in place (preventDefault + `scrollIntoView` + `replaceState`); on other routes it does a normal full navigation to `/#id` and lets `HashScroll` land the scroll. Used by `navigation.tsx` (and available to footer/CTAs). |
| `hash-scroll.tsx` | `HashScroll` | — | Client, renders null. On home mount, if the URL has a `#section`, scrolls to it with `behavior:"instant"` immediately + a few timed retries (native hash scroll is defeated by `scroll-behavior:smooth` + the tall page's load-time reflow). Rendered once in `app/page.tsx`. |
| `hero-section.tsx` | `HeroSection` | — | Full-screen: eyebrow tag "(2016 — 2026)", giant static "Pioneering digital excellence." headline, right-shifted sub copy + CTA pill, stats row, background video (vercel-blob mp4), bottom scrolling marquee strip. |
| `client-logos-section.tsx` | `ClientLogosSection` | — | "Trusted by" eyebrow (scroll-reveal via `motion/reveal`) + a continuously auto-scrolling marquee (CSS keyframe, same technique as `cta-marquee.tsx`; frozen under `prefers-reduced-motion`) of ~8 made-up client wordmarks rendered as text logotypes (`font-display`, reduced opacity) — no image logo assets exist. Sits right after Hero as immediate social proof. |
| `about-section.tsx` | `AboutSection` | — | Two-column: heading/copy + achievement rows with big numerals (left, staggered `RevealGroup`/`RevealItem`); autoplay muted looping studio-reel `<video>` with placeholder poster (right, sticky `Reveal`). "See the work" → `#work`. |
| `cta-marquee.tsx` | `CtaMarquee` | — | Reusable band: scrolling "Let's build something great" display-text marquee + centered "Start a project" pill → `#contact`. Rendered twice on the home page, each call passing `variant="a"|"b"` to alternate its `bg-section`/`bg-section-2`. |
| `services-section.tsx` | `ServicesSection` | `services` | "Scope of work." — 4 stacked full-width rows: number, 2-line display title, description, `+ capability` list, right-aligned stat. Scroll reveals via shared `motion/reveal` (`Reveal` header + `RevealGroup`/`RevealItem` staggered rows). |
| `process-section.tsx` | `ProcessSection` | `process` | "Solution in process." — 3 giant step rows (Step 01–03) + founder quote block (Alex Morgan placeholder), on the alternating `bg-section`/`bg-section-2` background (text uses `text-foreground` variants, not hardcoded white, so it stays readable in light mode). Scroll reveals via shared `motion/reveal` (`Reveal` + `RevealGroup`/`RevealItem`). |
| `featured-work-section.tsx` | `FeaturedWorkSection` | `work` | "Selected projects / (2023 — 2026)* / Latest work." — first 4 `featured` items from `lib/data/work.ts` via shared `WorkCard` in a 2-col grid (staggered `RevealGroup`/`RevealItem`); centered "View all work" pill → `/work`. Only landing section with an external data source. |
| `team-section.tsx` | `TeamSection` | — | "The team." — intro copy + a grid of ~5 made-up team members (name, role, one-line bio, initials-circle avatar reusing the testimonials avatar treatment, sized up), staggered in via `RevealGroup`/`RevealItem`. Sits between Services and the second `CtaMarquee`. |
| `testimonials-section.tsx` | `TestimonialsSection` | — | "They love us." + 5-star REVIEWED badge; auto-playing carousel (shadcn `components/ui/carousel.tsx` + `embla-carousel-autoplay`, 4s delay, pauses on hover) of 8 review cards (avatar initial, name/role, bold headline, quote) — `lg:basis-1/3` (3-up desktop), `sm:basis-1/2` (2-up tablet), `basis-full` (1-up mobile). No longer a static 2×2 grid. `CarouselPrevious`/`CarouselNext` de-rounded (`rounded-none`) to match the site's sharp-corner convention. |
| `contact-section.tsx` | `ContactSection` | `contact` | Repeated-word "Contact" marquee strip (global `animate-contact-marquee`, frozen under `prefers-reduced-motion`) + a spotlight-on-mousemove card (`Reveal`-wrapped) holding the contact form (name/email/message) — react-hook-form + zod schema (`contactFormSchema`) + shadcn Form/Input/Textarea/Button. Valid submit POSTs to **Web3Forms** (`api.web3forms.com/submit`, key from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) — success toast + reset on `data.success`, error toast otherwise (fields kept). `isSubmitting` disables the button. A hidden registered `botcheck` honeypot field rides along in the payload so Web3Forms drops bot submissions. |
| `footer-section.tsx` | `FooterSection` | — | 4 link columns (Services/Company/Resources/Legal) + socials. Section links are root-relative (`/#services`, `/#process`, `/#testimonials`) so they resolve from `/work` too. Careers/FAQ/Privacy/Terms now link to their real routes (`/careers`, `/faq`, `/privacy`, `/terms`); only the socials remain `href="#"` placeholders. The old per-link `badge` ("Hiring") was dropped along with its render path — there are no open roles. No Pricing or Blog entries — both removed (no package tiers, no blog). |
| `ascii-scene.tsx` | `AsciiScene` | — | ⚠️ **Dead code.** R3F/three 3D scene, no longer imported anywhere since the COMPUTE sections were deleted. Delete it (and check if `@react-three/fiber`/`three` deps become removable) or repurpose deliberately. |

`metrics-section.tsx` was deleted in the Mortar-layout redesign — its stats moved into Hero/About.

## components/work/

| File | Contents |
|---|---|
| `work-card.tsx` | `WorkCard({ item: WorkItem })` (`"use client"`) — the ONE shared card for both FeaturedWorkSection and `/work` (rule: never fork a second). Outer element is a `motion.create(Link)` to `/work/[slug]` with a subtle `whileHover={{ y: -4 }}` + `whileTap` spring lift (reduced-motion users get none, via the global `MotionConfig`); all other hover effects remain CSS `group-hover`. **16:9** cover `<img>` (`aspect-16/9`, changed from the original `aspect-4/3` — user request; `object-cover` crops the existing cover images, which weren't authored at 16:9, to fit) with a square inverted-radius cut in the top-right corner — an illusion, not a mask: a 3.5rem `bg-section` patch div covers the image corner (both card contexts, FeaturedWorkSection and `/work`, sit on `bg-section`, so the patch disappears into the page), with a 1rem `rounded-bl-[1rem]` inner corner and two 1rem radial-gradient pseudo-element flares blending the cut into the top/right edges. A white circular `+` badge nests in the cut and, on hover, a "View details" pill scales out to its left (`+` rotates 90°). Below: `bg-card` panel with display title, muted summary, bordered uppercase category pill. |

## components/ui/

57 shadcn/ui primitives (new-york style) — standard generated files, don't document or hand-edit individually. Currently in use by our code: `button`, `input`, `textarea`, `form`, `sonner`, `accordion` (FAQ page), `carousel` (testimonials). Full set: accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button-group, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input-group, input-otp, input, item, kbd, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip (+ `use-mobile`, `use-toast` copies).

## lib/ & hooks/

| File | Contents |
|---|---|
| `lib/utils.ts` | `cn()` — clsx + tailwind-merge. Used for all conditional classes. |
| `lib/data/work.ts` | `WorkItem` type + `workItems: WorkItem[]` (8 projects, 4 `featured: true`, `coverImage` from `/images/*`, 2 with external `href`) + optional detail-page fields (tags/industry/solution/website/needs/approach/services/challenge/results, all with fallbacks) + `getWorkItem(slug)` / `getAdjacentWork(slug)` helpers. Single source of truth for both work displays + `/work/[slug]` — shape documented in [content-structure.md](content-structure.md). |
| `hooks/use-mobile.ts` | `useIsMobile()` — matchMedia < 768px. |
| `hooks/use-toast.ts` | Legacy shadcn toast store hook — note the app actually uses **sonner** for toasts (contact form), not this. |

## public/

`placeholder.jpg`/`placeholder-logo.*`/`placeholder-user.jpg` (generic placeholders), favicon set (`icon.svg`, `icon-{light,dark}-32x32.png`, `apple-icon.png`), and `images/` — repurposed COMPUTE-era 3D art now used as work-card / detail covers (`audit`, `bridge`, `encrypted`, `isolated`, `permissions`, `shield`, `whale`, mapped per project in `lib/data/work.ts`).

## Testing

Vitest + React Testing Library (jsdom). `pnpm test` (single run) / `pnpm test:watch`. **Convention: tests are colocated next to the file they cover as `<name>.test.ts(x)`** — discovery is restricted to `**/*.test.{ts,tsx}`. Test files import `describe`/`it`/`expect`/`vi` explicitly from `vitest` (no globals, so ESLint needs no globals config). Tests never hit the real network — the contact test stubs `fetch` (and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) to exercise the Web3Forms submit paths without a live request.

| File | Contents |
|---|---|
| `vitest.config.mts` (root) | jsdom environment, `vite-tsconfig-paths` (resolves `@/*`), setup file, include/exclude patterns. Not part of the Next.js build. |
| `vitest.setup.ts` (root) | jest-dom matchers, RTL `cleanup()` after each test, inert stubs for `IntersectionObserver` / `ResizeObserver` / `window.matchMedia` (jsdom lacks them; the animation-heavy sections and `use-mobile` need them). |
| `components/work/work-card.test.tsx` | `WorkCard` rendering: title/category/year/client/summary; `<a target="_blank" rel="noopener noreferrer">` only when `item.href` is set. |
| `lib/data/work.test.ts` | `workItems` data integrity: unique slugs, non-empty title/summary/coverImage, ≥4 `featured`, root-relative cover paths. |
| `components/landing/contact-section.test.tsx` | Contact form (fetch + env stubbed): 3 zod messages on empty submit (no fetch); successful Web3Forms submit posts the right URL/body, fires success toast + resets; `success:false` and network-throw both fire an error toast and keep the fields; honeypot (`botcheck`) value flows into the payload. |
