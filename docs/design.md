# Design rules

Direction: keep the current dark, minimal, technical aesthetic — reskin copy and section content for an agency, don't redesign the visual system.

## Tokens

- Colors are CSS variables in [app/globals.css](../app/globals.css) via Tailwind v4's CSS-first config (`@import 'tailwindcss'`, no `tailwind.config.*` file). `:root` holds the light-mode values, `.dark` holds the dark-mode values (oklch, plus the two hex section tones below); the `@custom-variant dark (&:is(.dark *))` variant switches between them. Add new tokens to both blocks if genuinely needed — don't hardcode new hex/oklch values inline in components.
- **Light/dark mode is real and user-toggleable**, wired via `next-themes` (`ThemeProvider` in [app/layout.tsx](../app/layout.tsx) wrapping `components/theme-provider.tsx`, `attribute="class"`, `defaultTheme="dark"`). The switch itself is `components/theme-toggle.tsx` — a fixed half-capsule pinned to the right edge of the viewport (`fixed right-0 top-1/2 -translate-y-1/2`), rendered once site-wide in `app/layout.tsx` (not per-page, not part of `Navigation`). It's a single tap **button** (`motion.button` from the `motion` package, not a shadcn `Switch`) that spring-animates a `Sun`⇄`Moon` icon swap on click. The button surface is a **solid** `bg-muted`/`border-border` — deliberately not translucent, after an earlier translucent (`bg-background/80`, then `bg-foreground/10-15`) version was reported as blending into the page in both themes. Icon colors: `Moon` is `text-foreground`; `Sun` is a hardcoded `text-amber-800` (not a CSS var — see [component-conventions.md](component-conventions.md) precedent for one-off accent hex/Tailwind colors like the footer's "accepting projects" dot). Both icons use `strokeWidth={2.75}` for a heavier stroke than lucide's default. If you touch this file again, measure actual contrast before picking a color — `text-foreground` alone already measures ~18:1 against the page and brighter accents like `amber-500`/`300` measure *worse* since they're high-luminance themselves.
- **Section background alternation**: `--section` / `--section-2` (utility classes `bg-section` / `bg-section-2`) are two alternating section-background tones. Dark mode: `#37353E` / `#44444E`. Light mode: a near-white pair mirroring the same subtle two-step contrast. Every full-bleed section on the home page (`app/page.tsx`) alternates strictly in order — Hero, ClientLogos, About, CtaMarquee (1st), FeaturedWork, Services, Team, CtaMarquee (2nd), Process, Testimonials, Contact, Footer — the two `CtaMarquee` instances get their tone via the `variant="a"|"b"` prop — **except `Navigation`**, which keeps its own translucent `bg-background/80` pill treatment regardless of scroll/theme state. `/work` and `/work/[slug]` are single flat pages (not stacked sections), so they keep one `bg-section` tone rather than alternating.
- Small interactive elements that sit on top of imagery (the About video placeholder, `WorkCard`'s hover pill/icon button, shadcn's dialog/sheet/drawer overlay scrims) are intentionally left on semantic/neutral tokens (`bg-muted`, `bg-white`, `bg-black/50`) rather than the alternating section tones — they aren't "sections."
- `--radius: 0.25rem` — sharp/technical corners, not soft/rounded. Keep new components consistent with this (don't override to `rounded-xl` etc. without reason).

## Type

Three font variables already wired in [app/layout.tsx](../app/layout.tsx), use them by intent, not interchangeably:

- **Instrument Sans** (`--font-instrument`) — body copy, UI text
- **Instrument Serif** (`--font-instrument-serif`) — display headlines, the "editorial" accent
- **JetBrains Mono** (`--font-jetbrains`) — eyebrows/labels/technical accents (section labels like "01 / Services", stats, metadata) — this is what gives the site its technical-agency feel, use it for work-card metadata (category, year) too

## Layout

- Full-bleed sections (`min-h-screen` or generous vertical padding), each section owns its own background treatment — check an existing section (e.g. `hero-section.tsx`) for the container/padding pattern before inventing a new one.
- Reuse the existing max-width container convention across new sections (Services, Process, Featured Work) rather than picking arbitrary widths per section.

## Motion

- The Hero's background video sets the "premium technical" tone — don't add competing heavy motion elsewhere.
- Keep other transitions subtle (opacity/transform on scroll or hover) — no gratuitous animation on the Work grid or Services cards.

## Imagery (new for Work section)

- `next.config.mjs` sets `images.unoptimized: true` — there is no build-time image optimization pipeline. Pre-size and compress work/project cover images before adding them to `public/`.
- Work card covers should share one aspect ratio across the grid — currently **16:9** (`aspect-16/9` in `work-card.tsx`, changed from the original `4:3` per user request; `object-cover` crops the source images) — don't let mixed aspect ratios break the grid rhythm.

## Scrollbar

- `app/globals.css`'s `@layer base` sets a global thin scrollbar (`scrollbar-width: thin` for Firefox, `::-webkit-scrollbar*` for Chromium/WebKit) with a **fixed hardcoded dark color** (`#37353e` thumb, `#1e1c22` track) — same in both light and dark mode by design, not a CSS var. This was a deliberate user call: don't make it theme-aware or it'll flip to a light track in light mode, which was explicitly rejected.

## Accessibility baseline

- Maintain contrast against the dark background for any new text color — check against `--foreground`/`--muted-foreground`, don't introduce low-contrast grays.
- Interactive elements (nav links, work cards, filter buttons) need visible focus states — shadcn/ui primitives handle this by default, don't strip it when customizing.
