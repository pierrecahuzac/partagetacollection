const imageService = require("./service");

const imageController = {
  async create(createImageDto) {
    return imageService.create(createImageDto);
  },
  async findAll() {
    try {
      return imageService.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  async findOne(id) {
    return imageService.findOne(id);
  },
  async update(id, updateImageDto) {
    return imageService.update(+id, updateImageDto);
  },
  async remove(id) {
    return imageService.remove(+id);
  },
};

module.exports = imageController;
