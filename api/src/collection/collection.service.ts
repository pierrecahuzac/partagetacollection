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
        //@ts-ignore
        collectionItems: {
          include: {
            item: {
              include: {
                images: true,
              }
            },
            
          }
        }
      }
    });
    return result;
  }

  update(id: string, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  async addItemsToCollection(
    collectionId: string,
    items: { itemsToAdds: string[] },
    userId: string
  ) {
    console.log(items);

    try {
      // 1. Vérification de la collection (appartenance à l'utilisateur)
      const collectionExist = await prisma.collection.findUnique({
        where: { id: collectionId },
      });

      if (!collectionExist) {
        throw new Error("Collection introuvable");
      }

      // Problème : La collection existe, mais appartient-elle à l'utilisateur ?
      if (collectionExist.userId !== userId) {
        throw new Error("Accès non autorisé à cette collection.");
      }

      // 2. Création des CollectionItems
      // itemsToAdd est 'any', mais vous accédez à itemsToAdd.itemsToAdd
      // Cela suggère que le paramètre devrait être itemsToAdd: { itemIds: string[] }
      const itemsAdded = await Promise.all(
        //@ts-ignore
        items.itemsToAdd.map(async (itemId: string) => { // Correction ici pour le type et l'accès
          // 3. Vérifier si l'Item existe (bonne pratique)
          const itemExists = await prisma.item.findUnique({
            where: { id: itemId }
          });
          console.log(itemExists);

          if (!itemExists) {
            console.warn(`Item with ID ${itemId} not found. Skipping.`);
            return null; // ou jeter une erreur spécifique si un item manquant est critique
          }

          //4. Vérifier l'unicité (pour éviter les doublons dans une même collection)
          const existingCollectionItem = await prisma.collectionItem.findUnique({
            // @ts-ignore
            where: {
              // CORRECTION ICI : la syntaxe correcte pour une contrainte unique composite
              // Il faut lister les champs directement dans l'objet 'where'
              id: collectionId,
              itemId: itemId,
              userId: userId,
            }
          });

          if (existingCollectionItem) {
            console.warn(`Item ${itemId} already exists in collection ${collectionId} for user ${userId}. Skipping.`);
            return existingCollectionItem; // Retourne l'existant plutôt que de dupliquer
          }


          // 5. Création de l'entrée CollectionItem
          return await prisma.collectionItem.create({
            data: {
              collectionId,
              itemId,
              userId,
              // Assurez-vous d'initialiser le 'status' si vous l'avez ajouté au modèle CollectionItem
              // status: collectionExist.status, // Ou un autre statut par défaut si différent de la collection
            },
          });
        })
      );

      // Filtrer les nulls si des items n'ont pas été trouvés ou ont été ignorés
      const successfulItemsAdded = itemsAdded.filter(item => item !== null);

      console.log(successfulItemsAdded);

      return { message: "Items added to collection", itemsAdded: successfulItemsAdded };
    } catch (error) {
      console.error("Erreur addItemsToCollection :", error);
      throw new Error("Erreur lors de l'ajout des items à la collection");
    }
  }

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
