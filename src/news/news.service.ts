import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { news } from '../database/schema';
import { eq, desc, count } from 'drizzle-orm';
import { CreateNewsDto, UpdateNewsDto, PaginationQueryDto } from './dto/news.dto';
import { NewsDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly dbService: DatabaseService) { }

  // Create news
  async create(data: CreateNewsDto): Promise<NewsDto> {
    const [newsItem] = await this.dbService.db
      .insert(news)
      .values({
        ...data,
        issuedAt: new Date(data.issuedAt),
      })
      .returning();

    return this.mapNews(newsItem);
  }

  // Find all news with pagination
  async findAll(lang?: string, paginationQuery?: PaginationQueryDto) {
    const page = paginationQuery?.page || 1;
    const limit = paginationQuery?.limit || 10;
    const offset = (page - 1) * limit;

    // Total count
    const [{ total }] = await this.dbService.db
      .select({ total: count() })
      .from(news);

    // Fetch paginated data
    const allNews = await this.dbService.db
      .select()
      .from(news)
      .orderBy(desc(news.issuedAt))
      .limit(limit)
      .offset(offset);

    // Map data with optional language
    const data = allNews.map(item => this.mapNews(item, lang));

    const totalPages = Math.ceil(total / limit);

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

  // Find one news by ID
  async findOne(id: string, lang?: string): Promise<NewsDto> {
    const [newsItem] = await this.dbService.db
      .select()
      .from(news)
      .where(eq(news.id, id));

    if (!newsItem) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.mapNews(newsItem, lang);
  }

  // Update news
  async update(id: string, data: UpdateNewsDto): Promise<NewsDto> {
    await this.findOne(id); // throws 404 if not found

    const updateData: any = { ...data, updatedAt: new Date() };
    if (data.issuedAt) {
      updateData.issuedAt = new Date(data.issuedAt);
    }

    const [updated] = await this.dbService.db
      .update(news)
      .set(updateData)
      .where(eq(news.id, id))
      .returning();

    return this.mapNews(updated);
  }

  // Remove news
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // throws 404 if not found

    await this.dbService.db
      .delete(news)
      .where(eq(news.id, id))
      .returning();

    return { message: 'News deleted successfully' };
  }

  // Helper to map news item to NewsDto, with optional language filtering
  private mapNews(item: any, lang?: string): NewsDto {
    if (lang) {
      const langKey = lang.charAt(0).toUpperCase() + lang.slice(1);
      return {
        id: item.id,
        titleUz: langKey === 'Uz' ? item[`title${langKey}`] : item.titleUz,
        titleRu: langKey === 'Ru' ? item[`title${langKey}`] : item.titleRu,
        titleEn: langKey === 'En' ? item[`title${langKey}`] : item.titleEn,
        descriptionUz: langKey === 'Uz' ? item[`description${langKey}`] : item.descriptionUz,
        descriptionRu: langKey === 'Ru' ? item[`description${langKey}`] : item.descriptionRu,
        descriptionEn: langKey === 'En' ? item[`description${langKey}`] : item.descriptionEn,
        imageUrl: item.imageUrl,
        author: item.author,
        issuedAt: item.issuedAt,
      };
    }

    return {
      id: item.id,
      titleUz: item.titleUz,
      titleRu: item.titleRu,
      titleEn: item.titleEn,
      descriptionUz: item.descriptionUz,
      descriptionRu: item.descriptionRu,
      descriptionEn: item.descriptionEn,
      imageUrl: item.imageUrl,
      author: item.author,
      issuedAt: item.issuedAt,
    };
  }
}
