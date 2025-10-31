import { DynamicModule, Global, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from './tokens/drizzle.token';
import * as schema from '../drizzle/schema';

@Global()
@Module({})
export class DrizzleModule implements OnModuleDestroy {
  private static pool: Pool | null = null;

  static forRoot(): DynamicModule {
    return {
      module: DrizzleModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: DRIZZLE,
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            const connectionString = config.getOrThrow<string>('DATABASE_URL');
            const sslRequired =
              /\bsslmode=require\b/i.test(connectionString) ||
              config.get('PGSSL', 'false') === 'true';

            const pool = new Pool({
              connectionString,
              ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
              idleTimeoutMillis: 30_000,
              max: Number(config.get('PG_POOL_MAX', 10)),
            });

            DrizzleModule.pool = pool;

            const logger =
              config.getOrThrow<string>('NODE_ENV') !== 'production';

            const db = drizzle(pool, { schema: schema, logger });

            return db;
          },
        },
      ],
      exports: [DRIZZLE],
    };
  }

  async onModuleDestroy() {
    if (DrizzleModule.pool) {
      await DrizzleModule.pool.end();
      DrizzleModule.pool = null;
    }
  }
}
