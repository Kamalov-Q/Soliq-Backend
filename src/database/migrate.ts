import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './database';

async function main() {
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Database migrated');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
