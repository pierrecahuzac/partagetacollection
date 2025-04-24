import { Module } from '@nestjs/common';
import { CollectionItemService } from './collection-item.service';
import { CollectionItemController } from './collection-item.controller';

@Module({
  controllers: [CollectionItemController],
  providers: [CollectionItemService],
})
export class CollectionItemModule {}
