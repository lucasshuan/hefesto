# ---------- builder ----------

FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

COPY .npmrc pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json

RUN pnpm -w i --frozen-lockfile

COPY . .

RUN pnpm -w -r --filter @hefesto/api build
RUN pnpm --filter @hefesto/api deploy /out

# ---------- runner ----------

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /out .

EXPOSE 3000

CMD ["node", "dist/main.js"]