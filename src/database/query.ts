import 'dotenv/config';
import { db } from './database';
import { blogs, news } from './schema';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function main() {
  const allBlogs = await db.select().from(blogs);
  console.log(`Blogs: ${allBlogs}`);
  logger.log(`Blogs: ${allBlogs}`);

  const allNews = await db.select().from(news);
  console.log(`News: ${allNews}`);
  logger.log(`News: ${allNews}`);
}

main().catch(console.error);
