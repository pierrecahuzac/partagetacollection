// import { z } from 'zod';
// const minLengthPasswordErrorMessage = "Le mot de passe doit contenir au moins 8 caractères"
// //const maxLengthPasswordErrorMessage = "Le mot de passe ne doit pas contenir plus de 20 caractères"
// const uppercaseErrorMessage = "Le mot de passe doit contenir un cataractère majuscule"
// const lowercaseErrorMessage = "Le mot de passe doit contenir un cataractère minuscule"
// const specialCharacterErrorMessage = "Le mot de passe doit contenir un cataractère spécial"
// const numberErrorMessage = "Le mot de passe doit contenir un nombre"


// const passwordSchema = z.string()
//     .min(8, minLengthPasswordErrorMessage)
//     //.max(20, maxLengthPasswordErrorMessage)
//     .refine((password) => /[A-Z]/.test(password), {
//         message: uppercaseErrorMessage,
//     })
//     .refine((password) => /[a-z]/.test(password), {
//         message: lowercaseErrorMessage,
//     })
//     .refine((password) => /[0-9]/.test(password), {
//         message: numberErrorMessage,
//     })
//     .refine((password) => /[!@#$%^&*]/.test(password), {
//         message: specialCharacterErrorMessage,
//     });

//     export const userCredentials = z.object({
//         email: z.string().email({ message: "Email invalide" }),
//         password: passwordSchema,
//         passwordConfirmation: passwordSchema,
//         username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caratères" })
//     })