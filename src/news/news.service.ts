import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { news } from '../database/schema';
import { eq, desc, count } from 'drizzle-orm';
import { CreateNewsDto, UpdateNewsDto, PaginationQueryDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly dbService: DatabaseService) { }

  async create(data: CreateNewsDto) {
    const [newsItem] = await this.dbService.db
      .insert(news)
      .values({
        ...data,
        releasedAt: data.releasedAt, // Store as-is, no conversion
      })
      .returning();

    return newsItem;
  }

  async findAll(lang?: string, paginationQuery?: PaginationQueryDto) {
    const page = paginationQuery?.page || 1;
    const limit = paginationQuery?.limit || 10;
    const offset = (page - 1) * limit;

    const [{ total }] = await this.dbService.db
      .select({ total: count() })
      .from(news);

    const allNews = await this.dbService.db
      .select()
      .from(news)
      .orderBy(desc(news.releasedAt))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(total / limit);

    let data = allNews;
    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      data = allNews.map(item => ({
        id: item.id,
        title: item[`title${langKey}`],
        description: item[`description${langKey}`],
        imageUrl: item.imageUrl,
        author: item.author,
        releasedAt: item.releasedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })) as any;
    }

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string, lang?: string) {
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
        releasedAt: newsItem.releasedAt,
        createdAt: newsItem.createdAt,
        updatedAt: newsItem.updatedAt,
      };
    }

    return newsItem;
  }

  async update(id: string, data: UpdateNewsDto) {
    await this.findOne(id);

    const updateData: any = { ...data, updatedAt: new Date() };

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