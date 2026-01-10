import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';
import { news, News } from 'src/database/schema';
import { eq, desc } from 'drizzle-orm';

export type Lang = 'uz' | 'ru' | 'en';

@Injectable()
export class NewsService {
  constructor(private readonly dbService: DatabaseService) {}

  // Map news item based on lang
  private mapLang(item: News, lang: Lang) {
    return {
      title: item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`],
      description:
        item[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`],
    };
  }

  async create(data: CreateNewsDto) {
    const [newsItem] = await this.dbService.db
      .insert(news)
      .values(data)
      .returning();
    return newsItem;
  }

  async findAll(lang?: Lang) {
    const allNews = await this.dbService.db
      .select()
      .from(news)
      .orderBy(desc(news.createdAt));

    if (!lang) return allNews;

    return allNews.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      author: item.author,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      ...this.mapLang(item, lang),
    }));
  }

  async findOne(id: string, lang?: Lang) {
    const [newsItem] = await this.dbService.db
      .select()
      .from(news)
      .where(eq(news.id, id));

    if (!newsItem)
      throw new BadRequestException(`News with ID ${id} not found`);

    if (!lang) return newsItem;

    return { ...newsItem, ...this.mapLang(newsItem, lang) };
  }

  async update(id: string, data: UpdateNewsDto) {
    await this.findOne(id); // ensures item exists

    const [updated] = await this.dbService.db
      .update(news)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(news.id, id))
      .returning();

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id); // ensures item exists

    const [deleted] = await this.dbService.db
      .delete(news)
      .where(eq(news.id, id))
      .returning();

    return deleted;
  }
}
