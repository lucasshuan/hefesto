# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

COPY .npmrc pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./

COPY apps/api/package.json apps/api/package.json

RUN pnpm -w fetch

COPY . .

RUN pnpm -w install --config.frozen-lockfile=true || pnpm -w install

RUN pnpm -C apps/api dlx -p @nestjs/cli@11 nest --version \
 && pnpm -C apps/api dlx -p @nestjs/cli@11 nest build

RUN pnpm -w deploy --filter @hefesto/api /out

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /out .

EXPOSE 3000
CMD ["node", "dist/main.js"]
