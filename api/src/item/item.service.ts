import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
import { FileUploadService } from '../file-upload/file-upload.service';
import { log } from 'console';

const prisma = new PrismaClient();

dotenv.config();

@Injectable()
export class ItemService {
  constructor(private readonly fileUploadService: FileUploadService) { }

  async create(createItemDto: CreateItemDto,
    userId: string,
    files?: Express.Multer.File[]) {
    const {
      name,
      description,
      formatTypeId,
      artist,
      author,
      publisher,
      collection,
      director,
      platform,
      genre,
      //developper,
      album,
      year,
      style,
      barcode,
      gameDeveloper,
      creatorId,
      isPublic } = createItemDto
    try {
      const createdItem = await prisma.item.create({

        data: {
          name: name,
          description: description ? description : "",
          barcode: barcode ? barcode : null,
          //   formatType: formatType ? formatType : null,
          // formatTypeId: formatTypeId ? formatTypeId : null,
          formatType: formatTypeId ? { connect: { id: formatTypeId } } : undefined,
          isPublic: isPublic ? isPublic : false,
          artist: artist ? artist : "",
          album: album ? album : "",
          year: year ? Number(year) : null,
          style: style ? style : "",
          author: author ? author : "",
          publisher: publisher ? publisher : "",
          collection: collection ? collection : "",
          director: director ? director : "",
          platform: platform ? platform : "",
          genre: genre ? genre : "",
          //@ts-ignore
          //  developper: developper ? developper : "",
          gameDeveloper: gameDeveloper ? gameDeveloper : null,
          //@ts-ignore
          creatorId: userId
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
  async findAllCreatedItemsByUser(id: string) {
    try {
      const result = await prisma.item.findMany({
        where:
        {
          //@ts-ignore
          creatorId: id
        }
      })
      return result;

    } catch (error) {
      console.log(error)
      throw Error(error)
    }
  }


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
        //@ts-ignore
        creatorId: true,
        updatedAt: true,
        createdAt: true,
        formatType: {
          select: {
            id: true,
            name: true
          }
        },
        album: true,
        artist: true,
        author: true,
        director: true,
        gameDeveloper: true,
        gameEditor: true,
        genre: true,
        isbn: true,
        language: true,
        platform: true,
        videoEditor: true,
        denomination: true,
        likeItems: true,
        material: true,
        audioDuration: true,
        country: true,
        collection: true,
        isPublic: true,
        price: true,
        quantity: true,
        videoDuration: true,
        formatTypeId: true,
        publisher: true,
        style: true,
        year: true,
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
   

    return { result }
  }
  async findItemInCollection(id: string) {

    const itemInCollection = await prisma.collectionItem.findUnique({
      //@ts-ignore
      where: {
        id
      }
    })
 
    const result = await prisma.item.findUnique({
      where: {
        id: itemInCollection.itemId
      },
      select: {
        id: true,
        barcode: true,
        description: true,
        name: true,
        //@ts-ignore
        creatorId: true,
        updatedAt: true,
        createdAt: true,
        formatType: {
          select: {
            id: true,
            name: true
          }
        },
        album: true,
        artist: true,
        author: true,
        director: true,
        gameDeveloper: true,
        gameEditor: true,
        genre: true,
        isbn: true,
        language: true,
        platform: true,
        videoEditor: true,
        denomination: true,
        likeItems: true,
        material: true,
        audioDuration: true,
        country: true,
        collection: true,
        isPublic: true,
        price: true,
        quantity: true,
        videoDuration: true,
        formatTypeId: true,
        publisher: true,
        style: true,
        year: true,
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


    return { result, itemInCollection }
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
