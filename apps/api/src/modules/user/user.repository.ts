import { InjectDb } from '@/db/decorators/inject-db.decorator';
import type { DbClient } from '@/db/__types__/db';
import { users } from '@/drizzle/entities/users';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NewUser } from '@/drizzle/models';

@Injectable()
export class UserRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return this.db.select().from(users);
  }

  async selectById(id: string) {
    const rows = await this.db.select().from(users).where(eq(users.id, id));
    return rows[0];
  }

  async update(id: string, input: Partial<NewUser>) {
    return this.db.update(users).set(input).where(eq(users.id, id)).returning();
  }
}
