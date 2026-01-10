import { Module } from '@nestjs/common';
import { UploadThingService } from './uploadthing.service';
import { UploadThingController } from './uploadthing.controller';

@Module({
  imports: [],
  controllers: [UploadThingController],
  providers: [UploadThingService],
})
export class UploadThingModule {}
