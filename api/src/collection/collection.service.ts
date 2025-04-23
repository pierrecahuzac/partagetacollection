import { Injectable } from '@nestjs/common';

import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class CollectionService {
  async create(createCollectionDto: any, userId: string) {
    try {
      const { title, description, isPublic, startedAt, cover, formatType } =
        createCollectionDto;
      const formatTypeId = await prisma.formatType.findUnique({
        where: {
          name: formatType
        }
      })
      return await prisma.collection.create({
        //@ts-ignore
        data: {
          userId,
          //@ts-ignore
          title,
          description: description ? description : "",

          //@ts-ignore
          startedAt: new Date(),
          status: 'PRIVATE',
          //@ts-ignore
          formatTypeId: formatTypeId ? formatTypeId.id : undefined,
        },
      });;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(userId: string | null) {
    try {
      const collections = await prisma.collection.findMany();
      return collections;
    } catch (error) {
      console.log(error);

    }
  }
  async findAllUserCollection(userId) {
    try {
      return await prisma.collection.findMany({
        where: {
          userId
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
        items: {
          select: {
            item: true,
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
    itemsToAdd: any, // tableau d'IDs d'items
    userId: string
  ) {


    try {
      // Vérifie que la collection existe et appartient bien à l'utilisateur
      const collection = await prisma.collection.findUnique({
        where: { id: collectionId },
      });

      if (!collection) {
        throw new Error("Collection introuvable");
      }

      // Prépare les données à insérer dans CollectionItem
      const data = itemsToAdd.itemsToAdd.map((itemId) => ({
        collectionId,
        itemId,
        userId,
      }));

      // Crée les liens dans la table pivot
      await prisma.collectionItem.createMany({
        data,
        //    skipDuplicates: true, // ✅ évite les doublons (grâce à @@unique dans Prisma)
      });

      // Optionnel : retourner la collection avec ses nouveaux items
      const updatedCollection = await prisma.collection.findUnique({
        where: { id: collectionId },
        include: {
          items: {
            include: {
              item: true,
            },
          },
        },
      });

      return updatedCollection;
    } catch (error) {
      console.error("Erreur addItemsToCollection :", error);
      throw new Error("Erreur lors de l'ajout des items à la collection");
    }
  }

  async remove(id: string) {
    try {
      const collectionToDelete = await prisma.collection.findUnique({
        where: {
          id
        }
      })
      if (!collectionToDelete) {
        return { message: `collection not founded with this ${id}` }
      }
      const collectionDeleted = await prisma.collection.delete({
        where: {
          id
        }
      })
    } catch (error) {
      console.log(error);

    }
  }
}
