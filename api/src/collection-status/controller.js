const collectionStatusService = require("./service");

const collectionStatusController = {
  async create(createCollectionStatusDto) {
    return collectionStatusService.create(createCollectionStatusDto);
  },
  async findAll(req, res) {
    try {
      const result = await collectionStatusService.findAll();

      
      return res.status(200).json(result);
    } catch (error) {
      throw new Error(error);
    }
  },
  async findOne(id) {
    try {
      return collectionStatusService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  },
  async update(id, updateCollectionStatusDto) {
    try {
      return collectionStatusService.update(id, updateCollectionStatusDto);
    } catch (error) {
      throw new Error(error);
    }
  },
  async remove(id) {
    try {
      return collectionStatusService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  },
};


module.exports = collectionStatusController