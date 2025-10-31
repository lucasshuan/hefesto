import { pgEnum } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from '../helpers/enum-to-pg-enum';
import { UserRole } from '@/common/enums/user-role.enum';

export const userRoles = pgEnum('user_roles', enumToPgEnum(UserRole));
