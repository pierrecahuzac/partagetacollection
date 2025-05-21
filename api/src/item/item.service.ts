import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
import { FileUploadService } from '../file-upload/file-upload.service';

const prisma = new PrismaClient();

dotenv.config();

@Injectable()
export class ItemService {
  constructor(private readonly fileUploadService: FileUploadService) { }

  async create(createItemDto: CreateItemDto,
    userId: string,
    files?: Express.Multer.File[]) {

    const { name,
      description,
      price,
      quantity,
      barcode,
      formatTypeId,
      currency } = createItemDto
    try {
      // Créer l'item d'abord
      const createdItem = await prisma.item.create({
        //@ts-ignore
        data: {
          // userId,
          name,
          description,
          //price: price ? Number(price) : 0,
          //  quantity: quantity ? Number(quantity) : 1,
          barcode: barcode ? barcode : null,
          formatTypeId,
          //  currency: currency ? currency : "",
        },
      });

      // Si des fichiers ont été uploadés, les traiter avec FileUploadService
      if (files && files.length > 0) {
        // On utilise la méthode uploadItemCovers pour chaque fichier
        await Promise.all(
          files.map(file =>
            this.fileUploadService.uploadItemCovers(file, createdItem.id, userId)
          )
        );
      }

      return createdItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // async findAllUserItems(userId: string) {
  //   try {

  //     const allUserItems = await prisma.item.findMany({
  //       where: {
  //         userId
  //       },
  //       select: {
  //         id: true,
  //         barcode: true,
  //         description: true,
  //         name: true,
  //         price: true,
  //         quantity: true,
  //         updatedAt: true,
  //         createdAt: true,
  //         formatType: {
  //           select: {
  //             id: true,
  //             name: true
  //           }
  //         },
  //         userId: true,
  //         user: {
  //           select: {
  //             username: true,
  //           },
  //         },
  //         images: {
  //           select: {
  //             id: true,
  //             url: true,
  //             isCover: true,
  //           },
  //         },
  //       },
  //     });

  //     return allUserItems;
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //     throw new Error('Failed to fetch items');
  //   }
  // }

  async findOne(id: string) {
    const result = await prisma.item.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        barcode: true,
        description: true,
        name: true,
        // price: true,
        // quantity: true,
        updatedAt: true,
        createdAt: true,
        formatType: {
          select: {
            id: true,
            name: true
          }
        },
        // userId: true,
        // user: {
        //   select: {
        //     username: true,
        //   },
        // },
        images: {
          select: {
            id: true,
            url: true,
            isCover: true,
          },
        },
        collections: {
          select: {
            collectionId: true,
            condition: true,
          }
        }
      },
    });
    return result
  }

  async findAll() {
    try {
      return await prisma.item.findMany({
        select: {
          id: true,
          barcode: true,
          description: true,
          name: true,
          //price: true,
          // quantity: true,
          updatedAt: true,
          createdAt: true,
          formatType: {
            select: {
              id: true,
              name: true
            }
          },
          // userId: true,
          // user: {
          //   select: {
          //     username: true,
          //   },
          // },
          images: {
            select: {
              id: true,
              url: true,
              isCover: true,
            },
          },
        },
      })
    } catch (error) {
      return error
    }
  }
  async update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async delete(id: string) {
    try {
      return await prisma.item.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.log(error);

    }
  }
}
