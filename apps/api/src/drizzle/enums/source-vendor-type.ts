import { pgEnum } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from '../helpers/enum-to-pg-enum';
import { SourceVendorType } from '@/common/enums/source-vendor-type.enum';

export const vendorTypes = pgEnum(
  'source_vendor_types',
  enumToPgEnum(SourceVendorType),
);
