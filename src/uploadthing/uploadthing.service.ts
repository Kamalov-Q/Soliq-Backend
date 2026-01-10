import { Injectable, BadRequestException } from '@nestjs/common';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class UploadThingService {
  private utapi: UTApi;

  constructor() {
    const token = process.env.UPLOADTHING_TOKEN;

    if (!token) {
      throw new Error('UPLOADTHING_TOKEN is not set in environment variables');
    }

    this.utapi = new UTApi({ token });
    console.log('UploadThing service initialized');
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    try {
      // Validate file type
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files are allowed');
      }

      // Validate file size (4MB)
      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('Image size must be less than 4MB');
      }
      // Convert Buffer to Uint8Array for browser compatibility
      const uint8Array = new Uint8Array(file.buffer);
      const uploadFile = new File([uint8Array], file.originalname, {
        type: file.mimetype,
      });

      const response = await this.utapi.uploadFiles(uploadFile);

      if (!response.data) {
        throw new Error('Upload failed: No data returned');
      }

      return {
        url: response.data.ufsUrl,
        key: response.data.key,
      };
    } catch (error) {
      console.error('Image upload error:', error);
      throw new BadRequestException(error.message || 'Failed to upload image');
    }
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<{ url: string; key: string }> {
    try {
      // Validate file type
      if (!file.mimetype.startsWith('video/')) {
        throw new BadRequestException('Only video files are allowed');
      }

      // Validate file size (512MB)
      const maxSize = 512 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException('Video size must be less than 512MB');
      }
      // Convert Buffer to Uint8Array for browser compatibility
      const uint8Array = new Uint8Array(file.buffer);
      const uploadFile = new File([uint8Array], file.originalname, {
        type: file.mimetype,
      });

      const response = await this.utapi.uploadFiles(uploadFile);

      if (!response.data) {
        throw new Error('Upload failed: No data returned');
      }

      return {
        url: response.data.ufsUrl,
        key: response.data.key,
      };
    } catch (error) {
      console.error('Video upload error:', error);
      throw new BadRequestException(error.message || 'Failed to upload video');
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.utapi.deleteFiles(fileKey);
    } catch (error) {
      console.error('File deletion error:', error);
      throw new BadRequestException('Failed to delete file');
    }
  }
}
