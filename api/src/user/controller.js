const userService = require("./service");
const jwt = require("jsonwebtoken");

const userController = {
  async findByEmail(body) {

    
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }
    return userService.findByEmail(body.email);
  },

  async findAll() {
    return userService.findAll();
  },

  async findOne(req, res) {
    const user = req.user;
    return res.status(200).json({ message: "User found", user });
  },

  async update(id, updateUserDto) {
    return userService.update(+id, updateUserDto);
  },
};

module.exports = userController;
