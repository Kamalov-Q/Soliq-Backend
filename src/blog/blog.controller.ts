import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { BlogService, Lang } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  private parseLang(lang?: string): Lang | undefined {
    if (!lang) return undefined;
    const lower = lang.toLowerCase();
    if (lower === 'uz' || lower === 'ru' || lower === 'en') return lower;
    throw new BadRequestException('Invalid lang value. Allowed: uz | ru | en');
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.blogService.findAll(this.parseLang(lang));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.blogService.findOne(id, this.parseLang(lang));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
