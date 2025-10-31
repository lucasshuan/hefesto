import { customType } from 'drizzle-orm/pg-core'

export const stringBigint = customType<{
  data: string
  driverData: string
}>({
  dataType() {
    return 'bigint'
  },
  fromDriver(value: string): string {
    return value
  },
  toDriver(value: string): string {
    return value
  },
})
