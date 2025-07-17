const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const imageService = {
  async createMany(imagesData) {
    try {
      const imagesCreated = await prisma.image.createMany({
        data: imagesData,
      });

      return imagesCreated;
    } catch (error) {
      console.log(error);
    }
  },

  async findAll() {
    try {
      const images = await prisma.image.findMany({});
      return images;
    } catch (error) {
      console.log(error);
    }
  },
  async findOne(id) {
    try {
      const fundedImage = await prisma.image.findUnique({
        where: {
          id,
        },
      });
      return fundedImage;
    } catch (error) {
      console.log(error);
    }
  },

  async update(id, updateImageDto) {
    return `This action updates a #${id} image`;
  },

  async remove(id) {
    return `This action removes a #${id} image`;
  },
};
module.exports = imageService;
