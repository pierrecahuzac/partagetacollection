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

      // Si des fichiers ont été uploadés, les traiter avec FileUploadService
      // if (files && files.length > 0) {
      //   // On utilise la méthode uploadItemCovers pour chaque fichier
      //   await Promise.all(
      //     files.map((file) =>
      //       fileUploadService.uploadItemCovers(
      //         file,
      //         createdItem.id,
      //         userId
      //       )
      //     )
      //   );
      // }
      // const imagesData = covers.map((file, index) => ({
      //   url: `/uploads/${file.filename.replace(/ /g, "_")}`,
      //   collectionId: createCollection.id,
      //   userId,
      //   isCover: index === 0,
      // }));
      // if (imagesData.length > 0) {
      //   await imageService.createMany(imagesData);
      // }

      return createdItem;
    } catch (error) {
      console.log(error);
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
          //price: true,
          // quantity: true,
          updatedAt: true,
          createdAt: true,
          formatType: {
            select: {
              id: true,
              name: true,
            },
          },
          // userId: true,
          // user: {
          //   select: {
          //     username: true,
          //   },
          // },
          images: {
            select: {
              id: true,
              url: true,
              isCover: true,
            },
          },
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
      console.log(error);
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
      } else {
        return null;
      }
      return { itemToFound: { item, images } };
    } catch (error) {
      console.log(error);
    }
  },
  async update(id, updateItemDto) {
    return `This action updates a #${id} item`;
  },
  async delete(id) {
    try {
      return await prisma.item.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ItemService;
