import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';
import { stringify } from 'querystring';
const prisma = new PrismaClient();

@Injectable()
export class CollectionService {
  async create(createCollectionDto: any, userId: string) {
    try {
      const { title, description, isPublic, startedAt, cover } =
        createCollectionDto;

      const result = await prisma.collection.create({
        data: {
          userId,
          //@ts-ignore
          title,
          description,
          isPublic,
          tags: {
            create: [
              {
                name: 'ahah',
              },
            ],
          },
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

  async findOne(id: string) {
    const result = await prisma.collection.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    return result;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    // @ts-ignore
    console.log('id', id, 'updateCollectionDto', updateCollectionDto.cover);

    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
