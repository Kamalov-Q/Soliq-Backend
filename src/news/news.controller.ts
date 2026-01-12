import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { NewsService } from './news.service';
import {
  CreateNewsDto,
  UpdateNewsDto,
  PaginationQueryDto,
  PaginatedNewsResponseDto,
  NewsDto,
} from './dto/news.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new news article' })
  @ApiResponse({
    status: 201,
    description: 'News created successfully',
    type: NewsDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createNewsDto: CreateNewsDto) {
    try {
      const news = await this.newsService.create(createNewsDto);
      return { data: news };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  } 

  @Get()
  @ApiOperation({ summary: 'Get all news articles with pagination' })
  @ApiQuery({ name: 'lang', required: false, enum: ['uz', 'ru', 'en'], description: 'Language filter' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of news articles',
    type: PaginatedNewsResponseDto,
  })
  async findAll(
    @Query('lang') lang?: string,
    @Query() paginationQuery?: PaginationQueryDto,
  ) {
    const result = await this.newsService.findAll(lang, paginationQuery);
    return {
      data: result.data,
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a news article by ID' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiQuery({ name: 'lang', required: false, enum: ['uz', 'ru', 'en'], description: 'Language filter' })
  @ApiResponse({ status: 200, description: 'News details', type: NewsDto })
  @ApiResponse({ status: 404, description: 'News not found' })
  async findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    const news = await this.newsService.findOne(id, lang);
    if (!news) throw new NotFoundException('News not found');
    return { data: news };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a news article' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({ status: 200, description: 'News updated successfully', type: NewsDto })
  @ApiResponse({ status: 404, description: 'News not found' })
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    const updated = await this.newsService.update(id, updateNewsDto);
    if (!updated) throw new NotFoundException('News not found');
    return { data: updated };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a news article' })
  @ApiParam({ name: 'id', description: 'News ID' })
  @ApiResponse({
    status: 200,
    description: 'News deleted successfully',
    schema: { example: { data: 'News deleted successfully' } },
  })
  @ApiResponse({ status: 404, description: 'News not found' })
  async remove(@Param('id') id: string) {
    const deleted = await this.newsService.remove(id);
    if (!deleted) throw new NotFoundException('News not found');
    return { data: 'News deleted successfully' };
  }
}
