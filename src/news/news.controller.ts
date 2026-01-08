import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.newsService.findAll(lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.newsService.findOne(id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
