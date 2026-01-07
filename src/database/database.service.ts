import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: postgres.Sql;
  public db: ReturnType<typeof drizzle>;

  async onModuleInit() {
    this.client = postgres(process.env.DATABASE_URL!);
    this.db = drizzle(this.client, { schema });
  }

  async onModuleDestroy() {
    await this.client.end();
  }
}
