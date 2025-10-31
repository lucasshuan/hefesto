import { Snowflake } from '@sapphire/snowflake'

const epoch = 1766886000

const snowflakeFactory = new Snowflake(epoch)

export function generateSnowflake() {
  return snowflakeFactory.generate().toString()
}

export function parseSnowflake(id: string) {
  return snowflakeFactory.deconstruct(id)
}
