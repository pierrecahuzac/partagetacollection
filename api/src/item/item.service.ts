import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class ItemService {
  async create(createItemDto: CreateItemDto) {
    try {
      const result = await prisma.item.create({
        data: {
          name: createItemDto.name,
          description: createItemDto.description,
          price: 0,
          isPublic: createItemDto.isPublic === true ? true : false,
          quantity: 1,
          barcode: '11111111111',
        },
      });
      console.log(result);

      return result;
    } catch (error) {}
    return 'This action adds a new item';
  }
  async findItems() {
    try {
      console.log('ici');
      
    } catch (error) {
      console.log(error);
    }
  }
  async findPublicItems() {
    try {
      const allPublicItems = await prisma.item.findMany({
        where: {
          isPublic: true,
        },
      });
      return allPublicItems;
    } catch (error) {
      console.log(error);
    }
    return `This action returns all item`;
  }
  async findAll() {
    try {
      const allItems = await prisma.item.findMany();
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
