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
      console.log(result);
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

  async remove(itemId: string, collectionId: string) {
    try {
      const findItem = await prisma.item.findFirst({
        where: {
          id: itemId
        }
      })
      console.log(findItem.id);
      if (!findItem) {
        return { message: "item not founded" }
      }
      return await prisma.collectionItem.deleteMany({
        where: {
          itemId: itemId,
          collectionId: collectionId,
        },
      });
    } catch (error) {
      console.log(error);

    }
    return `This action removes a #${itemId} collectionItem`;
  }
}
