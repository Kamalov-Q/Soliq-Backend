# Soliq Backend

A NestJS-based REST API backend application for managing blogs and news with multi-language support (Uzbek, Russian, English) and file upload capabilities.

## Features

- 📝 **Blog Management**: Create, read, update, and delete blog posts with video content
- 📰 **News Management**: Full CRUD operations for news articles with images
- 🌍 **Multi-language Support**: Content available in Uzbek (Uz), Russian (Ru), and English (En)
- 📤 **File Upload**: Upload images and videos with validation
- 🗄️ **Database**: PostgreSQL with Drizzle ORM
- ✅ **Validation**: Request validation using class-validator
- 🎯 **TypeScript**: Fully typed codebase

## Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **File Upload**: Multer
- **Validation**: class-validator, class-transformer

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL database
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Soliq-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=3002
```

## Database Setup

1. Create a PostgreSQL database:
```bash
createdb your_database_name
```

2. Generate database migrations:
```bash
npm run db:generate
```

3. Run migrations:
```bash
npm run db:migrate
```

Alternatively, you can push the schema directly to the database:
```bash
npm run db:push
```

4. (Optional) Open Drizzle Studio to view your database:
```bash
npm run db:studio
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:3002` (or the port specified in your `.env` file).

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Endpoints

### Blogs

- `POST /blogs` - Create a new blog post
- `GET /blogs` - Get all blog posts (optional `?lang=uz|ru|en` query parameter)
- `GET /blogs/:id` - Get a specific blog post (optional `?lang=uz|ru|en` query parameter)
- `PATCH /blogs/:id` - Update a blog post
- `DELETE /blogs/:id` - Delete a blog post

### News

- `POST /news` - Create a new news article
- `GET /news` - Get all news articles (optional `?lang=uz|ru|en` query parameter)
- `GET /news/:id` - Get a specific news article (optional `?lang=uz|ru|en` query parameter)
- `PATCH /news/:id` - Update a news article
- `DELETE /news/:id` - Delete a news article

### File Upload

- `POST /upload/image` - Upload an image file
  - **Content-Type**: `multipart/form-data`
  - **Field name**: `file`
  - **Allowed formats**: JPEG, JPG, PNG, WebP
  - **Max size**: 10MB

- `POST /upload/video` - Upload a video file
  - **Content-Type**: `multipart/form-data`
  - **Field name**: `file`
  - **Allowed formats**: MP4, MPEG, MOV, AVI
  - **Max size**: 150MB

### Static Files

Uploaded files are served statically at:
- Images: `/public/images/`
- Videos: `/public/videos/`

## Project Structure

```
Soliq-Backend/
├── src/
│   ├── app.module.ts          # Root application module
│   ├── main.ts                # Application entry point
│   ├── blog/                  # Blog module
│   │   ├── blog.controller.ts
│   │   ├── blog.service.ts
│   │   ├── blog.module.ts
│   │   └── dto/
│   │       └── blog.dto.ts
│   ├── news/                  # News module
│   │   ├── news.controller.ts
│   │   ├── news.service.ts
│   │   ├── news.module.ts
│   │   └── dto/
│   │       └── news.dto.ts
│   ├── upload/                # File upload module
│   │   ├── upload.controller.ts
│   │   ├── upload.service.ts
│   │   └── upload.module.ts
│   └── database/              # Database configuration
│       ├── database.module.ts
│       ├── database.service.ts
│       ├── schema.ts          # Database schema definitions
│       ├── migrate.ts         # Migration script
│       └── query.ts           # Query utilities
├── public/                    # Static files directory
│   ├── images/               # Uploaded images
│   └── videos/               # Uploaded videos
├── drizzle/                  # Database migrations
├── dist/                     # Compiled JavaScript files
├── drizzle.config.ts         # Drizzle ORM configuration
├── package.json
└── tsconfig.json
```

## Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:query` - Run database queries

## Database Schema

### Blogs Table
- `id` (UUID, Primary Key)
- `video_url` (Text)
- `title_uz` (Text) - Uzbek title
- `title_ru` (Text) - Russian title
- `title_en` (Text) - English title
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### News Table
- `id` (UUID, Primary Key)
- `title_uz` (Text) - Uzbek title
- `title_ru` (Text) - Russian title
- `title_en` (Text) - English title
- `description_uz` (Text) - Uzbek description
- `description_ru` (Text) - Russian description
- `description_en` (Text) - English description
- `image_url` (Text)
- `author` (Text)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## CORS

CORS is enabled by default. The application accepts requests from any origin. For production, consider configuring CORS to restrict allowed origins.

## Validation

The application uses global validation pipes with the following settings:
- **whitelist**: true - Strips properties that don't have decorators
- **forbidNonWhitelisted**: true - Throws error if non-whitelisted properties are present
- **transform**: true - Automatically transforms payloads to DTO instances

## License

UNLICENSED

## Author

Kamalov Quvomiddin

## Telegram
https://t.me/kamalovq
