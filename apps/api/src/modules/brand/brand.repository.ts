import { InjectDb } from '@/db/decorators/inject-db.decorator'
import type { DbClient } from '@/db/__types__/db'
import { brands } from '@/drizzle/entities/brands'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import type { NewBrand } from '@/drizzle/models'

@Injectable()
export class BrandRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return this.db.select().from(brands)
  }

  async selectById(id: string) {
    const rows = await this.db.select().from(brands).where(eq(brands.id, id))
    return rows[0]
  }

  async insert(input: NewBrand) {
    const rows = await this.db.insert(brands).values(input).returning()
    return rows[0]
  }

  async update(id: string, input: Partial<NewBrand>) {
    return this.db
      .update(brands)
      .set(input)
      .where(eq(brands.id, id))
      .returning()
  }
}
