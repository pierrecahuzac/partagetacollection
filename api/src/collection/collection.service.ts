import { Injectable } from '@nestjs/common';

import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class CollectionService {
  async create(createCollectionDto: any, userId: string) {
    try {
      const { title, description, collectionStatus } =
        createCollectionDto;


      const createCollection = await prisma.collection.create({
        //@ts-ignore
        data: {
          userId,
          //@ts-ignore
          title,
          description: description ? description : "",

          //@ts-ignore
          startedAt: new Date(),
          status: collectionStatus ? collectionStatus : 'PRIVATE',

        },
      });
      return createCollection
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const collections = await prisma.collection.findMany();
      return collections;
    } catch (error) {
      console.log(error);

    }
  }
  async findAllUserCollection(userId: string) {
    try {
      return await prisma.collection.findMany({
        where: {
          userId
        },
        include: {
          images: true
        }
      });
    } catch (error) {
      console.log(error);

    }
  }

  async findOne(id: string) {
    const result = await prisma.collection.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      }
    });
    return result;
  }

  update(id: string, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  // async addItemsToCollection(
  //   collectionId: string,
  //   itemsToAdd: any, // tableau d'IDs d'items
  //   userId: string
  // ) {
  //   try {
  //     // Vérifie que la collection existe et appartient bien à l'utilisateur
  //     const collection = await prisma.collection.findUnique({
  //       where: { id: collectionId },
  //     });

  //     if (!collection) {
  //       throw new Error("Collection introuvable");
  //     }

  //     // Crée les liens dans la table pivot un par un, pour récupérer les IDs
  //     const itemsAdded = await Promise.all(
  //       itemsToAdd.itemsToAdd.map(async (itemId) => {
  //         return await prisma.collectionItem.create({
  //           data: {
  //             collectionId,
  //             itemId,
  //             userId,
  //           },
  //         });
  //       })
  //     );

  //     // Optionnel : récupérer la collection avec les items ajoutés
  //     const updatedCollection = await prisma.collection.findUnique({
  //       where: { id: collectionId },
  //       include: {
  //         items: {
  //           include: {
  //             item: true,
  //           },
  //         },
  //       },
  //     });
  //     return { updatedCollection, itemsAdded };
  //   } catch (error) {
  //     console.error("Erreur addItemsToCollection :", error);
  //     throw new Error("Erreur lors de l'ajout des items à la collection");
  //   }
  // }

  async remove(id: string) {
    try {
      // supprimer les items dans colelctionItems qui correspondent à cette collection
      const deletedItems = await prisma.collectionItem.deleteMany({
        where: {
          collectionId: id
        }
      })
      const collectionToDelete = await prisma.collection.findUnique({
        where: {
          id
        }
      })
      if (!collectionToDelete) {
        return { message: `collection not founded with this ${id}` }
      }
      await prisma.collection.delete({
        where: {
          id
        }
      })
      return { message: "Collection successfuly deleted" }

    } catch (error) {
      console.log(error);

    }
  }
}
