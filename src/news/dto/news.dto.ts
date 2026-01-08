import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  titleUz: string;

  @IsString()
  @IsNotEmpty()
  titleRu: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  @IsNotEmpty()
  descriptionUz: string;

  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  titleUz?: string;

  @IsString()
  @IsOptional()
  titleRu?: string;

  @IsString()
  @IsOptional()
  titleEn?: string;

  @IsString()
  @IsOptional()
  descriptionUz?: string;

  @IsString()
  @IsOptional()
  descriptionRu?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  author?: string;
}
