# Design rules

Direction: keep the current dark, minimal, technical aesthetic — reskin copy and section content for an agency, don't redesign the visual system.

## Tokens

- Colors are CSS variables in [app/globals.css](../app/globals.css) via Tailwind v4's CSS-first config (`@import 'tailwindcss'`, no `tailwind.config.*` file). `:root` holds the light-mode values, `.dark` holds the dark-mode values (oklch, plus the two hex section tones below); the `@custom-variant dark (&:is(.dark *))` variant switches between them. Add new tokens to both blocks if genuinely needed — don't hardcode new hex/oklch values inline in components.
- **Light/dark mode is real and user-toggleable**, wired via `next-themes` (`ThemeProvider` in [app/layout.tsx](../app/layout.tsx) wrapping `components/theme-provider.tsx`, `attribute="class"`, `defaultTheme="dark"`). The switch itself is `components/theme-toggle.tsx` — a fixed, vertical half-capsule pinned to the right edge of the viewport (`fixed right-0 top-1/2 -translate-y-1/2`), built from the shadcn `Switch` primitive with `Sun`/`Moon` end-caps, rendered once site-wide in `app/layout.tsx` (not per-page, not part of `Navigation`).
- **Section background alternation**: `--section` / `--section-2` (utility classes `bg-section` / `bg-section-2`) are two alternating section-background tones. Dark mode: `#37353E` / `#44444E`. Light mode: a near-white pair mirroring the same subtle two-step contrast. Every full-bleed section on the home page (`app/page.tsx`) alternates strictly in order — Hero, About, both `CtaMarquee` instances (via its `variant="a"|"b"` prop), FeaturedWork, Services, Process, Testimonials, Articles, Pricing, Contact, Footer — **except `Navigation`**, which keeps its own translucent `bg-background/80` pill treatment regardless of scroll/theme state. `/work` and `/work/[slug]` are single flat pages (not stacked sections), so they keep one `bg-section` tone rather than alternating.
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

- The `ascii-scene.tsx` 3D piece (via `@react-three/fiber`) sets the "premium technical" tone for the hero — don't add competing heavy motion elsewhere.
- Keep other transitions subtle (opacity/transform on scroll or hover) — no gratuitous animation on the Work grid or Services cards.

## Imagery (new for Work section)

- `next.config.mjs` sets `images.unoptimized: true` — there is no build-time image optimization pipeline. Pre-size and compress work/project cover images before adding them to `public/`.
- Work card covers should share one aspect ratio across the grid (pick one, e.g. 4:3 or 16:10) — don't let mixed aspect ratios break the grid rhythm.

## Accessibility baseline

- Maintain contrast against the dark background for any new text color — check against `--foreground`/`--muted-foreground`, don't introduce low-contrast grays.
- Interactive elements (nav links, work cards, filter buttons) need visible focus states — shadcn/ui primitives handle this by default, don't strip it when customizing.
