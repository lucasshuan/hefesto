import { pgTable, text, boolean } from 'drizzle-orm/pg-core';
import { userRoles } from '../enums/user-role';
import { baseColumns } from '../helpers/columns';
import { UserRole } from '@/common/enums/user-role.enum';

export const users = pgTable('user', {
  ...baseColumns,
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  imageUrl: text('image_url'),
  role: userRoles('role').default(UserRole.USER).notNull(),
}).enableRLS();
