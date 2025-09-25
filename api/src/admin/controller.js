const adminService = require("./service");
require("dotenv").config();

const adminController = {
  getRoles: async (req, res) => {
    try {
      const response = await pr
    } catch (error) {
      throw error
    }
  },
  getAllUser: async (req, res) => {
    const userId = req.user.sub;
    try {
      const allUsers = await adminService.findAllUser();
      return res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = adminController;
