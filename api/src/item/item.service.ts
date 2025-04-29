import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
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

  // async findAll(query: { isConnected: string }) {
  //   try {
  //     // Vérifier si l'utilisateur est connecté
  //     if (query.isConnected === "false") {
  //       const allItems = await prisma.item.findMany({

  //       });


  //       return allItems
  //     }
  //     const allItems = await prisma.item.findMany({

  //       select: {
  //         id: true,
  //         barcode: true,
  //         description: true,

  //         name: true,
  //         price: true,
  //         quantity: true,
  //         updatedAt: true,
  //         createdAt: true,
  //         //@ts-ignore
  //         formatType: true,
  //         cover: true,
  //         userId: true,
  //         user: {
  //           select: {
  //             username: true, // Récupérer le username du propriétaire
  //           },
  //         },
  //       },
  //     });


  //     return allItems;
  //   } catch (error) {
  //     console.log(error);
  //     return `An error occurred while fetching the items`;
  //   }
  // }
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
          cover: true,
          userId: true,
          user: {
            select: {
              username: true, // Récupérer le username du propriétaire
            },
          },
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
      }
      ,
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

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string) {
    try {
      const itemFounded = await prisma.item.findUnique({
        where: {
          id
        }
      })
      const coverPath = itemFounded.cover.trim();
      if (coverPath) {
        console.log('__dirname:', __dirname);
        console.log('process.cwd():', process.cwd());
        const uploadsDir = path.join(process.cwd(), 'uploads');
        console.log(uploadsDir);
        
        if (!fs.existsSync(uploadsDir)) {
          console.error("Le dossier 'uploads' n'existe pas !");
          return;
        }
        // Générer le chemin complet vers l'image        
        const imagePath = path.join(uploadsDir, coverPath);
        console.log('Chemin de l\'image:', imagePath); // Vérifie si le chemin est correct

        // Supprimer l'image
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Erreur lors de la suppression de l'image:", err);
          } else {
            console.log("Image supprimée avec succès.");
          }
        });
      }
      // 1745878979626-Capture d'Ã©cran 2025-03-26 234242.png

      // if (!itemFounded) {
      //   return { message: `l'objet introuvable` }
      // }
      // const result = await prisma.item.delete({
      //   where: {
      //     id
      //   }
      // })

      // return { result, message: `l'objet a été supprimé` }
    } catch (error) {
      console.log(error)
    }

  }
}
