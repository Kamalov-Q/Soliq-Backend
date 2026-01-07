import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsUrl()
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

export class UpdateBlogDto implements Partial<CreateBlogDto> {}
