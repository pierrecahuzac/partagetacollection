import { Injectable } from '@nestjs/common';
import { CreateCollectionStatusDto } from './dto/create-collection-status.dto';
import { UpdateCollectionStatusDto } from './dto/update-collection-status.dto';

@Injectable()
export class CollectionStatusService {
  create(createCollectionStatusDto: CreateCollectionStatusDto) {
    return 'This action adds a new collectionStatus';
  }

  findAll() {
    return `This action returns all collectionStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionStatus`;
  }

  update(id: number, updateCollectionStatusDto: UpdateCollectionStatusDto) {
    return `This action updates a #${id} collectionStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionStatus`;
  }
}
