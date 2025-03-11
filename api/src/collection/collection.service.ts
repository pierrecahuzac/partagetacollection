import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class CollectionService {
  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

 async findAll() {
   // const collections = await prisma.
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
