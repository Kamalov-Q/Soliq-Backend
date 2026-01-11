import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { news } from '../database/schema';
import { eq, desc } from 'drizzle-orm';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: CreateNewsDto) {
    const [newsItem] = await this.dbService.db
      .insert(news)
      .values({
        ...data,
        issuedAt: new Date(data.issuedAt),
      })
      .returning();

    return newsItem;
  }

  async findAll(lang?: 'uz' | 'ru' | 'en') {
    const allNews = await this.dbService.db
      .select()
      .from(news)
      .orderBy(desc(news.issuedAt));

    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      return allNews.map((item) => ({
        id: item.id,
        title: item[`title${langKey}`],
        description: item[`description${langKey}`],
        imageUrl: item.imageUrl,
        author: item.author,
        issuedAt: item.issuedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
    }

    return allNews;
  }

  async findOne(id: string, lang?: 'uz' | 'ru' | 'en') {
    const [newsItem] = await this.dbService.db
      .select()
      .from(news)
      .where(eq(news.id, id));

    if (!newsItem) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      return {
        id: newsItem.id,
        title: newsItem[`title${langKey}`],
        description: newsItem[`description${langKey}`],
        imageUrl: newsItem.imageUrl,
        author: newsItem.author,
        issuedAt: newsItem.issuedAt,
        createdAt: newsItem.createdAt,
        updatedAt: newsItem.updatedAt,
      };
    }

    return newsItem;
  }

  async update(id: string, data: UpdateNewsDto) {
    await this.findOne(id);

    const updateData: any = { ...data, updatedAt: new Date() };
    if (data.issuedAt) {
      updateData.issuedAt = new Date(data.issuedAt);
    }

    const [updated] = await this.dbService.db
      .update(news)
      .set(updateData)
      .where(eq(news.id, id))
      .returning();

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);

    const [deleted] = await this.dbService.db
      .delete(news)
      .where(eq(news.id, id))
      .returning();

    return deleted;
  }
}
