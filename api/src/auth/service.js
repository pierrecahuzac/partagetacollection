const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const mailController = require("../mail/controller");
const {
  PrismaClientValidationError,
} = require("@prisma/client/runtime/library");
const { de } = require("zod/v4/locales");
const AuthController = require("./controller");

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

      if (!user.canLogin) {
        return {
          success: false,
          message: "Accès interdit. Ce compte ne peut pas se connecter.",
          code: "LOGIN_DISABLED",
        };
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
        rid: uuidv4(),
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
        success: "user logged",
      };
    } catch (err) {
      throw err;
    }
  },

  async signup(email, password, username) {
    try {
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
          role: {
            connect: { name: "USER" },
          },
          status: {
            connect: { name: "ACTIVE" },
          },
        },
      });

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      const payloadToken = {
        sub: userWithoutPassword.id,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
      };

      const rid = uuidv4();
      const payloadRefreshToken = {
        sub: userWithoutPassword.id,
        username: userWithoutPassword.username,
        email: userWithoutPassword.email,
        rid: rid,
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

      // Ne pas créer d'entrée de révocation lors du signup. La table sert à marquer les refresh tokens RÉVOQUÉS.
      console.log(user);

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
        username: userWithoutPassword.username,
        userId: userWithoutPassword.id,
        message: "User created and logged in",
      };
    } catch (error) {
      throw error;
    }
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

  async forgotPassword(email) {
    try {
      const accountExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!accountExists) {
        return { message: `Email not in DB` };
      }
      const token = crypto.randomUUID();

      const now = new Date().getTime();
      const calcExpiresAt = new Date(now + 15 * 60 * 1000);

      await prisma.tokenResetPassword.create({
        data: {
          token,
          userId: accountExists.id,
          expiresAt: calcExpiresAt,
        },
      });
      const baseURL = process.env.BASE_FRONT_URL;
      const urlResetPassword = `${baseURL}/reset-password?token=${token}`;
      const mail = {
        to: "cahuzac.p@gmail.com",
        from: "admin@partagetacollection.eu",
        subject: "Réinitialiser mon mot de passe",
        text: `Merci de cliquer sur le lien pour réinialiser votre mot de passe : ${urlResetPassword}
        Réinitialiser mon mot de passe 
        ou
        copier/coller ce lien dans votre navigateur : ${urlResetPassword} 
        Ce lien expire dans 15 min 
        Si vous n'avez pas fait cette demande, merci de l'ignorer`,

        html: `<div>Merci de cliquer sur le lien pour réinialiser votre mot de passe : 
        <a href=${urlResetPassword}>Réinitialiser mon mot de passe</a> ou copier/coller ce lien dans votre navigateur : ${urlResetPassword} 
        <p>Ce lien expire dans 15 min</p>   
        <p>Si vous n'avez pas fait cette demande, merci de l'ignorer</p>   
        <div>`,
      };
      const sendingMail = await mailController.sendEmailFromBackend(mail);

      return { message: `Email envoyé à l'utilisateur` };
    } catch (error) {
      return { message: "Erreur interne du serveur", error };
    }
  },

  async deleteAccount(userId) {
    try {
      // Vérifier que l'utilisateur existe
      const userAccountExist = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userAccountExist) {
        throw new Error("L'utilisateur n'existe pas");
      }

      // Récupérer l'utilisateur système deleted
      const deletedUserExist = await prisma.user.findUnique({
        where: { email: "system.deleted@partagetacollection.eu" },
      });

      if (!deletedUserExist) {
        throw new Error("Utilisateur système 'deleted' introuvable");
      }

      // Transaction pour assurer la cohérence
      const result = await prisma.$transaction(async (prisma) => {
        // 1. Supprimer les favoris de l'utilisateur
        await prisma.likeItem.deleteMany({
          where: { userId },
        });

        // 2. Supprimer les collectionItems de l'utilisateur
        await prisma.collectionItem.deleteMany({
          where: { userId },
        });

        // 3. Réassigner les items créés à l'utilisateur système
        await prisma.item.updateMany({
          where: { creatorId: userId },
          data: { creatorId: deletedUserExist.id },
        });

        // 4. Supprimer les images de l'utilisateur
        await prisma.image.deleteMany({
          where: { userId },
        });

        // 5. Supprimer les collections de l'utilisateur
        await prisma.collection.deleteMany({
          where: { userId },
        });

        // 6. Supprimer les refresh tokens
        await prisma.refreshToken.deleteMany({
          where: { userId },
        });

        // 7. Supprimer le compte utilisateur
        const deletedAccount = await prisma.user.delete({
          where: { id: userId },
        });

        return deletedAccount;
      });

      return result;
    } catch (error) {
      console.error("Erreur dans deleteAccount service:", error);
      throw error;
    }
  },
};

module.exports = authService;
