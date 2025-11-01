import { pgTable, foreignKey } from 'drizzle-orm/pg-core'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'

export const categories = pgTable(
  'categories',
  {
    ...baseColumns,
    parentCategoryId: stringBigint('parent_category_id'),
  },
  (t) => [
    foreignKey({
      name: 'fk_category_parent',
      columns: [t.parentCategoryId],
      foreignColumns: [t.id],
    }).onDelete('set null'),
  ]
).enableRLS()
