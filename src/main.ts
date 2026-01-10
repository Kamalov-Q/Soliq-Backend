import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Serve static files from /public
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  // Enable CORS
  app.enableCors();

  // Bind to Render port (fallback to 3002 locally)
  const port = parseInt(process.env.PORT, 10) || 3002;
  await app.listen(port, () => {
    console.log(`Application is running on port: ${port}`);
  });
}
bootstrap();
