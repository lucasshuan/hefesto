import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { baseColumns } from '../helpers/columns';

export const brands = pgTable(
  'brands',
  {
    ...baseColumns,
    name: varchar('name', { length: 120 }).notNull(),
  },
  (t) => [uniqueIndex('uq_brand_name').on(t.name)],
).enableRLS();
