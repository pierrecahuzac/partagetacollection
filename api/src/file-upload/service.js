const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const fileUploadService = {
  // @ts-ignore
  
  async uploadCollectionCovers(cover, entityId) {
    
    if (!allowedMimeTypes.includes(cover.mimetype)) {
      throw new Error("invalid file type");
    }

    const maxSize = 10 * 1024 * 1024; // 10MB;
    if (cover.size > maxSize) {
      throw new Error("file is too large!");
    }

    const fileUrl = `${cover.filename}`;

    try {
      const foundedCollection = await prisma.collection.findUnique({
        where: {
          id: entityId,
        },
      });


      if (foundedCollection) {
        const updatedCollection = await prisma.collection.update({
          where: { id: entityId },
          data: { cover: fileUrl },
        });

        return { message: "Cover updated for collection", updatedCollection };
      }
      throw new Error(`Collection ou item avec l'ID ${entityId} non trouvé.`);
    }  catch (err) {
        console.error("Error during uploadCollectionCovers:", err.message || err);
        throw err;
    }

  },
  async uploadItemCovers(cover, itemId, userId) {
    if (!allowedMimeTypes.includes(cover.mimetype)) {
      throw new Error("invalid file type");
    }

    const maxSize = 10 * 1024 * 1024; // 10MB;
    if (cover.size > maxSize) {
      throw new Error("file is too large!");
    }

    const fileUrl = `${cover.filename}`;

    const foundItem = await prisma.item.findUnique({
      where: { id: itemId },
    });
    if (foundItem) {
      const newImage = await prisma.image.create({      
        data: {
          url: fileUrl,
          itemId: itemId,
          userId,
        },
      });

      return { message: "Cover updated for item", newImage };
    }
  },

  async create(createFileUploadDto) {
    return "This action adds a new fileUpload";
  },

  async findAll() {
    return `This action returns all fileUpload`;
  },

  async findOne(id) {
    return `This action returns a #${id} fileUpload`;
  },

  async update(id, updateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  },

  async remove(id) {
    return `This action removes a #${id} fileUpload`;
  },
};

module.exports = fileUploadService;
