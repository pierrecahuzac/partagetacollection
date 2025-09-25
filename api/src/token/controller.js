require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tokenController = {
  tokenPasswordValidation: async (req, res) => {
    const token = req.params.token;
    
    try {
      const tokenExists = await prisma.tokenResetPassword.findUnique({
        where: {
          token,
        },
      });
      if (!tokenExists) {
        return res.status(400).json({
          message:
            "Token inexistant,veuillez faire une nouvelle demande de changement de mot de passe",
        });
      }
     
      if (tokenExists) {
        if (Date.now() > tokenExists.expiresAt) {
          return res.status(400).json({
            message:
              "Le token est expiré, veuillez faire une nouvelle demande de changement de mot de passe",
          });
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = tokenController;
