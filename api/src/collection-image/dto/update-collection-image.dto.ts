import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionImageDto } from './create-collection-image.dto';

export class UpdateCollectionImageDto extends PartialType(CreateCollectionImageDto) {}
