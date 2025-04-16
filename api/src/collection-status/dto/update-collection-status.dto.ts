import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionStatusDto } from './create-collection-status.dto';

export class UpdateCollectionStatusDto extends PartialType(CreateCollectionStatusDto) {}
