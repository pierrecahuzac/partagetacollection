import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, userId: string) {
    const { name, description, price, isPublic, quantity, barcode } =
      createItemDto;
    try {
      const result = await prisma.item.create({
        data: {
          // @ts-ignore
          userId,
          name: name,
          description: description,
          price: price ? Number(price) : 0,
          isPublic: isPublic === true ? true : false,
          quantity: quantity ? Number(quantity) : 1,
          barcode: barcode ? barcode : null,
        },
      });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // async findPublicItems() {
  //   try {
  //     const allPublicItems = await prisma.item.findMany({
  //       where: {
  //         isPublic: true,
  //       },
  //     });
  //     return allPublicItems;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return `This action returns all item`;
  // }
  async findAll() {
    try {
      const allItems = await prisma.item.findMany({
        select: {
          barcode: true,
          description: true,
          imageURL: true,
          isPublic: true,
          name: true,
          price: true,
          quantity: true,
          updatedAt: true,
          createdAt: true,
          userId: true,
          user: {
            select: {
              username: true, // Récupérer le username du propriétaire
            },
          },
        },
      });
      console.log(allItems);

      return allItems;
    } catch (error) {
      console.log(error);
    }
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
