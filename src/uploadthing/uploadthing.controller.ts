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
  constructor(private readonly uploadThingService: UploadThingService) { }

  /**
   * Test endpoint
   */
  @Get('test')
  @ApiOperation({ summary: 'Test UploadThing endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is working',
    schema: {
      example: {
        success: true,
        message: 'UploadThing controller is working',
        endpoints: {
          image: 'POST /api/uploadthing/image',
          video: 'POST /api/uploadthing/video',
          delete: 'DELETE /api/uploadthing/file',
        },
      },
    },
  })
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

  /**
   * Upload an image
   */
  @Post('image')
  @ApiOperation({ summary: 'Upload an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    schema: {
      example: {
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: 'https://utfs.io/f/abc123.jpg',
          key: 'abc123',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request: file missing or invalid' })
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

  /**
   * Upload a video
   */
  @Post('video')
  @ApiOperation({ summary: 'Upload a video' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Video uploaded successfully',
    schema: {
      example: {
        success: true,
        message: 'Video uploaded successfully',
        data: {
          url: 'https://utfs.io/f/abc123.mp4',
          key: 'abc123',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request: file missing or invalid' })
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

  /**
   * Delete a file
   */
  @Delete('file')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        key: { type: 'string', example: 'abc123xyz' },
      },
      required: ['key'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'File deleted successfully',
    schema: {
      example: { success: true, message: 'File deleted successfully' },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request: key missing' })
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
