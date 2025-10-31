import { InjectDb } from '@/db/decorators/inject-db.decorator';
import type { DbClient } from '@/db/__types__/db';
import { categories } from '@/drizzle/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { NewCategory } from '@/drizzle/models';

@Injectable()
export class CategoryRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return await this.db.select().from(categories);
  }

  async selectById(id: string) {
    const rows = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return rows[0];
  }

  async insert(values: NewCategory) {
    const rows = await this.db.insert(categories).values(values).returning();
    return rows[0];
  }

  async update(id: string, values: Partial<NewCategory>) {
    return this.db
      .update(categories)
      .set(values)
      .where(eq(categories.id, id))
      .returning();
  }
}
