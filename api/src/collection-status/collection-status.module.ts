import { Module } from '@nestjs/common';
import { CollectionStatusService } from './collection-status.service';
import { CollectionStatusController } from './collection-status.controller';


@Module({
  
  controllers: [CollectionStatusController],
  providers: [CollectionStatusService],
  exports: [CollectionStatusService],
})
export class CollectionStatusModule {}
