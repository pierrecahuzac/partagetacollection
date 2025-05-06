import { Module } from '@nestjs/common';
import { CollectionImageService } from './collection-image.service';
import { CollectionImageController } from './collection-image.controller';

@Module({
  controllers: [CollectionImageController],
  providers: [CollectionImageService],
})
export class CollectionImageModule {}
