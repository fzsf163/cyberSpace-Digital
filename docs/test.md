# Test / verification rules

No automated test framework is configured in this repo (no Jest/Vitest/Playwright) — verification is build- and browser-based. Don't add a test framework speculatively; if the user wants one, that's a separate decision.

## Before calling any change done

1. `pnpm lint` passes.
2. `pnpm build` succeeds — this is the real correctness gate (dev mode tolerates more than the static export build does; `typescript.ignoreBuildErrors: true` means build success alone doesn't prove types are sound, see [code.md](code.md)).
3. Visually verify **both** pages (`/` and `/work`) in the browser, not just the one you edited — shared chrome (nav/footer) changes affect both.
4. Check both a desktop and a mobile viewport width (resize the preview) — the current nav already has a cramped-at-narrow-width issue worth re-checking after any nav change.
5. Click through the `/` → `/work` nav link and back — confirm client-side routing works and the featured-work-to-full-list handoff (same data source, see [content-structure.md](content-structure.md)) looks consistent.
6. Check the browser console for errors/warnings — zero tolerance for new console errors introduced by a change.

## When to use the `verify` skill

For any change with a runtime surface (i.e. anything that isn't docs/tests-only), run the general end-to-end verification flow in the `verify` skill rather than trusting lint/build alone.
