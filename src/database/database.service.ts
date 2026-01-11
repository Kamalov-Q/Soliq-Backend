import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: postgres.Sql;
  public db!: ReturnType<typeof drizzle>;
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    const databaseUrl = process.env.DATABASE_URL!;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    this.client = postgres(databaseUrl, {
      ssl: { rejectUnauthorized: false },
      prepare: false,
    });

    this.db = drizzle(this.client, { schema });

    this.logger.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.client.end();
    this.logger.log('🔌 Database connection closed');
  }
}

// ---------- Standalone helpers for scripts ----------
const databaseService = new DatabaseService();

export const db = (async () => {
  await databaseService.onModuleInit();
  return databaseService.db;
})();

export const closeDb = async () => {
  await databaseService.onModuleDestroy();
};
