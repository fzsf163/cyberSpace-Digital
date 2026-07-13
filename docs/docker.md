# Docker rules

Rules for all Dockerfile / compose.yaml / .dockerignore work in this repo. The checklist below is binding — every image change gets reviewed against it, category by category.

## Repo context (read before editing)

- Next.js app, `output: "standalone"` in [next.config.mjs](../next.config.mjs) — `pnpm build` emits `.next/standalone/server.js` (a self-contained Node server with its own pruned `node_modules`). **It does NOT include `public/` or `.next/static`** — both must be copied next to `server.js` in the runtime stage or all assets 404.
- The current [Dockerfile](../Dockerfile) predates the standalone switch: it still copies `out/` into an nginx image. `out/` is no longer produced — that shape is stale and any rework targets a **Node runtime stage running `server.js`** (default port 3000, honors `PORT`/`HOSTNAME` env; bind `HOSTNAME=0.0.0.0` in containers).
- [compose.yaml](../compose.yaml) already applies good hardening (`no-new-privileges`, `cap_drop: ALL`, `read_only` + tmpfs, mem/cpu limits) — preserve these when reworking; adjust tmpfs mounts to what the Node server actually needs (e.g. `.next/cache` if image optimization were ever enabled — it isn't, `images.unoptimized: true`).
- Package manager: pnpm via corepack. Lockfile: `pnpm-lock.yaml`. App version: read from [package.json](../package.json) `version` field — that is the source for image tags and labels.

## 1. Build

1. **Minimal base images** — smallest image that runs the artifact: `node:<ver>-alpine` (or slim) for build stages; for runtime prefer a minimal Node image (alpine/slim or a distroless/Chainguard Node) — never a full-fat `node:<ver>` default image.
2. **Multi-stage build** — separate `deps` → `builder` → `runner` stages; only build artifacts cross stage boundaries. The final stage must contain no pnpm store, no source tree, no devDependencies.
3. **Derive the version from the project** — take the app version from `package.json` (e.g. a build `ARG APP_VERSION` fed by `pnpm pkg get version` or parsed in CI), use it for the image tag and the `org.opencontainers.image.version` label. Don't hardcode a version string that can drift.

## 2. Optimization

1. **Layer caching** — order instructions from least- to most-frequently changing: base + system setup first, then `package.json`/`pnpm-lock.yaml` + install, then the rest of the source. Copying the lockfile before the source is what makes dependency layers cacheable. Fewer, deliberate layers — don't split one logical action across many.
2. **Combine RUN commands** — chain related shell steps with `&&` in one RUN; clear package-manager caches in the same layer they're created (`--no-cache` on apk, `pnpm store prune`, etc. — cleanup in a later layer saves nothing). Set file ownership/permissions inside the RUN/COPY that creates the files (`COPY --chown=`), not as a separate layer.
3. **Explicit COPY** — never `COPY . .` in a runtime stage; name exactly what crosses stages (`.next/standalone`, `.next/static`, `public`). In the builder, `COPY . .` is acceptable only because `.dockerignore` gates it — keep `.dockerignore` in sync with anything new that shouldn't enter the build context (`.next/`, `out/`, `docs/`, `reports/`, `*.test.*`, `.claude/`).
4. **Production deps only** — final image carries `.next/standalone`'s pruned node_modules only. Never `pnpm install` in the runner stage; never let devDependencies (vitest, eslint, testing-library) into it.

## 3. Security

1. **Non-root user** — runtime stage runs as an unprivileged user (`USER node` on Node images, or the image's prebuilt nonroot user). Files it must read are `--chown`ed to it at COPY time.
2. **Pin image versions** — exact tags (`node:24-alpine3.21`), never `latest` / bare `node`. Also pin the pnpm major activated via corepack (`corepack prepare pnpm@<pinned> --activate` — match `packageManager` in package.json rather than `pnpm@latest`, which the current Dockerfile gets wrong).
3. **Official images** — Docker Official Library or the vendor's own registry (Chainguard, Distroless) only. No community re-bundles.
4. **No secrets in image** — no env files, tokens, or registry credentials via COPY/ENV/ARG (ARGs persist in history). This app needs no runtime secrets; if that ever changes, secrets arrive at run time (compose `secrets:`/env), never at build time.
5. **No sudo** — never install or invoke sudo; if a step needs root, do it before dropping to the non-root user.
6. **Minimal packages** — install nothing beyond what build or runtime strictly needs; no `curl`/`git`/build-essential in the runner. If a healthcheck needs a probe, prefer a `node -e "fetch(...)"` one-liner over installing curl/wget.
7. **COPY over ADD** — always COPY. ADD's URL-fetch and auto-extract behaviors are implicit and unauditable; there is no valid use of ADD in this repo.
8. **No debugging tools** — no shells-and-toolbox images, no devtools, no source maps beyond what Next emits by default in the final image. Debug locally, not via tooling baked into production layers.

## 4. Maintainability

1. **Sort arguments** — multi-item instructions (apk add lists, tmpfs mounts, EXPOSE lists) alphabetically sorted, one per line where the syntax allows — diffs stay reviewable.
2. **Use WORKDIR** — absolute `WORKDIR /app` (per stage); never `cd` in RUN, never relative-path gymnastics.
3. **Exec form for CMD/ENTRYPOINT** — `CMD ["node", "server.js"]`, not shell form — shell form breaks signal handling (SIGTERM lands on `sh`, not node) and graceful shutdown.
4. **Comment non-obvious decisions** — every deviation or surprise gets a one-line comment stating the constraint (e.g. *why* `public/` is copied separately — standalone doesn't include it). Don't comment the self-evident.
5. **OCI labels** — runtime stage carries `org.opencontainers.image.{title,description,version,source,licenses}`; `version` comes from the package.json-derived ARG (rule 1.3), `source` is the GitHub repo URL.

## Verification

A Docker change isn't done until: `docker build` completes from a clean context, the image runs (`docker run` or `docker compose up`) and serves `/` and `/work` with HTTP 200 **including static assets** (`/_next/static/...` and `/placeholder.jpg` — the classic standalone mistake is HTML-200s with 404 assets), the container process runs as non-root (`docker exec whoami` ≠ root), and image history shows no secrets. If the Docker daemon isn't available in your environment, say so explicitly and list which of these checks were skipped — don't claim them.
