import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const getConnectionString = (): string => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not defined');

  // Ensure SSL is required
  if (!url.includes('sslmode=')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}sslmode=require`;
  }
  return url;
};

export default {
  schema: './src/database/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: getConnectionString(),
  },
} satisfies Config;
