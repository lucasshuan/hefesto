FROM node:22-alpine AS base

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

FROM base AS build

WORKDIR /app

COPY .npmrc pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api ./apps/api
COPY packages/config/package.json ./packages/config/package.json

RUN --mount=type=cache,id=pnpmstore,target=/pnpm/store pnpm --filter @hefesto/api i --frozen-lockfile
RUN pnpm --filter @hefesto/api build
RUN pnpm --filter @hefesto/api deploy --prod /out

FROM base AS deploy

ENV NODE_ENV=production

COPY --from=build /out /app/out

WORKDIR /app/out

EXPOSE 3001
CMD ["pnpm", "start:prod"]
