import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { blogs } from '../database/schema';
import { eq, desc } from 'drizzle-orm';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: CreateBlogDto) {
    const [blog] = await this.dbService.db
      .insert(blogs)
      .values({
        videoUrl: data.videoUrl,
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleEn: data.titleEn,
        issuedAt: new Date(data.issuedAt),
      })
      .returning();

    return blog;
  }

  async findAll(lang?: string) {
    const allBlogs = await this.dbService.db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.issuedAt));

    if (lang) {
      const langKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
      return allBlogs.map((blog) => ({
        id: blog.id,
        videoUrl: blog.videoUrl,
        title: blog[langKey],
        issuedAt: blog.issuedAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }));
    }

    return allBlogs;
  }

  async findOne(id: string, lang?: string) {
    const [blog] = await this.dbService.db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id));

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    if (lang) {
      const langKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
      return {
        id: blog.id,
        videoUrl: blog.videoUrl,
        title: blog[langKey],
        issuedAt: blog.issuedAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      };
    }

    return blog;
  }

  async update(id: string, data: UpdateBlogDto) {
    await this.findOne(id);

    const updateData: any = { ...data, updatedAt: new Date() };
    if (data.issuedAt) {
      updateData.issuedAt = new Date(data.issuedAt);
    }

    const [updated] = await this.dbService.db
      .update(blogs)
      .set(updateData)
      .where(eq(blogs.id, id))
      .returning();

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);

    const [deleted] = await this.dbService.db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    return deleted;
  }
}
