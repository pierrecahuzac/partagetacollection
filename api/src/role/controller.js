const roleService = require("./service");

const roleController = {
  async create(createFormatTypeDto) {
    return roleService.create(createFormatTypeDto);
  },

  async findAll(req, res) {
    try {
      const result = await roleService.findAll();

      return res.status(200).json(result);
    } catch (error) {
      
    }
  },
  async findOne(id) {
    const result = await roleService.findOne(id);
 ;
    return res.status(200).json(result);
  },
  async update(id) {
    return roleService.update(id, updateFormatTypeDto);
  },

  async remove(id) {
    return roleService.remove(id);
  },
};

module.exports = roleController;
