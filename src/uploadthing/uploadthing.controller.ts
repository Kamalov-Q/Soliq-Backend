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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UploadThingService } from './uploadthing.service';

@ApiTags('File Upload')
@Controller('api/uploadthing')
export class UploadThingController {
  constructor(private readonly uploadThingService: UploadThingService) {}

  @Get('test')
  @ApiOperation({ summary: 'Test UploadThing endpoint' })
  @ApiResponse({ status: 200, description: 'Service is working' })
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
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.uploadThingService.uploadImage(file);

    return {
      success: true,
      message: 'Image uploaded successfully',
      data: result,
    };
  }

  @Post('video')
  @ApiOperation({ summary: 'Upload a video' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.uploadThingService.uploadVideo(file);

    return {
      success: true,
      message: 'Video uploaded successfully',
      data: result,
    };
  }

  @Delete('file')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          example: 'abc123xyz',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async deleteFile(@Body('key') key: string) {
    if (!key) {
      throw new BadRequestException('File key is required');
    }

    await this.uploadThingService.deleteFile(key);

    return {
      success: true,
      message: 'File deleted successfully',
    };
  }
}
