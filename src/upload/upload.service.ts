import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'public');
  private readonly imagesPath = join(this.uploadPath, 'images');
  private readonly videosPath = join(this.uploadPath, 'videos');

  constructor() {
    this.ensureDirectoriesExist();
  }

  private ensureDirectoriesExist() {
    [this.uploadPath, this.imagesPath, this.videosPath].forEach((path) => {
      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }
    });
  }

  validateImage(file: Express.Multer.File) {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only image files are allowed (jpeg, jpg, png, webp)',
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Image size should not exceed 10MB ');
    }
  }

  validateVideo(file: Express.Multer.File) {
    const allowedMimes = [
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
    ];
    if (!allowedMimes.includes) {
      throw new BadRequestException(
        'Only video files are allowed (mp4, mpeg, mov, avi)',
      );
    }

    const maxSize = 150 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Video size should not exceed 150MB');
    }
  }

  getImageUrl(filename: string, host: string) {
    return `${host}/public/images/${filename}`;
  }

  getVideoUrl(filename: string, host: string) {
    return `${host}/public/videos/${filename}`;
  }
}
