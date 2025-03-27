import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionItemDto } from './create-collection-item.dto';

export class UpdateCollectionItemDto extends PartialType(CreateCollectionItemDto) {}
