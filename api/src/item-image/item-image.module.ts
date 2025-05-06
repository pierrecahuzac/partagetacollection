import { Module } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { ItemImageController } from './item-image.controller';

@Module({
  controllers: [ItemImageController],
  providers: [ItemImageService],
})
export class ItemImageModule {}
