import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseColumns } from '../helpers/columns'

export const verifications = pgTable('verifications', {
  ...baseColumns,
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
}).enableRLS()
