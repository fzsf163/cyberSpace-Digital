# syntax=docker/dockerfile:1

# ---- Stage 1: install deps ----
FROM node:24-alpine3.21 AS deps
WORKDIR /app
# Pin pnpm to the version in package.json's packageManager field, not @latest.
RUN corepack enable && corepack prepare pnpm@9.12.1 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Stage 2: build ----
FROM node:24-alpine3.21 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.12.1 --activate
COPY --from=deps /app/node_modules ./node_modules
# .dockerignore gates this so only source needed for the build enters the context.
COPY . .
RUN pnpm build

# ---- Stage 3: runtime — standalone Next server, no shell/package manager ----
FROM node:24-alpine3.21 AS runner
# Fed at build time from package.json, e.g. --build-arg APP_VERSION=$(pnpm pkg get version)
ARG APP_VERSION=0.1.0
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

LABEL org.opencontainers.image.title="cyberspace-digital" \
      org.opencontainers.image.description="CyberSpace Digital agency site (Next.js standalone server)" \
      org.opencontainers.image.version=$APP_VERSION \
      org.opencontainers.image.source="https://github.com/fzsf163/cyberSpace-Digital" \
      org.opencontainers.image.licenses="UNLICENSED"

WORKDIR /app

# standalone output excludes public/ and .next/static — copy them in explicitly
# or every asset request 404s. Ownership set at copy time, no separate chown layer.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
