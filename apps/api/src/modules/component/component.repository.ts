import { InjectDb } from '@/db/decorators/inject-db.decorator'
import type { DbClient } from '@/db/__types__/db'
import { components } from '@/drizzle/schema'
import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import type { CreateComponentDto } from './dtos/create-component.dto'
import type { UpdateComponentDto } from './dtos/update-component.dto'

@Injectable()
export class ComponentRepository {
  constructor(@InjectDb() private readonly db: DbClient) {}

  async selectAll() {
    return await this.db.select().from(components)
  }

  async selectById(id: string) {
    const rows = await this.db
      .select()
      .from(components)
      .where(eq(components.id, id))
    return rows[0]
  }

  async insert(values: CreateComponentDto) {
    const rows = await this.db.insert(components).values(values).returning()
    return rows[0]
  }

  async update(id: string, values: UpdateComponentDto) {
    return this.db
      .update(components)
      .set(values)
      .where(eq(components.id, id))
      .returning()
  }
}
