const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CollectionService = {
  async create(createCollectionDto, userId) {
      // const collectionVisibility = await prisma.collectionVisibility.findMany()
      // console.log('collectionVisibility', collectionVisibility);
      
    try {
      console.log(createCollectionDto);
      
      const { title, description, collectionStatus } = createCollectionDto;
      const createCollection = await prisma.collection.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          
          title,
          description: description ? description : "",
          startedAt: new Date(),
          visibility: {
            connect: {
              id: collectionStatus,
            },
          },
          status: {
            connect: {
              name: 'EN_COURS',
            },
          },
        },
      });
      return createCollection;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async findAll() {
    try {
      const collections = await prisma.collection.findMany();
      return collections;
    } catch (error) {
      console.error("Erreur dans findAll:", error);
      throw new Error("Erreur lors de la récupération des collections");
    }
  },

  async findAllUserCollection(userId) {
    try {
     
      
      const allUserCollections = await prisma.collection.findMany({
        where: {
          userId,
        },
        include: {
          status: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
          visibility: {
            select: {
              id: true,
              name: true,
              description: true
            }
          },
          status: true,
          visibility: true,
          images: {
            select: {
              id: true,
              url: true,
              isCover:true
            },
          },
        },
      });

      console.log(allUserCollections);
      
      return allUserCollections;
    } catch (error) {
      console.error("Erreur dans findAllUserCollection:", error);
      throw new Error("Erreur lors de la récupération des collections de l'utilisateur");
    }
  },
  async findOne(collectionId) {
    const result = await prisma.collection.findUnique({
      where: {
        id : collectionId,
      },
      include: {
        status: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        visibility: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        images: true,
        collectionItems: {
          include: {
            item: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
    return result;
  },
  async updateCollectionById(collectionId, userId, datas) {
    try {
  
      const collectionToUpdate = await prisma.collection.findUnique({
        where: {
          id: collectionId,
        },
      });
      console.log(collectionToUpdate);
      
      if (collectionToUpdate.userId !== userId) {
        return "You're not the collection's creator, you can't change it";
      }
      if (!collectionToUpdate) {
        return "Collection not exist";
      }
      const {
        title,
        description,
        status,
        startedAt,
        
      } = datas;
      const updatedCollection = await prisma.collection.update({
        data: {
          title,
          description,
         // status: ,
          startedAt,
        },
        where: {
          id: collectionId,
        },
      });
      console.log(updatedCollection);
      return { status: 200, updatedCollection };
    } catch (error) {
      console.log(error);
    }
  },

  async addItemsToCollection(collectionId, items, userId) {
    try {
      const collectionExist = await prisma.collection.findUnique({
        where: { id: collectionId },
      });

      if (!collectionExist) {
        throw new Error("Collection introuvable");
      }

      if (collectionExist.userId !== userId) {
        throw new Error("Accès non autorisé à cette collection.");
      }

      const itemsAdded = await Promise.all(
        items.itemsToAdd.map(async (itemId) => {
          // Correction ici pour le type et l'accès
          // 3. Vérifier si l'Item existe (bonne pratique)
          const itemExists = await prisma.item.findUnique({
            where: { id: itemId },
          });

          if (!itemExists) {
            console.warn(`Item with ID ${itemId} not found. Skipping.`);
            return null;
          }

          const existingCollectionItem = await prisma.collectionItem.findUnique(
            {
              where: {
                id: collectionId,
                itemId: itemId,
                userId: userId,
              },
            }
          );

          if (existingCollectionItem) {
            console.warn(
              `Item ${itemId} already exists in collection ${collectionId} for user ${userId}. Skipping.`
            );
            return existingCollectionItem; // Retourne l'existant plutôt que de dupliquer
          }

          // 5. Création de l'entrée CollectionItem
          return await prisma.collectionItem.create({
            data: {
              collectionId,
              itemId,
              userId,
            },
          });
        })
      );

      const successfulItemsAdded = itemsAdded.filter((item) => item !== null);

      return {
        message: "Items added to collection",
        itemsAdded: successfulItemsAdded,
      };
    } catch (error) {
      console.error("Erreur addItemsToCollection :", error);
      throw new Error("Erreur lors de l'ajout des items à la collection");
    }
  },

  async remove(collectionId) {
    try {
      const deleteCollection =  await prisma.collection.delete({
        where: {
          id: collectionId,
        },
      });
      return deleteCollection
    } catch (error) {
      console.error("Erreur dans remove:", error);
      throw new Error("Erreur lors de la suppression de la collection");
    }
  },
};

module.exports = CollectionService;
