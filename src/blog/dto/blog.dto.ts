import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  titleUz: string;

  @IsString()
  @IsNotEmpty()
  titleRu: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsOptional()
  titleUz: string;

  @IsString()
  @IsOptional()
  titleRu: string;

  @IsString()
  @IsOptional()
  titleEn: string;
}
