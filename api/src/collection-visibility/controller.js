const collectionVisibilityService = require("./service");

const collectionVisibilityController = {
  async create(createCollectionStatusDto) {
    return collectionVisibilityService.create(createCollectionStatusDto);
  },
  async findAll(req, res) {
    try {
      const result = await collectionVisibilityService.findAll();

      
      return res.status(200).json(result);
    } catch (error) {
      throw new Error(error);
    }
  },
  async findOne(id) {
    try {
      return collectionVisibilityService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  },
  async update(id, updateCollectionVisibilityDto) {
    try {
      return collectionVisibilityService.update(id, updateCollectionStatusDto);
    } catch (error) {
      throw new Error(error);
    }
  },
  async remove(id) {
    try {
      return collectionVisibilityService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};


module.exports = collectionVisibilityController