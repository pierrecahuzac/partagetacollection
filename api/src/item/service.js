const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fileUploadService = require("../file-upload/service");
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
          creatorId: userId,
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
          images:{
            select:{
              id:true,
              url:true
            }
          }
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
          //@ts-ignore
          creatorId: id,
        },
      });
      return result;
    } catch (error) {
      
      throw Error(error);
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
        images = await prisma.image.findMany({
          where: {
            itemId,
          },
        });
        return { item, images };
      } else {
        return null;
      }
    } catch (error) {
      
    }
  },
  async update(id, updateItemDto) {
    return `This action updates a #${id} item`;
  },
  async delete(itemId, userId) {
    try {
      const itemInCollections = await prisma.collectionItem.findFirst({
        where: {
          itemId: itemId, 
        },
      });

      if (itemInCollections) {
        return "Impossible de supprimer : l'objet est dans la collection d'un utilisateur.";
      }

      const deletedItem = await prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return deletedItem; 
    } catch (error) {
      console.error("Erreur dans itemService.delete :", error);
 
      throw new Error(
        "Une erreur inattendue est survenue lors de la suppression de l'objet."
      );
    }
  },
};

module.exports = ItemService;
