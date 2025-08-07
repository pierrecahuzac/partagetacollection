const formatService = require("./service");

const formatController = {
  async create(createFormatTypeDto) {
    return formatService.create(createFormatTypeDto);
  },

  async findAll(req, res) {
    try {
      const result = await formatService.findAll();

      return res.status(200).json(result);
    } catch (error) {
      
    }
  },
  async findOne(id) {
    const result = await formatService.findOne(id);
 ;
    return res.status(200).json(result);
  },
  async update(id) {
    return formatService.update(id, updateFormatTypeDto);
  },

  async remove(id) {
    return formatService.remove(id);
  },
};

module.exports = formatController;
