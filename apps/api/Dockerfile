FROM node:23-alpine AS base

WORKDIR /app

RUN corepack enable pnpm && corepack prepare pnpm@10.20.0 --activate
COPY .npmrc pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/package.json

FROM base AS deps

WORKDIR /app

RUN --mount=type=cache,id=pnpmstore,target=/pnpm/store pnpm --filter @hefesto/api i --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY packages/config/package.json /packages/config/package.json
COPY apps/api ./apps/api
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules

RUN pnpm --filter @hefesto/api build
RUN pnpm --filter @hefesto/api deploy --prod /out

FROM node:22-alpine AS runner

ENV NODE_ENV=production

COPY --from=builder /out /app

WORKDIR /app

EXPOSE 3001
CMD ["node", "dist/main.js"]
