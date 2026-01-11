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
import {
  BlogService
} from './blog.service';
import {
  CreateBlogDto,
  UpdateBlogDto,
  PaginationQueryDto,
  PaginatedBlogsResponseDto
} from './dto/blog.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  /**
   * Create a new blog
   */
  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({
    status: 201,
    description: 'Blog created successfully',
    type: PaginatedBlogsResponseDto, // or BlogsDto if returning single blog
  })
  @ApiResponse({ status: 400, description: 'Bad request: validation failed' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  /**
   * Get all blogs with pagination
   */
  @Get()
  @ApiOperation({ summary: 'Get all blogs with pagination' })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter (optional)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of blogs',
    type: PaginatedBlogsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request: invalid query params' })
  findAll(
    @Query('lang') lang?: string,
    @Query() paginationQuery?: PaginationQueryDto,
  ) {
    return this.blogService.findAll(lang, paginationQuery);
  }

  /**
   * Get a blog by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a blog by ID' })
  @ApiParam({ name: 'id', description: 'Blog ID', type: String })
  @ApiQuery({
    name: 'lang',
    required: false,
    enum: ['uz', 'ru', 'en'],
    description: 'Language filter (optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog retrieved successfully',
    type: PaginatedBlogsResponseDto, // or BlogsDto if returning single blog
  })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.blogService.findOne(id, lang);
  }

  /**
   * Update a blog
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiParam({ name: 'id', description: 'Blog ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Blog updated successfully',
    type: PaginatedBlogsResponseDto, // or BlogsDto if returning single blog
  })
  @ApiResponse({ status: 400, description: 'Bad request: validation failed' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  /**
   * Delete a blog
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiParam({ name: 'id', description: 'Blog ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Blog deleted successfully',
    schema: {
      example: { message: 'Blog deleted successfully' },
    },
  })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
