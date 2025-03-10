import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

import { TagModule } from './tag/tag.module';

import { AuthModule } from './auth/auth.module';

import { CollectionModule } from './collection/collection.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UserModule,  TagModule, AuthModule, ItemModule, CollectionModule, ItemModule],
  controllers: [AppController,  UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
