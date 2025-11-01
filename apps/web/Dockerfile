FROM node:22-alpine AS base

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

FROM base AS build

WORKDIR /app

COPY .npmrc pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web ./apps/web
COPY packages/config/package.json ./packages/config/package.json

RUN --mount=type=cache,id=pnpmstore,target=/pnpm/store pnpm --filter=@hefesto/web i --frozen-lockfile
RUN pnpm --filter @hefesto/web build
RUN pnpm --filter @hefesto/web deploy --prod /out

FROM base AS deploy

ENV NODE_ENV=production

COPY --from=build /out/.next ./app/out/.next
COPY --from=build /out/dist ./app/out/dist
COPY --from=build /out/public ./app/out/public
COPY --from=build /out/package.json ./app/out/package.json
COPY --from=build /out/node_modules ./app/out/node_modules

WORKDIR /app/out

EXPOSE 3000
CMD ["pnpm", "start"]
