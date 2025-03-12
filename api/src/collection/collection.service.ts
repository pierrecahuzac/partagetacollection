import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';
import { log } from 'node:console';
const prisma = new PrismaClient();

@Injectable()
export class CollectionService {
  async create(createCollectionDto: CreateCollectionDto, userId) {
    console.log(userId);

    try {
      const { title, description, isPublic } = createCollectionDto;
      console.log(title, description, isPublic);
      const result = await prisma.collection.create({
        data: {
          title: createCollectionDto.title,
          description,
          userId,
          isPublic,
          tags: {
            create: [
              {
                name: 'ahah',
              },
            ],
          },
          startingAt: new Date(),
          endingAt: new Date(),
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    return 'This action adds a new collection';
  }

  async findAll(userId: string) {
    try {
      const collections =
        await prisma.collection.findMany({
          where: {
            userId,
          }
        });
        console.log(collections);
        
        return collections;
    } catch (error) {}
  }

  async findOne(id: string) {
    const result =  await prisma.collection.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    console.log(result);
    return result;
    
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
