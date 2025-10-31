<p align="center">
  <img src="https://hefesto.felsen.io/logo.svg" alt="Hefesto Logo" width="120" />
</p>

<h1 align="center">Hefesto</h1>

<p align="center">
  <a href="https://hefesto.felsen.io" target="_blank"><strong>hefesto.felsen.io</strong></a>
</p>

<p align="center">
  Computer hardware listings with multi-source price history, tracking, and favorites — built as a modern monorepo.
</p>

## Overview

Hefesto is a platform for discovering and tracking PC components across multiple sources (marketplaces and retailers). It supports user accounts, favorites, watchlists, and historical pricing so you can make informed buying decisions.

This repository is a **monorepo** managed with Turborepo and pnpm.

## Features

- Accounts & sessions (Google OAuth)
- Brands, categories, components, sources
- Multi-source listings
- Price history & availability tracking
- Favorites / watchlists
- Alerts for price drops and stock changes
- Admin dashboard for managing brands, sources, and components
- Multi-language support
- Microservices & micro-frontends architecture
- API-first design with full typed client generation (Orval)

## Tech Stack

- **Frontend:** Next.js (apps/web)
- **Backend:** NestJS (apps/api)
- **ORM:** Drizzle ORM + PostgreSQL
- **Auth:** Cookie-based sessions with Google OAuth
- **Typed Clients:** Generated via Orval from OpenAPI schema
- **Monorepo tooling:** Turborepo + pnpm
- **Packages:** Shared UI (shadcn/ui), config, and generated types
- **Internationalization:** next-intl
- **Lint/Format:** ESLint + Prettier

## Monorepo Layout

```
apps/
  api/        # NestJS HTTP API
  web/        # Next.js web app

packages/
  config/     # Shared config (e.g., ESLint)
  types/      # (planned) Orval-generated API types
  ui/         # Shared UI components

tooling/      # (reserved for internal tooling)
```

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm 10.x

### Install

```bash
pnpm install
```

### Development

Run all apps in parallel:

```bash
pnpm dev
```

Build all:

```bash
pnpm build
```

Lint & format:

```bash
pnpm lint
pnpm format
```

Type check:

```bash
pnpm typecheck
```

## Applications

### API (`apps/api/`)

NestJS REST API that powers the platform.  
Provides authentication, listings, and resource management endpoints for brands, components, sources, and more.

API documentation (Scalar) is available at `/docs`

The OpenAPI schema is used to generate fully typed clients through **Orval**.

### Web (`apps/web/`)

Next.js frontend consuming the API, featuring browsing, search, and user features (favorites, tracking), with future micro-frontend expansion.

## Roadmap

- Orval client generation in `packages/types`
- Shared UI kit in `packages/ui`
- Price ingestion & schedulers (multi-source)
- Alerts (price drops, stock changes)
- Micro-services & micro-frontends
- i18n (EN/PT) across web & API responses
- Admin dashboards (brands, sources, components)

## License

TBD
