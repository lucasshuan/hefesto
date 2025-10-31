import type { DbClient } from '@/db/__types__/db'
import { InjectDb } from '@/db/decorators/inject-db.decorator'
import { sources } from '@/drizzle/entities/sources'
import type { NewSource } from '@/drizzle/models'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

@Injectable()
export class SourceRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return this.db.select().from(sources)
  }

  async selectById(id: string) {
    const rows = await this.db.select().from(sources).where(eq(sources.id, id))
    return rows[0]
  }

  async insert(input: NewSource) {
    const rows = await this.db.insert(sources).values(input).returning()
    return rows[0]
  }

  async update(id: string, input: Partial<NewSource>) {
    return this.db
      .update(sources)
      .set(input)
      .where(eq(sources.id, id))
      .returning()
  }
}
