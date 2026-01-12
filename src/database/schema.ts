import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const blogs = pgTable('blogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  videoUrl: text('video_url').notNull(),
  titleUz: text('title_uz').notNull(),
  titleRu: text('title_ru').notNull(),
  titleEn: text('title_en').notNull(),
  releasedAt: timestamp('released_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const news = pgTable('news', {
  id: uuid('id').primaryKey().defaultRandom(),
  titleUz: text('title_uz').notNull(),
  titleRu: text('title_ru').notNull(),
  titleEn: text('title_en').notNull(),
  descriptionUz: text('description_uz').notNull(),
  descriptionRu: text('description_ru').notNull(),
  descriptionEn: text('description_en').notNull(),
  imageUrl: text('image_url').notNull(),
  author: text('author').notNull(),
  releasedAt: timestamp('released_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;
