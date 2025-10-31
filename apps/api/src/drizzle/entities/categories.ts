import {
  pgTable,
  varchar,
  foreignKey,
  unique,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { baseColumns } from '../helpers/columns';
import { stringBigint } from '../helpers/custom-types';

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
  ],
).enableRLS();

export const categoryTranslations = pgTable(
  'category_translations',
  {
    categoryId: stringBigint('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
    locale: varchar('locale', { length: 10 }).notNull(),
    name: varchar('name', { length: 128 }).notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.categoryId, t.locale] }),
    unique('uq_cat_name_locale').on(t.locale, t.name),
  ],
);
