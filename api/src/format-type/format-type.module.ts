import { Module } from '@nestjs/common';
import { FormatTypeService } from './format-type.service';
import { FormatTypeController } from './format-type.controller';

@Module({
  controllers: [FormatTypeController],
  providers: [FormatTypeService],
})
export class FormatTypeModule {}
