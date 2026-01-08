CREATE TABLE IF NOT EXISTS "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"video_url" text NOT NULL,
	"title_uz" text NOT NULL,
	"title_ru" text NOT NULL,
	"title_en" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title_uz" text NOT NULL,
	"title_ru" text NOT NULL,
	"title_en" text NOT NULL,
	"description_uz" text NOT NULL,
	"description_ru" text NOT NULL,
	"description_en" text NOT NULL,
	"image_url" text NOT NULL,
	"author" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
