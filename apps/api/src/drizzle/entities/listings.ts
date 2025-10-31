import {
  pgTable,
  boolean,
  varchar,
  uniqueIndex,
  index,
  foreignKey,
} from 'drizzle-orm/pg-core'
import { components } from './components'
import { sources } from './sources'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'

export const listings = pgTable(
  'listings',
  {
    ...baseColumns,
    componentId: stringBigint('component_id').notNull(),
    sourceId: stringBigint('source_id').notNull(),
    url: varchar('url', { length: 2048 }).notNull(),
    available: boolean('available').default(true).notNull(),
    currency: varchar('currency', { length: 3 }).default('BRL').notNull(),
  },
  (t) => [
    uniqueIndex('uq_listing_source_component').on(t.sourceId, t.componentId),
    index('idx_listing_component').on(t.componentId),
    index('idx_listing_source').on(t.sourceId),
    foreignKey({
      name: 'fk_listing_component',
      columns: [t.componentId],
      foreignColumns: [components.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'fk_listing_source',
      columns: [t.sourceId],
      foreignColumns: [sources.id],
    }).onDelete('cascade'),
  ]
).enableRLS()
