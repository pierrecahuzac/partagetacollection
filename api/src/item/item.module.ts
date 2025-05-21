import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadController } from 'src/file-upload/file-upload.controller';
import { CollectionItemService } from 'src/collection-item/collection-item.service';
import { ImageService } from 'src/image/image.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ItemController, FileUploadController],
  providers: [ItemService, FileUploadService, CollectionItemService, ImageService,UserService ],
})
export class ItemModule { }
