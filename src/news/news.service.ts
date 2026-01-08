import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';
import { news } from 'src/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class NewsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: CreateNewsDto) {
    const [newsItem] = await this.dbService.db
      .insert(news)
      .values(data)
      .returning();

    return newsItem;
  }

  async findAll(lang?: string) {
    const allNews = await this.dbService.db
      .select()
      .from(news)
      .orderBy(news.createdAt);

    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      return allNews.map((item) => ({
        id: item?.id,
        title: item[`title${langKey}`],
        description: item[`description${langKey}`],
        imageUrl: item?.imageUrl,
        author: item?.author,
        createdAt: item?.createdAt,
        updatedAt: item?.updatedAt,
      }));
    }

    return allNews;
  }

  async findOne(id: string, lang?: string) {
    const [newsItem] = await this.dbService.db
      .select()
      .from(news)
      .where(eq(news?.id, id));

    if (!newsItem) {
      throw new BadRequestException(`News with ID ${id} not found!`);
    }

    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      return {
        id: newsItem?.id,
        title: newsItem[`title${langKey}`],
        description: newsItem[`description${langKey}`],
        imageUrl: newsItem?.imageUrl,
        author: newsItem?.author,
        createdAt: newsItem?.createdAt,
        updatedAt: newsItem?.updatedAt,
      };
    }

    return newsItem;
  }

  async update(id: string, data: UpdateNewsDto) {
    await this.findOne(id);

    const [updated] = await this.dbService.db
      .update(news)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(news?.id, id))
      .returning();

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);

    const [deleted] = await this.dbService.db
      .delete(news)
      .where(eq(news?.id, id))
      .returning();

    return deleted;
  }
}
