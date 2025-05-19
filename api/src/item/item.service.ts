import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto, userId: string) {
    const { name,
      description,
      price,
      quantity,
      barcode,
      formatTypeId,
      currency } = createItemDto

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
          //@ts-ignore
          currency: currency ? currency : "",
          //cover
        },
      });


      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllUserItems(userId: string) {
    try {
      // Vérifier si l'utilisateur est connecté
      const allUserItems = await prisma.item.findMany({
        where: {
          userId
        },
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
          // cover: true,
          userId: true,
          user: {
            select: {
              username: true, // Récupérer le username du propriétaire
            },
          },
          images: true


        },
      });
      return allUserItems;
    } catch (error) {
      console.log(error);
      return `An error occurred while fetching the items`;
    }
  }
  async findOne(id: string) {
    const result = await prisma.item.findUnique({
      where: {
        id
      },
      include: {
        collections: {
          select: {
            collectionId: true,
            condition: true,

          }
        }
      }
    });
    return result
  }
  async findAll() {
    try {
      return await prisma.item.findMany()
    } catch (error) {
      return error
    }
  }
  async update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }
}
