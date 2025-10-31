import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { vendorTypes } from '../enums/source-vendor-type';
import { trustLevels } from '../enums/source-trust-level';
import { baseColumns } from '../helpers/columns';
import { SourceVendorType } from '@/common/enums/source-vendor-type.enum';
import { SourceTrustLevel } from '@/common/enums/source-trust-level.enum';

export const sources = pgTable(
  'source',
  {
    ...baseColumns,
    name: varchar('name', { length: 160 }).notNull(),
    domain: varchar('domain', { length: 200 }),
    country: varchar('country', { length: 2 }),
    vendorType: vendorTypes('vendor_type')
      .default(SourceVendorType.RETAILER)
      .notNull(),
    trustLevel: trustLevels('trust_level')
      .default(SourceTrustLevel.UNVERIFIED)
      .notNull(),
  },
  (t) => [uniqueIndex('uq_source_name').on(t.name)],
).enableRLS();
