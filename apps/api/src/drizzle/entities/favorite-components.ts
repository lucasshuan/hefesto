import { timestamp, pgTable, foreignKey } from 'drizzle-orm/pg-core'
import { components } from './components'
import { users } from './users'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'

export const favoriteComponents = pgTable(
  'favorite_component',
  {
    ...baseColumns,
    componentId: stringBigint('component_id').notNull(),
    userId: stringBigint('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    foreignKey({
      name: 'fk_fc_component',
      columns: [t.componentId],
      foreignColumns: [components.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'fk_fc_user',
      columns: [t.userId],
      foreignColumns: [users.id],
    }).onDelete('cascade'),
  ]
).enableRLS()
