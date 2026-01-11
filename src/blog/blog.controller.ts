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
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter',
  })
  @ApiResponse({ status: 200, description: 'List of blogs' })
  findAll(@Query('lang') lang?: 'uz' | 'ru' | 'en') {
    return this.blogService.findAll(lang);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', description: 'Blog ID' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter',
  })
  @ApiResponse({ status: 200, description: 'Blog details' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  findOne(@Param('id') id: string, @Query('lang') lang?: 'uz' | 'ru' | 'en') {
    return this.blogService.findOne(id, lang);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiParam({ name: 'id', description: 'Blog ID' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiParam({ name: 'id', description: 'Blog ID' })
  @ApiResponse({ status: 200, description: 'Blog deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
