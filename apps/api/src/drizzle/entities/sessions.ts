import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'

export const sessions = pgTable('session', {
  ...baseColumns,
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: stringBigint('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}).enableRLS()
