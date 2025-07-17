const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const userService = {
  async create(email, password, username) {
    return await prisma.user.create({
      data: {
        email: email,
        password: password,
        username: username,
      },
    });
  },

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    
    if (!user) {
      return null;
    }
    return user;
  },

  async findAll() {
    return `This action returns all user`;
  },

  async findOne(id) {    
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        role: true,
        collections: true,
        username: true,
      },
    });    
    if (user) {
      delete user.password;
    }
    return user;
  },

  async update(id) {
    return `This action updates a #${id} user`;
  },

  async remove(userId) {
    try {
      const result = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return result;
    } catch (error) {
      throw new Error("Impossibility to delete user");
    }
  },
};


module.exports = userService