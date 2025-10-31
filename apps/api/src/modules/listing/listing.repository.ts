import type { DbClient } from '@/db/__types__/db';
import { InjectDb } from '@/db/decorators/inject-db.decorator';
import { listings } from '@/drizzle/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ListingRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return this.db.select().from(listings);
  }

  async selectById(id: string) {
    const rows = await this.db
      .select()
      .from(listings)
      .where(eq(listings.id, id));
    return rows[0];
  }
}
