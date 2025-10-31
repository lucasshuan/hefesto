import { pgTable, numeric, foreignKey } from 'drizzle-orm/pg-core';
import { listings } from './listings';
import { baseColumns } from '../helpers/columns';
import { stringBigint } from '../helpers/custom-types';

export const listingPrices = pgTable(
  'listing_prices',
  {
    ...baseColumns,
    listingId: stringBigint('listing_id').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  },
  (t) => [
    foreignKey({
      name: 'fk_listing_price_listing',
      columns: [t.listingId],
      foreignColumns: [listings.id],
    }).onDelete('cascade'),
  ],
).enableRLS();
