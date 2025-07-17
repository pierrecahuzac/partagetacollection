const fileUploadService = require("./file-upload.service");

const fileUploadController = {
  async uploadFile(file, req) {
    // @ts-ignore
    if (!req.user.sub) {
      return;
    }
    // @ts-ignore
    if (!req.query.collectionId) {
      // @ts-ignore
      const itemId = req.query.itemId;
      return fileUploadService.uploadCollectionCovers(file, itemId);
    }
    // @ts-ignore
    else if (!req.query.itemId) {
      // @ts-ignore
      const collectionId = req.query.collectionId;
      return fileUploadService.uploadCollectionCovers(file, collectionId);
    }
    // @ts-ignore
  },

  async findAll() {
    return fileUploadService.findAll();
  },
  async findOne(id) {
    return fileUploadService.findOne(+id);
  },

  update(id, updateFileUploadDto) {
    return fileUploadService.update(+id, updateFileUploadDto);
  },

  async remove(id) {
    return fileUploadService.remove(+id);
  },
};

module.exports = fileUploadController;
