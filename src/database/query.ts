import 'dotenv/config';
import { DatabaseService } from './database.service';
import { blogs, news } from './schema';

const databaseService = new DatabaseService();

async function main() {
  const db = await (async () => {
    await databaseService.onModuleInit();
    return databaseService.db;
  })();

  const allBlogs = await db.select().from(blogs);
  console.log('Blogs:', allBlogs);

  const allNews = await db.select().from(news);
  console.log('News:', allNews);

  await databaseService.onModuleDestroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
