import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadController } from 'src/file-upload/file-upload.controller';
import { ImageService } from 'src/image/image.service';
import { ImageController } from 'src/image/image.controller';

@Module({
  controllers: [CollectionController, FileUploadController, ImageController],
  providers: [CollectionService, FileUploadService, ImageService],
})
export class CollectionModule {}
