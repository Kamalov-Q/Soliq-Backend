import { db, closeDb } from './database.service';
import { blogs, news } from './schema';

async function main() {
  const database = await db; // ✅ await the async db

  const allBlogs = await database.select().from(blogs);
  console.log('Blogs:', allBlogs);

  const allNews = await database.select().from(news);
  console.log('News:', allNews);

  await closeDb(); // close connection after script
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
