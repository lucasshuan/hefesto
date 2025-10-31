import { pgTable, varchar, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core'
import { categories } from './categories'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'

export const features = pgTable(
  'features',
  {
    ...baseColumns,
    categoryId: stringBigint('category_id').notNull(),
    name: varchar('name', { length: 120 }).notNull(),
    key: varchar('key', { length: 120 }).notNull(),
  },
  (t) => [
    uniqueIndex('uq_feature_cat_key').on(t.categoryId, t.key),
    foreignKey({
      name: 'fk_feature_category',
      columns: [t.categoryId],
      foreignColumns: [categories.id],
    }).onDelete('cascade'),
  ]
).enableRLS()
