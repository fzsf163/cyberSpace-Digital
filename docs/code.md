# Code rules

## Static export constraints

`next.config.mjs` sets `output: "export"`. This means, hard rules, not preferences:

- No API routes, no server actions, no middleware, no ISR/`revalidate` — everything must resolve at build time.
- No dynamic route segments without `generateStaticParams` producing a fixed, known set at build time. We don't have per-project detail pages, so this shouldn't come up — if a task seems to need one, confirm with the user first (see [planning.md](planning.md) scope discipline).
- `images.unoptimized: true` is already set — don't try to reintroduce `next/image` optimization, it's a no-op under static export anyway.

## Data

- `lib/data/work.ts` is the single source of truth for work/project items (shape defined in [content-structure.md](content-structure.md)). Both the home page's Featured Work section and `app/work/page.tsx` import from it — never duplicate the array or hardcode a second list.
- Filtering (category filter on `/work`) is client-side over this static array — no fetch, no backend.

## TypeScript

- `tsconfig.json` has `strict: true`, but `next.config.mjs` also sets `typescript.ignoreBuildErrors: true`. That flag is a deploy safety net, not permission to leave type errors — `pnpm build` will succeed even with type errors, so don't use a clean build as proof the types are correct. Check types are actually sound.

## Routing

- New page = new `app/<route>/page.tsx`. The `/work` route is `app/work/page.tsx`.
- Shared chrome (Navigation, Footer) should be imported into both `app/page.tsx` and `app/work/page.tsx` from `components/landing/` — don't fork a second nav/footer for the new page.

## Package manager

- pnpm only (`packageManager` pinned in [package.json](../package.json)). Don't generate or commit a `package-lock.json` or `yarn.lock`.
- Run `pnpm lint` before considering a code change done.
