const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const collectionStatusService = {
  async create(createCollectionStatusDto) {
    const status = await prisma.collectionStatus.create({
      data: createCollectionStatusDto,
    });
    return status;
  },
  async findAll() {
    const statuses = await prisma.collectionStatus.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return statuses;
  },

  async findOne(id) {
    const status = await prisma.collectionStatus.findUnique({
      where: { id },
    });
    return status;
  },

  async update(id, updateCollectionStatusDto) {
    const status = await prisma.collectionStatus.update({
      where: { id },
      data: updateCollectionStatusDto,
    });
    return status;
  },

  async remove(id) {
    const status = await prisma.collectionStatus.delete({
      where: { id },
    });
    return status;
  },
};

module.exports = collectionStatusService