import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Min,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class NewsDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Yangi texnologiyalar' })
  titleUz: string;

  @ApiProperty({ example: 'Новые технологии' })
  titleRu: string;

  @ApiProperty({ example: 'New Technologies' })
  titleEn: string;

  @ApiProperty({ example: 'News description in Uzbek' })
  descriptionUz: string;

  @ApiProperty({ example: 'Описание новости на русском' })
  descriptionRu: string;

  @ApiProperty({ example: 'News description in English' })
  descriptionEn: string;

  @ApiProperty({ example: 'https://utfs.io/f/abc123.jpg' })
  imageUrl: string;

  @ApiProperty({ example: 'John Doe' })
  author: string;

  @ApiProperty({ example: '2025-01-10T12:00:00Z' })
  issuedAt: string;
}

export class CreateNewsDto {
  @ApiProperty({
    description: 'News title in Uzbek',
    example: 'Yangi texnologiyalar',
  })
  @IsString()
  @IsNotEmpty()
  titleUz: string;

  @ApiProperty({
    description: 'News title in Russian',
    example: 'Новые технологии',
  })
  @IsString()
  @IsNotEmpty()
  titleRu: string;

  @ApiProperty({
    description: 'News title in English',
    example: 'New Technologies',
  })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({ description: 'News description in Uzbek' })
  @IsString()
  @IsNotEmpty()
  descriptionUz: string;

  @ApiProperty({ description: 'News description in Russian' })
  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @ApiProperty({ description: 'News description in English' })
  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @ApiProperty({
    description: 'Image URL from UploadThing',
    example: 'https://utfs.io/f/abc123.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Date when the news was issued',
    example: '2025-01-10T12:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  issuedAt: string;
}

export class UpdateNewsDto {
  @ApiPropertyOptional({ description: 'News title in Uzbek' })
  @IsString()
  @IsOptional()
  titleUz?: string;

  @ApiPropertyOptional({ description: 'News title in Russian' })
  @IsString()
  @IsOptional()
  titleRu?: string;

  @ApiPropertyOptional({ description: 'News title in English' })
  @IsString()
  @IsOptional()
  titleEn?: string;

  @ApiPropertyOptional({ description: 'News description in Uzbek' })
  @IsString()
  @IsOptional()
  descriptionUz?: string;

  @ApiPropertyOptional({ description: 'News description in Russian' })
  @IsString()
  @IsOptional()
  descriptionRu?: string;

  @ApiPropertyOptional({ description: 'News description in English' })
  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Image URL from UploadThing' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Author name' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ description: 'Date when the news was issued' })
  @IsDateString()
  @IsOptional()
  issuedAt?: string;
}

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}

export class PaginatedNewsResponseDto {
  @ApiProperty({ description: 'Array of news articles', type: [NewsDto] })
  data: NewsDto[];

  @ApiProperty({ description: 'Pagination metadata', type: [PaginationQueryDto] })
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} 