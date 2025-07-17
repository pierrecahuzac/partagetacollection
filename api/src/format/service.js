const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const formatService = {
  async findAll() {
    try {
      const result = await prisma.formatType.findMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
  async findOne(id) {
    try {
      const result = await prisma.formatType.findUnique({
        where: {
            id
        }
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
  async remove(id) {
    try {
      const result = await prisma.formatType.delete({
        where: {
            id
        }
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports= formatService