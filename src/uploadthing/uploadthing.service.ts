import { Injectable, BadRequestException } from '@nestjs/common';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class UploadThingService {
  private utapi: UTApi;

  constructor() {
    const token = process.env.UPLOADTHING_TOKEN;
    if (!token) throw new Error('UPLOADTHING_TOKEN not set');
    this.utapi = new UTApi({ token });
  }

  /** Upload an image (<=4MB) */
  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    if (!file.mimetype.startsWith('image/'))
      throw new BadRequestException('Only images allowed');
    if (file.size > 4 * 1024 * 1024)
      throw new BadRequestException('Image must be < 4MB');

    try {
      // Node buffer -> Blob (use Uint8Array for compatibility)
      const uint8Array = new Uint8Array(file.buffer);
      const blob = new Blob([uint8Array], { type: file.mimetype });
      const response = await this.utapi.uploadFiles(
        new File([blob], file.originalname, { type: file.mimetype }),
      );

      if (!response.data) throw new BadRequestException('Upload failed');

      return { url: response.data.ufsUrl, key: response.data.key };
    } catch (err: any) {
      console.error('Image upload error:', err);
      throw new BadRequestException(err.message || 'Upload failed');
    }
  }

  /** Upload a video (<=512MB) */
  async uploadVideo(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    if (!file.mimetype.startsWith('video/'))
      throw new BadRequestException('Only videos allowed');
    if (file.size > 512 * 1024 * 1024)
      throw new BadRequestException('Video must be < 512MB');

    try {
      // Node buffer -> Blob (use Uint8Array for compatibility)
      const uint8Array = new Uint8Array(file.buffer);
      const blob = new Blob([uint8Array], { type: file.mimetype });
      const response = await this.utapi.uploadFiles(
        new File([blob], file.originalname, { type: file.mimetype }),
      );

      if (!response.data) throw new BadRequestException('Upload failed');

      return { url: response.data.ufsUrl, key: response.data.key };
    } catch (err: any) {
      console.error('Video upload error:', err);
      throw new BadRequestException(err.message || 'Upload failed');
    }
  }

  /** Delete a file by key */
  async deleteFile(fileKey: string) {
    if (!fileKey) throw new BadRequestException('File key required');
    try {
      await this.utapi.deleteFiles(fileKey);
    } catch (err) {
      console.error('Delete error:', err);
      throw new BadRequestException('Failed to delete file');
    }
  }
}
