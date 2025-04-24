import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadController } from 'src/file-upload/file-upload.controller';

@Module({
  controllers: [CollectionController, FileUploadController],
  providers: [CollectionService, FileUploadService],
})
export class CollectionModule {}
