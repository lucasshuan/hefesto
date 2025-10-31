import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { baseColumns } from '../helpers/columns';
import { stringBigint } from '../helpers/custom-types';

export const accounts = pgTable('accounts', {
  ...baseColumns,
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: stringBigint('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
}).enableRLS();
