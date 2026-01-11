import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news article' })
  @ApiResponse({ status: 201, description: 'News created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news articles' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter',
  })
  @ApiResponse({ status: 200, description: 'List of news articles' })
  findAll(@Query('lang') lang?: 'uz' | 'ru' | 'en') {
    return this.newsService.findAll(lang);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a news article by ID' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter',
  })
  @ApiResponse({ status: 200, description: 'News details' })
  @ApiResponse({ status: 404, description: 'News not found' })
  findOne(@Param('id') id: string, @Query('lang') lang?: 'uz' | 'ru' | 'en') {
    return this.newsService.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a news article' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News updated successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news article' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News deleted successfully' })
  @ApiResponse({ status: 404, description: 'News not found' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
