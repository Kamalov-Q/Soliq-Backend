import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Force reload of .env file
  dotenv.config({ override: true });
  
  const databaseUrl = process.env.DATABASE_URL;

  // const databaseUrl = "postgresql://kamalov:eRV2GuTzyhA7f06920vHR5ijk0aBwMKh@dpg-d5glfme3jp1c73c5691g-a.virginia-postgres.render.com/soliq"
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  console.log('Connecting to database...');
  console.log('Database URL:', databaseUrl.replace(/:[^:@]+@/, ':****@'));
  
  // Check if it's a local connection (no SSL needed)
  const isLocal = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
  
  // Use the same connection method as the app
  const client = postgres(databaseUrl, {
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 1,
  });

  const db = drizzle(client);

  console.log('Pushing schema changes...');
  
  try {
    // Run all pending migrations
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Schema pushed successfully!');
  } catch (error: any) {
    if (error.code === '28P01') {
      console.error('❌ Authentication failed!');
      console.error('Please verify:');
      console.error('1. The password in your .env file matches Render.com');
      console.error('2. IP whitelisting is not blocking your connection');
      console.error('3. The database user has not been changed');
      console.error('\nTo fix:');
      console.error('- Go to Render.com dashboard');
      console.error('- Reset the database password if needed');
      console.error('- Copy the new External Database URL');
      console.error('- Update DATABASE_URL in your .env file');
    } else {
      console.error('❌ Error pushing schema:', error.message);
    }
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

