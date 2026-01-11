import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Blog & News API')
    .setDescription(
      'API documentation for Blog and News management system with file uploads',
    )
    .setVersion('1.0')
    .addTag('Blogs', 'Blog management endpoints')
    .addTag('News', 'News management endpoints')
    .addTag('File Upload', 'UploadThing file upload endpoints')
    .addServer('http://localhost:3002', 'Local Development')
    .addServer('https://soliq-backend.onrender.com', 'Production Development')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Blog & News API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(3002);
  console.log(process.env.DATABASE_URL, `Url being set `);
  console.log('🚀 Application is running on: http://localhost:3002');
  console.log('📚 Swagger documentation: http://localhost:3002/api/docs');
  console.log(
    '📤 Image upload: POST http://localhost:3002/api/uploadthing/image',
  );
  console.log(
    '🎬 Video upload: POST http://localhost:3002/api/uploadthing/video',
  );
}
bootstrap();
