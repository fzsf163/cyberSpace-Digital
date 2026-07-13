# Deployment rules

- `output: "export"` — `pnpm build` produces a fully static `out/` directory. Deploy targets are Netlify ([netlify.toml](../netlify.toml), publishes `out/`) and Docker/nginx ([Dockerfile](../Dockerfile), [compose.yaml](../compose.yaml)).
- Adding the `/work` route needs no deploy config changes — it's picked up automatically as another static page in `out/` as long as it stays a plain static page (no dynamic params, see [code.md](code.md)).
- `images.unoptimized: true` — there's no image optimization step in the deploy pipeline. Ship correctly-sized assets in `public/` directly; don't rely on Next.js to resize/compress work-project cover images at build or request time.
- Both deploy targets serve the site as pure static files behind nginx — no server-side logic will ever run in production. If a feature seems to need one (form submission backend, etc.), flag it to the user rather than assuming it can be added later without changing the deploy shape.
