# ---------- deps ----------
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

COPY .npmrc pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json

RUN pnpm -w install --frozen-lockfile

# ---------- build ----------
FROM deps AS build
WORKDIR /app

COPY . .

RUN pnpm -w --filter @hefesto/api exec node -e "console.log(require.resolve('@nestjs/cli/package.json'))"
RUN pnpm -w -r --filter @hefesto/api build
RUN pnpm --filter @hefesto/api deploy --prod /out

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /out .

EXPOSE 3000
CMD ["node", "dist/main.js"]
