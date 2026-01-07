import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
  descUz: string;

  @IsString()
  @IsNotEmpty()
  descRu: string;

  @IsString()
  @IsNotEmpty()
  descEn: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}

export class UpdateNewsDto implements Partial<CreateNewsDto> {}
