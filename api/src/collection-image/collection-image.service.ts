import { Injectable } from '@nestjs/common';
import { CreateCollectionImageDto } from './dto/create-collection-image.dto';
import { UpdateCollectionImageDto } from './dto/update-collection-image.dto';

@Injectable()
export class CollectionImageService {
  create(createCollectionImageDto: CreateCollectionImageDto) {
    return 'This action adds a new collectionImage';
  }

  findAll() {
    return `This action returns all collectionImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionImage`;
  }

  update(id: number, updateCollectionImageDto: UpdateCollectionImageDto) {
    return `This action updates a #${id} collectionImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} collectionImage`;
  }
}
