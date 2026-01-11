import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BlogsDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'https://utfs.io/f/abc123.mp4', description: 'Video URL from UploadThing' })
  videoUrl: string;

  @ApiProperty({ example: 'Yangiliklar haqida', description: 'Blog title in Uzbek' })
  titleUz: string;

  @ApiProperty({ example: 'О новостях', description: 'Blog title in Russian' })
  titleRu: string;

  @ApiProperty({ example: 'About News', description: 'Blog title in English' })
  titleEn: string;

  @ApiProperty({ example: '2025-01-10T12:00:00Z', description: 'Date when the blog was issued' })
  issuedAt: string;
}

// CreateBlogDto remains mostly the same
export class CreateBlogDto {
  @ApiProperty({ description: 'Video URL from UploadThing', example: 'https://utfs.io/f/abc123.mp4' })
  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  @ApiProperty({ description: 'Blog title in Uzbek', example: 'Yangiliklar haqida' })
  @IsString()
  @IsNotEmpty()
  titleUz: string;

  @ApiProperty({ description: 'Blog title in Russian', example: 'О новостях' })
  @IsString()
  @IsNotEmpty()
  titleRu: string;

  @ApiProperty({ description: 'Blog title in English', example: 'About News' })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ description: 'Date when the blog was issued', example: '2025-01-10T12:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  issuedAt: string;
}

// UpdateBlogDto
export class UpdateBlogDto {
  @ApiPropertyOptional({ description: 'Video URL from UploadThing', example: 'https://utfs.io/f/abc123.mp4' })
  @IsString()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({ description: 'Blog title in Uzbek', example: 'Yangiliklar haqida' })
  @IsString()
  @IsOptional()
  titleUz?: string;

  @ApiPropertyOptional({ description: 'Blog title in Russian', example: 'О новостях' })
  @IsString()
  @IsOptional()
  titleRu?: string;

  @ApiPropertyOptional({ description: 'Blog title in English', example: 'About News' })
  @IsString()
  @IsOptional()
  titleEn?: string;

  @ApiPropertyOptional({ description: 'Date when the blog was issued', example: '2025-01-10T12:00:00Z' })
  @IsDateString()
  @IsOptional()
  issuedAt?: string;
}

// PaginationQueryDto (same as before)
export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Page number (starts from 1)', example: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 10, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}

// Corrected PaginatedBlogsResponseDto
class BlogsMetaDto {
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 10 }) limit: number;
  @ApiProperty({ example: 50 }) total: number;
  @ApiProperty({ example: 5 }) totalPages: number;
  @ApiProperty({ example: true }) hasNextPage: boolean;
  @ApiProperty({ example: false }) hasPrevPage: boolean;
}

export class PaginatedBlogsResponseDto {
  @ApiProperty({ type: [BlogsDto], description: 'Array of blogs' })
  data: BlogsDto[];

  @ApiProperty({ type: BlogsMetaDto, description: 'Pagination metadata' })
  meta: BlogsMetaDto;
}
