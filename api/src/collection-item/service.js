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
          //itemId: itemId,
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
      
    }
  },

  async findOne(itemId) {
    try {
      return await prisma.collectionItem.findUnique({
        where: {
          id: itemId,
        },
      });
    } catch (error) {}
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
   return itemToDelete
  },
};
module.exports = collectionItemService;
