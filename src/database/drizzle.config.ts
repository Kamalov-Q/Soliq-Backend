import type { Config } from 'drizzle-kit';
import 'dotenv/config';

// Ensure SSL is enabled in connection string if not already present
const getConnectionString = () => {
  const url = process.env.DATABASE_URL!;
  if (!url) {
    throw new Error('DATABASE_URL is not defined');
  }
  // Add sslmode=require if not already in the connection string
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
