const authService = require("./service");
const { z } = require("zod");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const passwordErrorMessage = {
  minLengthErrorMessage: "Le mot de passe doit contenir au moins 8 caractères",
  maxLengthErrorMessage:
    "Le mot de passe doit contenir au maximum 20 caractères",
  upperCaseErrorMessage: "Le mot de passe doit contenir au moins une majuscule",
  lowerCaseErrorMessage: "Le mot de passe doit contenir au moins une minuscule",
  numberErrorMessage: "Le mot de passe doit contenir au moins un chiffre",
  specialCharacterErrorMessage:
    "Le mot de passe doit contenir au moins un caractère spécial",
};


const passwordSchema = z
  .string()
  .min(8, { message: passwordErrorMessage.minLengthErrorMessage })
  .max(20, { message: passwordErrorMessage.maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: passwordErrorMessage.upperCaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: passwordErrorMessage.lowerCaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: passwordErrorMessage.numberErrorMessage,
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: passwordErrorMessage.specialCharacterErrorMessage,
  });

const signupSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  username: z.string().min(3),
  passwordConfirmation: passwordSchema,
});

const AuthController = {
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "L'email et le mot de passe sont requis." });
      }
      const result = await authService.signin(email, password);
 
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60,
      });
      res.cookie("refresh_token", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return res.status(200).json({
        message: "User connected",
        username: result.username,
        userId: result.userId,
      });
    } catch (error) {
      return res.status(401).json({
        message:
          error.message ||
          "Identifiants invalides (email ou mot de passe incorrect).",
        isConnected: false,
      });
    }
  },

  async signup(req, res) {
    const safeParsed = signupSchema.safeParse(req.body);
    if (!safeParsed.success) {
      return res.status(401).json({
        message: "Données invalides",
        errors: safeParsed.error.errors,
      });
    }

    const { email, password, username, passwordConfirmation } = safeParsed.data;

    if (password !== passwordConfirmation) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas" });
    }

    try {
      await authService.signup(email, password, username);
      
      const loginResult = await authService.signin(email, password);

      res.cookie("access_token", loginResult.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60,
      });

      res.cookie("refresh_token", loginResult.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      return res.status(201).json({
        message: "Utilisateur créé et connecté automatiquement",
        username: loginResult.username,
        userId: loginResult.userId,
        isConnected: true,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Erreur lors de la création du compte",
      });
    }
  },
  async getProfile(req) {
    return req.user;
  },

  async logout(req, res) {
    const { refresh_token } = req.cookies;
    res.clearCookie("access_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", path: "/" });
    res.clearCookie("refresh_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", path: "/" });

    if (refresh_token) {
      try {
        const decoded = jwt.decode(refresh_token);
        if (decoded && decoded.rid && decoded.exp) {
          await prisma.refreshToken.create({
            data: {
              userId: decoded.sub,
              token: decoded.rid,
              expiresAt: new Date(decoded.exp * 1000),
              createdAt: new Date(decoded.iat * 1000),
            },
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de la révocation du refresh token:",
          error.message
        );
      }
    }

    return res.status(200).json({ message: "Utilisateur déconnecté avec succès." });
  },
};

module.exports = AuthController;
