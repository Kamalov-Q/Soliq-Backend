import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { NewsModule } from './news/news.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    BlogModule,
    NewsModule,
    DatabaseModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
