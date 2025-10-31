import { timestamp } from 'drizzle-orm/pg-core'
import { generateSnowflake } from './snowflake'
import { stringBigint } from './custom-types'

export const idColumn = () =>
  stringBigint('id')
    .primaryKey()
    .$defaultFn(() => generateSnowflake())

export const createdAtColumn = () =>
  timestamp('created_at').defaultNow().notNull()

export const updatedAtColumn = () =>
  timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()

export const deletedAtColumn = () => timestamp('deleted_at')

export const baseColumns = {
  id: idColumn(),
  createdAt: createdAtColumn(),
  updatedAt: updatedAtColumn(),
  deletedAt: deletedAtColumn(),
}
