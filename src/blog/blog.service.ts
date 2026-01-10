import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { blogs, Blog } from 'src/database/schema';
import { eq, desc } from 'drizzle-orm';

export type Lang = 'uz' | 'ru' | 'en';

@Injectable()
export class BlogService {
  constructor(private readonly dbService: DatabaseService) {}

  private mapLang(item: Blog, lang: Lang) {
    return {
      title: item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`],
    };
  }

  async create(data: CreateBlogDto) {
    const [blog] = await this.dbService.db
      .insert(blogs)
      .values(data)
      .returning();

    return blog;
  }

  async findAll(lang?: Lang) {
    const allBlogs = await this.dbService.db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt));

    if (!lang) return allBlogs;

    return allBlogs.map((item) => ({
      id: item.id,
      videoUrl: item.videoUrl,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      ...this.mapLang(item, lang),
    }));
  }

  async findOne(id: string, lang?: Lang) {
    const [blog] = await this.dbService.db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id));

    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);

    if (!lang) return blog;

    return { ...blog, ...this.mapLang(blog, lang) };
  }

  async update(id: string, data: UpdateBlogDto) {
    await this.findOne(id); // ensure exists

    const [updated] = await this.dbService.db
      .update(blogs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogs.id, id))
      .returning();

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id); // ensure exists

    const [deleted] = await this.dbService.db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    return deleted;
  }
}
