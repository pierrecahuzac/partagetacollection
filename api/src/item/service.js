const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const supabaseService = require("../supabase/service");

const ItemService = {
  async create(createItemDto, userId) {
    const {
      name,
      description,
      formatTypeId,
      artist,
      author,
      publisher,
      collection,
      director,
      platform,
      genre,
      album,
      year,
      style,
      barcode,
      gameDeveloper,
      isPublic,
    } = createItemDto;
    try {
      const createdItem = await prisma.item.create({
        data: {
          name: name,
          description: description ? description : "",
          barcode: barcode ? barcode : null,
          formatType: formatTypeId
            ? { connect: { id: formatTypeId } }
            : undefined,
          isPublic: isPublic ? isPublic : false,
          artist: artist ? artist : "",
          album: album ? album : "",
          year: year ? Number(year) : null,
          style: style ? style : "",
          author: author ? author : "",
          publisher: publisher ? publisher : "",
          collection: collection ? collection : "",
          director: director ? director : "",
          platform: platform ? platform : "",
          genre: genre ? genre : "",
          gameDeveloper: gameDeveloper ? gameDeveloper : null,

          status: {
            connect: {
              name: "PUBLIC",
            },
          },
          creator: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return createdItem;
    } catch (error) {
      throw error;
    }
  },
  async findAll() {
    try {
      return await prisma.item.findMany({
        select: {
          id: true,
          barcode: true,
          description: true,
          name: true,
          updatedAt: true,
          createdAt: true,
          formatType: {
            select: {
              id: true,
              name: true,
            },
          },
          images: {
            select: {
              id: true,
              url: true,
            },
          },
          status: true,
          creatorId: true,
        },
      });
    } catch (error) {
      return error;
    }
  },
  async findAllCreatedItemsByUser(id) {
    try {
      const result = await prisma.item.findMany({
        where: {
          creatorId: id,
        },
      });
      return result;
    } catch (error) {
      console.error("Erreur dans findAllCreatedItemsByUser:", error);
      throw error;
    }
  },

  async findOne(itemId) {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });
      if (item) {
        const likes = await prisma.likeItem.findMany({
          where: {
            itemId,
          },
          select: {
            itemId: true,
          },
        });

        const images = await prisma.image.findMany({
          where: {
            itemId,
          },
        });

        return { item, images, likes };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur dans findOne:", error);
      throw error;
    }
  },
  async update(itemId, userId, datas) {
    try {
      const itemToUpdate = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });

      if (itemToUpdate.creatorId !== userId) {
        return "You're not the itrem creator, you can't change it";
      }
      if (!itemToUpdate) {
        return "Item not exist";
      }
      const {
        name,
        description,
        barcode,
        formatTypeId,
        artist,
        album,
        year,
        style,
        author,
        publisher,
        collection,
        isbn,
        language,
        genre,
        audioDuration,
        director,
        videoDuration,
        videoEditor,
        platform,
        gameDeveloper,
        gameEditor,
        country,
        materiall,
        denomination,
        developper,
        statusId,
      } = datas;
      const updatedItem = await prisma.item.update({
        data: {
          name,
          description,
          barcode,

          formatTypeId,
          artist,
          album,
          year,
          style,
          author,
          publisher,
          collection,
          isbn,
          language,
          genre,
          audioDuration,
          director,
          videoDuration,
          videoEditor,
          platform,
          gameDeveloper,
          gameEditor,
          country,
          materiall,
          denomination,
          developper,
          statusId,
        },
        where: {
          id: itemId,
        },
      });
      return { status: 200, updatedItem };
    } catch (error) {
      console.log(error);
    }
  },
  async delete(itemId, userId) {
    try {
      const itemToFound = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });
      const itemInCollections = await prisma.collectionItem.findFirst({
        where: {
          itemId,
        },
      });

      if (itemInCollections !== null) {
        return "Impossible de supprimer : l'objet est dans la collection d'un utilisateur.";
      }
      // si l'utilisateur n'est pasle createur on verifie son role admin
      if (itemToFound.creatorId !== userId) {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        // si l'utilisateur n'est pas le createur on verifie son role admin
        if (user.role !== "ADMIN") {
          return "Impossible de supprimer cet item vous n'êtes pas le créateur de cet objet";
        }
      }

      // 1. Récupérer les chemins des images à supprimer de Supabase
      const imagesToDelete = await prisma.image.findMany({
        where: { itemId: itemId },
        select: { publicId: true },
      });

      // 2. Supprimer les fichiers de Supabase Storage
      if (imagesToDelete.length > 0) {
        const filePaths = imagesToDelete
          .map((img) => img.publicId)
          .filter(Boolean);
        if (filePaths.length > 0) {
          await supabaseService.deleteManyImages(filePaths);
        }
      }

      // 3. Supprimer l'item de la base de données.
      // Les images associées dans la table `Image` seront supprimées en cascade.
      const deletedItem = await prisma.item.delete({
        where: { id: itemId },
      });

      return deletedItem;
    } catch (error) {
      throw error;
    }
  },
  async addToFavorites(userId, itemId) {
    try {
      const userLikesItem = await prisma.likeItem.findFirst({
        where: { userId, itemId },
      });

      if (userLikesItem) {
        await prisma.likeItem.delete({
          where: { id: userLikesItem.id },
        });
        return {
          action: "removed",
          message: "Retiré des favoris",
          isLiked: false,
        };
      } else {
        const addedToFavorites = await prisma.likeItem.create({
          data: { userId, itemId },
        });
        return {
          message: "Ajouté aux favoris",

          data: addedToFavorites,
        };
      }
    } catch (error) {
      throw error;
    }
  },

  
};

module.exports = ItemService;
