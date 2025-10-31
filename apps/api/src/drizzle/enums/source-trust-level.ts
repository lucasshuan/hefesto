import { pgEnum } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from '../helpers/enum-to-pg-enum';
import { SourceTrustLevel } from '@/common/enums/source-trust-level.enum';

export const trustLevels = pgEnum(
  'source_trust_levels',
  enumToPgEnum(SourceTrustLevel),
);
