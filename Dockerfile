# ---- Stage 1: install deps ----
FROM node:24-alpine3.21 AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Stage 2: build ----
FROM node:24-alpine3.21 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- Stage 3: serve — Chainguard's hardened, near-zero-CVE nginx ----
FROM cgr.dev/chainguard/nginx:latest AS runner
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 8080