import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Video URL from UploadThing',
    example: 'https://utfs.io/f/abc123.mp4',
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @ApiProperty({
    description: 'Blog title in Uzbek',
    example: 'Yangiliklar haqida',
  })
  @IsString()
  @IsNotEmpty()
  titleUz: string;

  @ApiProperty({
    description: 'Blog title in Russian',
    example: 'О новостях',
  })
  @IsString()
  @IsNotEmpty()
  titleRu: string;

  @ApiProperty({
    description: 'Blog title in English',
    example: 'About News',
  })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiProperty({
    description: 'Date when the blog was issued',
    example: '2025-01-10T12:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  issuedAt: string;
}
export class UpdateBlogDto {
  @ApiPropertyOptional({
    description: 'Video URL from UploadThing',
    example: 'https://utfs.io/f/abc123.mp4',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Blog title in Uzbek',
    example: 'Yangiliklar haqida',
  })
  @IsString()
  @IsOptional()
  titleUz?: string;

  @ApiPropertyOptional({
    description: 'Blog title in Russian',
    example: 'О новостях',
  })
  @IsString()
  @IsOptional()
  titleRu?: string;

  @ApiPropertyOptional({
    description: 'Blog title in English',
    example: 'About News',
  })
  @IsString()
  @IsOptional()
  titleEn?: string;

  @ApiPropertyOptional({
    description: 'Date when the blog was issued',
    example: '2025-01-10T12:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  issuedAt?: string;
}
