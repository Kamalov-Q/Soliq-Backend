import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { blogs } from 'src/database/schema';
import { eq } from 'drizzle-orm';

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
      })
      .returning();

    return blog;
  }

  async findAll(lang?: string) {
    const allBlogs = await this.dbService.db
      .select()
      .from(blogs)
      .orderBy(blogs.createdAt);

    if (lang) {
      const langKey = `title${
        String(lang).charAt(0).toUpperCase() + lang.slice(1)
      }`;

      return allBlogs.map((blog) => ({
        id: blog?.id,
        videoUrl: blog?.videoUrl,
        title: blog[langKey],
        createdAt: blog?.createdAt,
        updatedAt: blog?.updatedAt,
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
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      };
    }

    return blog;
  }

  async update(id: string, data: UpdateBlogDto) {
    await this.findOne(id);

    const [updated] = await this.dbService.db
      .update(blogs)
      .set({
        ...data,
        updatedAt: new Date(),
      })
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
