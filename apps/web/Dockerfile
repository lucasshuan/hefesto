FROM node:22-alpine AS base

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY .npmrc pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/config/package.json ./packages/config/package.json

FROM base AS deps

WORKDIR /app

RUN --mount=type=cache,id=pnpmstore,target=/pnpm/store pnpm --filter @hefesto/web i --frozen-lockfile

FROM base AS build

WORKDIR /app

COPY packages/config/package.json /packages/config/package.json
COPY apps/web ./apps/web
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

ENV NEXT_BUILD_STANDALONE=true

RUN pnpm --filter @hefesto/web build

FROM node:22-alpine AS deploy

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/apps/web/public ./public

COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone/ ./
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

WORKDIR /app/apps/web

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
