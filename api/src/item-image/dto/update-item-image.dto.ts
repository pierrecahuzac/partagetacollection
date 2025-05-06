import { PartialType } from '@nestjs/mapped-types';
import { CreateItemImageDto } from './create-item-image.dto';

export class UpdateItemImageDto extends PartialType(CreateItemImageDto) {}
