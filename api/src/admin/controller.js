const adminService = require("./service");
require("dotenv").config();

const adminController =  {
  getAllUser : async (req, res) => {
    const userId = req.user.sub;
    try {
      const allUsers = await adminService.findAllUser();
      return res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = adminController;
