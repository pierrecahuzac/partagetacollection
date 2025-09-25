const userService = require("./service");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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
    const userId = req.user.sub;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        username: true,
        collections: true,
        role: true,
        id: true,
        status:true,
        likeItems:true
      },
    });

    
    return res.status(200).json({ message: "User found", user });
  },

  async update(id, updateUserDto) {
    return userService.update(+id, updateUserDto);
  },
};

module.exports = userController;
