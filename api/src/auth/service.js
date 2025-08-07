const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { uuid } = require("zod");

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
      if (!user) {
        throw new Error(
          "Identifiants invalides (email ou mot de passe incorrect)."
        );
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        throw new Error(
          "Identifiants invalides (email ou mot de passe incorrect)."
        );
      }

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      const payloadToken = {
        sub: userWithoutPassword.id,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
      };

      const payloadRefreshToken = {
        sub: userWithoutPassword.id,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
        rid: uuidv4(), // resresh id
      };

      const accessToken = jwt.sign(payloadToken, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      const refreshToken = jwt.sign(
        payloadRefreshToken,
        process.env.REFRESH_SECRET,
        {
          expiresIn: 60 * 60 * 24 * 30,
        }
      );

      return {
        accessToken,
        refreshToken,
        username: userWithoutPassword.username,
        userId: userWithoutPassword.id,
      };
    } catch (err) {
      throw err;
    }
  },

  async signup(email, password, username) {
    
    console.log(email, password, username);
    
    // if (!email || !password || !username) {
    //   throw new Error("Email, password and username are required");
    // }
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
        password: await bcrypt.hash(password, 10),
        username: username,
      },
    });
    console.log(user);

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
