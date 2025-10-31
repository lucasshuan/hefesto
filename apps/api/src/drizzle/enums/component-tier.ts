import { pgEnum } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from '../helpers/enum-to-pg-enum';
import { ComponentTier } from '@/common/enums/component-tier.enum';

export const componentTiers = pgEnum(
  'component_tiers',
  enumToPgEnum(ComponentTier),
);
