import { Injectable } from '@nestjs/common';

import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CollectionService {
  async create(createCollectionDto: any, userId: string) {
    try {
      const { title, description, isPublic, startedAt, cover } =
        createCollectionDto;

      const result = await prisma.collection.create({
        //@ts-ignore
        data: {
          userId,
          //@ts-ignore
          title,
          description,
          isPublic,
          
          //@ts-ignore
          startedAt: new Date(),
        },
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(userId: string |null) {
    try {
      const collections = await prisma.collection.findMany({
            where: userId
                ? { userId } 
                : { isPublic: true }, 
                include: {
                 
                },

                
        });        
      return collections;
    } catch (error) {}
  }
  async findAllUserCollection(userId: string |null) {
    try {
      const collections = await prisma.collection.findMany({      
        });        
      return collections;
    } catch (error) {
      console.log(error);
      
    }
  }

  async findOne(id: string) {
    const result = await prisma.collection.findUnique({
      where: {
        id,
      },
      
    });
    return result;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {


    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
