import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @IsUrl()
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
  @IsUrl()
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
