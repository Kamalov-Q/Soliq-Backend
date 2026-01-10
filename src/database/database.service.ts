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
    // const databaseUrl = process.env.DATABASE_URL;
    const databaseUrl =
      'postgresql://kamalov:eRV2GuTzyhA7fO6920vHR5ijk0aBwMKh@dpg-d5glfme3jp1c73c5691g-a.virginia-postgres.render.com/soliq?sslmode=require';
    console.log(`Using this db: ${databaseUrl}`);
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    this.client = postgres(databaseUrl, {
      ssl: { rejectUnauthorized: false }, // required for Render Postgres
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
