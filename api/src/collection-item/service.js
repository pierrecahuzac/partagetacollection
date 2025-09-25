const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const collectionItemService = {
  async create(datas) {
    try {
      const { collectionId, purchasePrice, condition, notes, itemId, userId } =
        datas;
      const result = await prisma.collectionItem.create({
        data: {
          collection: {
            connect: { id: collectionId },
          },
          pricePaid: Number(purchasePrice),
          condition: condition ? { connect: { id: condition } } : undefined,
          notes,
          item: {
            connect: { id: itemId },
          },
          user: {
            connect: { id: userId },
          },
          CollectionStatus: datas.collectionStatusId
            ? { connect: { id: collectionStatusId } }
            : undefined,
        },
      });
      return result;
    } catch (error) {
      console.error("Erreur dans create:", error);
      throw new Error("Erreur lors de la création de l'item de collection");
    }
  },

  async findOne(itemId) {
    try {
      const item = await prisma.collectionItem.findUnique({
        where: {
          id: itemId,
        },
      });
      console.log(item);
      
      const genericItem = await prisma.item.findUnique({
        where: {
          id: item.itemId,
        },
        include: {
          images: true,
        },
      });
      console.log(genericItem.images);

      const itemDetails = {
        ...genericItem,
        ...item,
        id: genericItem.id, 
        collectionItemId: item.id, 
        images: genericItem.images, 
        createdAt: genericItem.createdAt, 
        updatedAt: genericItem.updatedAt, 
      }
      return itemDetails;
    } catch (error) {
      console.error("Erreur dans findOne:", error);
      throw new Error("Erreur lors de la récupération de l'item de collection");
    }
  },

  async delete(collectionItemId, userId) {
    const itemToDelete = await prisma.collectionItem.delete({
      where: {
        id: collectionItemId,
        AND: {
          userId,
        },
      },
    });
    return itemToDelete;
  },
};
module.exports = collectionItemService;
