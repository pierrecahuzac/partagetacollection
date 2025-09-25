const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const roleService = {
  async findAll() {
    try {
      const result = await prisma.role.findMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
  async findOne(id) {
    try {
      const result = await prisma.role.findUnique({
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
      const result = await prisma.role.delete({
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

module.exports= roleService