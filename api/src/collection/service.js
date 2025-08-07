const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CollectionService = {
  async create(createCollectionDto, userId) {
    try {
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
          status: {
            connect: {
              id: collectionStatus,
            },
          },
        },
      });
      return createCollection;
    } catch (error) {
      
    }
  },
  async findAll() {
    try {
      const collections = await prisma.collection.findMany();
      return collections;
    } catch (error) {
      
    }
  },

  async findAllUserCollection(userId) {
    
    try {
      
      const allUserCollections =  await prisma.collection.findMany({
        where: {
          userId,
        },
        include: {
          images:true
        },
      });           
      return allUserCollections
    } catch (error) {
      
    }
  },
  async findOne(id) {     
    const result = await prisma.collection.findUnique({
      where: {
        id,
      },
      include: {
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
  update(id, updateCollectionDto) {
    return `This action updates a #${id} collection`;
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
   
      return await prisma.collection.findUnique({
        where: {
          id: collectionId,
        },
      });

    
    } catch (error) {
      
    }
  },
};

module.exports = CollectionService;
