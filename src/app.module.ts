import 'dotenv/config';
import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { NewsModule } from './news/news.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
      serveStaticOptions: {
        index: false,
      },
    }),
    BlogModule,
    NewsModule,
    DatabaseModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

console.log(join(__dirname, '..', 'public'), 'DIRNAME');
