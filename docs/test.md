# Test / verification rules

Unit tests: **Vitest + React Testing Library** (jsdom). Run `pnpm test` (single pass) or `pnpm test:watch`. Tests are colocated next to the file they cover as `<name>.test.ts(x)`; conventions and the config/setup files are documented in [codebase-map.md](codebase-map.md)'s Testing section. Tests must never hit the network. No e2e framework (Playwright etc.) is configured — browser verification is manual/tool-driven, per the checklist below.

When changing a component that has a colocated test, update the test in the same change. New logic-bearing components (data shaping, conditional rendering, form validation) should ship with a test; purely presentational copy edits don't need one.

## Before calling any change done

1. `pnpm lint` passes.
2. `pnpm test` passes — all Vitest suites, including any tests you just added.
3. `pnpm build` succeeds — this is the real correctness gate (dev mode tolerates more than the production build does; `typescript.ignoreBuildErrors: true` means build success alone doesn't prove types are sound, see [code.md](code.md)).
4. Visually verify **both** pages (`/` and `/work`) in the browser, not just the one you edited — shared chrome (nav/footer) changes affect both.
5. Check both a desktop and a mobile viewport width (resize the preview) — the current nav already has a cramped-at-narrow-width issue worth re-checking after any nav change.
6. Click through the `/` → `/work` nav link and back — confirm client-side routing works and the featured-work-to-full-list handoff (same data source, see [content-structure.md](content-structure.md)) looks consistent.
7. Check the browser console for errors/warnings — zero tolerance for new console errors introduced by a change.

## When to use the `verify` skill

For any change with a runtime surface (i.e. anything that isn't docs/tests-only), run the general end-to-end verification flow in the `verify` skill rather than trusting lint/build alone.
