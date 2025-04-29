import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';



import { AuthModule } from './auth/auth.module';

import { CollectionModule } from './collection/collection.module';
import { ItemModule } from './item/item.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FormatTypeModule } from './format-type/format-type.module';
import { FormatTypeController } from './format-type/format-type.controller';
import { FormatTypeService } from './format-type/format-type.service';
import { CollectionItemModule } from './collection-item/collection-item.module';
import { CollectionStatusModule } from './collection-status/collection-status.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule,   AuthModule, ItemModule, CollectionModule, ItemModule, FileUploadModule, FormatTypeModule, CollectionItemModule, CollectionStatusModule, CloudinaryModule, ImageModule],
  controllers: [AppController,  UserController, FormatTypeController],
  providers: [AppService, UserService, FormatTypeService],
})
export class AppModule {}
