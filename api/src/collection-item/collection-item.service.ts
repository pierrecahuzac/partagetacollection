import { Injectable } from '@nestjs/common';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class CollectionItemService {
  async create(createItemId: string, userId: string, collectionId: string) {
    try {
      const result = await prisma.collectionItem.create(
        {
          data: {
            itemId: createItemId,
            userId,
            collectionId
          }
        }
      )
      return result
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all collectionItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collectionItem`;
  }

  update(id: number, updateCollectionItemDto: UpdateCollectionItemDto) {
    return `This action updates a #${id} collectionItem`;
  }

  async remove(collectionItemId: string, collectionId: string) {
    try {

      return await prisma.collectionItem.deleteMany({
        where: {
          id: collectionItemId,
          collectionId
        },
      });
    } catch (error) {
      console.log(error);

    }
    return `This action removes a #${collectionItemId} collectionItem`;
  }
}
