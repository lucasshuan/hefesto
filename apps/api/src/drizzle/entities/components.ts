import {
  pgTable,
  varchar,
  foreignKey,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { categories } from './categories'
import { brands } from './brands'
import { componentTiers } from '../enums/component-tier'
import { baseColumns } from '../helpers/columns'
import { stringBigint } from '../helpers/custom-types'
import { ComponentTier } from '@/common/enums/component-tier.enum'

export const components = pgTable(
  'component',
  {
    ...baseColumns,
    name: varchar('name', { length: 180 }).notNull(),
    brandId: stringBigint('brand_id'),
    categoryId: stringBigint('category_id'),
    model: varchar('model', { length: 120 }),
    tier: componentTiers('tier').default(ComponentTier.ENTRY).notNull(),
  },
  (t) => [
    uniqueIndex('uq_component_name').on(t.name),
    index('idx_component_brand').on(t.brandId),
    index('idx_component_category').on(t.categoryId),
    foreignKey({
      name: 'fk_component_brand',
      columns: [t.brandId],
      foreignColumns: [brands.id],
    }).onDelete('set null'),
    foreignKey({
      name: 'fk_component_category',
      columns: [t.categoryId],
      foreignColumns: [categories.id],
    }).onDelete('set null'),
  ]
).enableRLS()
