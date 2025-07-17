const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const collectionItemService = {
  async create(datas) {
    try {
        console.log('datas', datas);
        
      const { collectionId, purchasePrice, condition, notes, itemId, userId } = datas;
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
          CollectionStatus: datas.collectionStatusId ? { connect: { id: collectionStatusId } } : undefined,
          
        },
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = collectionItemService;
