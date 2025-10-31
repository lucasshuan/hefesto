import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export type DbClient = NodePgDatabase<typeof import('@/drizzle/schema')>
