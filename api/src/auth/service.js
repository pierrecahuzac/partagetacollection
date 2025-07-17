const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
require("dotenv").config();
const authService = {
  async signin(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      // if (!user) {
      //   throw new Error("Invalid credentials: no user found with this email.");
      // }

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!user || !comparePassword) {
        return {
          message: "Invalid credentials: bad email / password combinaison.",
          status: 401,
        };
      }

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      const payload = {
        sub: userWithoutPassword.id,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        accessToken,
        username: userWithoutPassword.username,
      };
    } catch (err) {
      throw err;
    }
  },

  async signup(email, password, username) {
    if (!email || !password || !username) {
      throw new Error("Email, password and username are required");
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new Error("Email already exists");
    }
    const user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, 10),
        username: username,
      },
    });


    return { user, message: "User created" };
  },
  async remove(userId) {
    try {
      if (!userId) {
        throw new Error("ID's user is required");
      }
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        throw new Error("L'utilisateur n'existe pas");
      }
      await prisma.collectionItem.deleteMany({
        where: {
          userId,
        },
      });
      await prisma.item.deleteMany({
        where: {
          userId,
        },
      });
      await prisma.collection.deleteMany({
        where: {
          userId,
        },
      });
      return this.userService.remove(userId);
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression des éléments de collection ou de l'utilisateur."
      );
    }
  },
};

module.exports = authService;
