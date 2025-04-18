import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadController } from 'src/file-upload/file-upload.controller';

@Module({
  controllers: [ItemController, FileUploadController],
  providers: [ItemService, FileUploadService],
})
export class ItemModule { }
