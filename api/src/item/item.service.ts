import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, userId: string) {
    console.log('ici');

    const { name, description, price, isPublic, quantity, barcode, formatTypeId, cover, currency } = createItemDto

    try {
      const result = await prisma.item.create({
        //@ts-ignore
        data: {
          userId,
          name,
          description,
          price: price ? Number(price) : 0,
          quantity: quantity ? Number(quantity) : 1,
          barcode: barcode ? barcode : null,
          formatTypeId,
          currency : currency ? currency : "",
          //@ts-ignore
          //cover
        },
      });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(query: { isConnected: string }) {
    try {      // Vérifier si l'utilisateur est connecté
      if (query.isConnected === "false") {
        const allItems = await prisma.item.findMany({

        });


        return allItems
      }
      const allItems = await prisma.item.findMany({

        select: {
          id: true,
          barcode: true,
          description: true,

          name: true,
          price: true,
          quantity: true,
          updatedAt: true,
          createdAt: true,
          //@ts-ignore
          formatType: true,
          cover: true,
          userId: true,
          user: {
            select: {
              username: true, // Récupérer le username du propriétaire
            },
          },
        },
      });


      return allItems;
    } catch (error) {
      console.log(error);
      return `An error occurred while fetching the items`;
    }
  }

  async findOne(id: string) {
    return await prisma.item.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
