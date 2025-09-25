const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const likeItemService = {
  async getAllUserFavoritesItems(userId) {
    try {
      return await prisma.likeItem.findMany({
        where: {
          userId,
        },
        include: {
          item: {
            include: {
              images: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },
  async deleteItemFromFavorites(itemId, userId) {
    console.log(itemId, userId);

    try {
      const deletedItem = await prisma.likeItem.delete({
        where: {
          userId_itemId: {
            userId,
            itemId,
          },
        },
      });

      console.log("Élément supprimé:", deletedItem);
      return deletedItem;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
};

module.exports = likeItemService;
