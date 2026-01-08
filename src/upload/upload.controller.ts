import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `image-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    this.uploadService.validateImage(file);

    const host = `${req.protocol}://${req.get('host')}`;
    const url = this.uploadService.getImageUrl(file.filename, host);

    return {
      message: 'Image uploaded successfully!',
      filename: file.filename,
      url,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/videos',
        filename(req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `video-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    this.uploadService.validateVideo(file);

    const host = `${req.protocol}://${req.get('host')}`;
    const url = this.uploadService.getVideoUrl(file.filename, host);

    return {
      message: 'Video uploaded successfully!',
      filename: file.filename,
      url,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
