# Component conventions

## Folder split

- `components/ui/` — shadcn/ui primitives only (`style: "new-york"`, see [components.json](../components.json)). Add new primitives via the shadcn CLI conventions, don't hand-write files that mimic them — keep this folder generated-feeling and untouched beyond what shadcn produces.
- `components/landing/` — home-page section components, one file per section, composed in order in `app/page.tsx`.
- `components/work/` — new folder for `/work`-specific pieces (`WorkCard`, `WorkGrid`, `WorkFilter`). Keep it separate from `landing/` since `/work` is a different page — but the Work card component itself should be shared/imported by both the home page's Featured Work section and `/work` (see [content-structure.md](content-structure.md) — one card component, not two).

## Rules

- Always import via the `@/*` path alias (`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) — never deep relative paths (`../../components/...`).
- Use `cn()` from `lib/utils.ts` for all conditional/merged class names — don't concatenate template strings for classes.
- Icons come from `lucide-react` (already a dependency) — don't add a second icon library.
- New shared UI needs (buttons, cards, badges for category tags on work items) should check `components/ui/` first before writing a bespoke component — the shadcn set already covers most primitives (57 components currently installed).
