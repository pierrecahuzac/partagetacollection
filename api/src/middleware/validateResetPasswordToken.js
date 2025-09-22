const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const validateResetPasswordToken = async (token) => {
  try {
    const tokenIsValid = await prisma.tokenResetPassword.findUnique({
      where: {
        token,
      },
    });
    if (tokenIsValid.expiresAt < Date.now()) {
      return { message: "Token expiré" };
    }
  } catch (error) {
    console.log(error);
  }
};

export default validateResetPasswordToken;
