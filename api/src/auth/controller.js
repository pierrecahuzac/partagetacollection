//  import { AuthService } from './auth.service';

//  import { AuthGuard } from './auth.guard';
const authService = require("./service");
const z = require("zod");

//   if (process.env.NODE_ENV === 'production') {
//     dotenv.config({ path: '.env.production' });
//   } else {
//     dotenv.config({ path: '.env' });
//   }

const AuthController = {
  async signin(req, res) {
    const { email, password } = req.body;
    try {
      const result = await authService.signin(email, password);
      if (result.status === 401) {
        return res
          .status(401)
          .json({ message: result.message, isConnected: false });
      }
      res.cookie("access_token", result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24,
      });
      return res.json({ message: "User connected", username: result.username });
    } catch (error) {
      console.log(error);
    }
  },

  async signup(req, res) {
    const { email, password, username, passwordConfirmation } = req.body;

    // const passwordErrorMessage = {
    //   minLengthErrorMessage:
    //     "Le mot de passe doit contenir au moins 8 caractères",
    //   maxLengthErrorMessage:
    //     "Le mot de passe doit contenir au maximum 20 caractères",
    //   upperCaseErrorMessage:
    //     "Le mot de passe doit contenir au moins une majuscule",
    //   lowerCaseErrorMessage:
    //     "Le mot de passe doit contenir au moins une minuscule",
    //   numberErrorMessage: "Le mot de passe doit contenir au moins un chiffre",
    //   specialCharacterErrorMessage:
    //     "Le mot de passe doit contenir au moins un caractère spécial",
    // };
    // const passwordSchema = z
    //   .string()
    //   .min(8, { message: passwordErrorMessage.minLengthErrorMessage })
    //   .max(20, { message: passwordErrorMessage.maxLengthErrorMessage })
    //   .refine((password) => /[A-Z]/.test(password), {
    //     message: passwordErrorMessage.upperCaseErrorMessage,
    //   })
    //   .refine((password) => /[a-z]/.test(password), {
    //     message: passwordErrorMessage.lowerCaseErrorMessage,
    //   })
    //   .refine((password) => /[0-9]/.test(password), {
    //     message: passwordErrorMessage.numberErrorMessage,
    //   })
    //   .refine((password) => /[!@#$%^&*]/.test(password), {
    //     message: passwordErrorMessage.specialCharacterErrorMessage,
    //   });

    // const signupSchema = z.object({
    //   email: z.string().email(),
    //   password: passwordSchema,
    //   username: z.string().min(3),
    //   passwordConfirmation: passwordSchema,
    // });
    // const safeParsed = signupSchema.safeParse();

    // if (!safeParsed.success) {
    //   return res.status(401).json({
    //     message: "Données invalides",
    //     errors: safeParsed.error.errors,
    //   });
    // }

    // if (
    //   email ||
    //   password ||
    //   username ||
    //   passwordConfirmation
    // ) {
    //   throw new Error(
    //     "Informations (email, mot de passe, confirmation du mot de passe, nom d'utilisateur) are required"
    //   );
    // }
    if (password !== passwordConfirmation) {
      throw new Error("Passwords must be identicals");
    }
    const user = await authService.signup(email, password, username);
    return res.json({ message: "User created", user });
  },
  async getProfile(req) {
    return req.user;
  },

  async logout(req, res) {
    delete req.headers.cookie;
    return res.status(200).json({ message: "User logout" });
  },
};

module.exports = AuthController;
