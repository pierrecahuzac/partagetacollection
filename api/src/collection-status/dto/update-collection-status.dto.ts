import { PartialType } from '@nestjs/swagger';
import { CreateCollectionStatusDto } from './create-collection-status.dto';

export class UpdateCollectionStatusDto extends PartialType(CreateCollectionStatusDto) {}
