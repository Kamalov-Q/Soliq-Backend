import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadThingService } from './uploadthing.service';
import * as multer from 'multer';

const memoryStorage = multer.memoryStorage();

@Controller('api/uploadthing')
export class UploadThingController {
  constructor(private readonly uploadThingService: UploadThingService) {}

  @Get('test')
  test() {
    return {
      success: true,
      message: 'UploadThing controller is working',
      endpoints: {
        image: 'POST /api/uploadthing/image',
        video: 'POST /api/uploadthing/video',
        delete: 'DELETE /api/uploadthing/file',
      },
    };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException(
        'No file uploaded. Use key "file" in multipart/form-data',
      );
    const result = await this.uploadThingService.uploadImage(file);
    return { success: true, message: 'Image uploaded', data: result };
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage }))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException(
        'No file uploaded. Use key "file" in multipart/form-data',
      );
    const result = await this.uploadThingService.uploadVideo(file);
    return { success: true, message: 'Video uploaded', data: result };
  }

  @Delete('file')
  async deleteFile(@Body('key') key: string) {
    if (!key) throw new BadRequestException('File key is required');
    await this.uploadThingService.deleteFile(key);
    return { success: true, message: 'File deleted' };
  }
}
