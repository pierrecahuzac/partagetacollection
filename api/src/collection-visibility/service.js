const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const collectionVisibilityService = {
  async create(createCollectionVisibilityDto) {
    const status = await prisma.collectionVisibility.create({
      data: createCollectionVisibilityDto,
    });
    return status;
  },
  
  async findAll() {
    const statuses = await prisma.collectionVisibility.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return statuses;
  },

  async findOne(id) {
    const status = await prisma.collectionStVisibilityindUnique({
      where: { id },
    });
    return status;
  },

  async update(id, updatecollectionVisibilityDto) {
    const status = await prisma.collectionVisibility.update({
      where: { id },
      data: updatecollectionVisibilityDto,
    });
    return status;
  },

  async remove(id) {
    const status = await prisma.collectionVisibility.delete({
      where: { id },
    });
    return status;
  },
};

module.exports = collectionVisibilityService