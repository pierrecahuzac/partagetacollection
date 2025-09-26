import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import useToast from "../hooks/useToast";
import { z } from "zod";
import { useAuth } from "../context/authContext";

import "../styles/signup.scss"
import Button from "../components/ui/button";
// import Button from "../components/ui/button";

const Signup = () => {
    const navigate = useNavigate()
    const { setIsConnected, signin, signup } = useAuth();
    const { onSuccess, onError } = useToast()
    // const [_isLoading, setIsLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        passwordConfirmation: '',
        username: ''
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmitUser = async (e: any) => {
        e.preventDefault();
        const passwordErrorMessage = {
            minLengthErrorMessage: "Le mot de passe doit contenir au moins 8 caractères",
            maxLengthErrorMessage: "Le mot de passe doit contenir au maximum 20 caractères",
            upperCaseErrorMessage: "Le mot de passe doit contenir au moins une majuscule",
            lowerCaseErrorMessage: "Le mot de passe doit contenir au moins une minuscule",
            numberErrorMessage: "Le mot de passe doit contenir au moins un chiffre",
            specialCharacterErrorMessage: "Le mot de passe doit contenir au moins un caractère spécial"
        };
        const passwordSchema = z
            .string()
            .min(8, { message: passwordErrorMessage.minLengthErrorMessage })
            .max(20, { message: passwordErrorMessage.maxLengthErrorMessage })
            .refine((password: string) => /[A-Z]/.test(password), {
                message: passwordErrorMessage.upperCaseErrorMessage,
            })
            .refine((password: string) => /[a-z]/.test(password), {
                message: passwordErrorMessage.lowerCaseErrorMessage,
            })
            .refine((password: string) => /[0-9]/.test(password), {
                message: passwordErrorMessage.numberErrorMessage
            })
            .refine((password: string) => /[!@#$%^&*]/.test(password), {
                message: passwordErrorMessage.specialCharacterErrorMessage,
            });

        try {
            const credentialsSchema = z.object({
                email: z.string().email({ message: "Email invalide" }),
                password: passwordSchema,
                username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }),
                passwordConfirmation: z.string({ message: "Confirmation du mot de passe est obligatoire" })
            }).refine(
                (data) => data.password === data.passwordConfirmation,
                {
                    message: "Les mots de passe ne correspondent pas",
                    path: ["passwordConfirmation"]
                }
            );

            const safeParsed = credentialsSchema.safeParse(credentials);
            if (!safeParsed.success) {

                onError(safeParsed.error.errors[0].message);
                return;
            }

            const response = await signup(e, credentials)

            if (response?.response?.data.message === 'Email already exists') {
                onError("Email existant, merci de vous connecter")
                return
            }
            if (response?.status === 201) {
                onSuccess("Utilisateur créé avec succès")
                const userConnected = await signin(credentials);

                if (userConnected.response.status === 200) {
                    onSuccess("Utilisateur connecté avec succès");

                    setIsConnected(true)
                    localStorage.setItem("isConnected", "true");
                    localStorage.setItem("userId", userConnected.response.data.userId);


                    navigate("/")
                }
            }
        } catch (error: any) {
            onError(error)
        }
    }

    return (
        <div className="signup">
            <div className="signup__container">
                <div className="signup__title">
                    <h2 className="">
                        Créer son compte
                    </h2>
                </div>
                <form action="submit" onSubmit={e => handleSubmitUser(e)} className="signup__form">
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Email</label>
                        <input type="text" className="signup__form-text" name="email" id="email" value={credentials.email} onChange={handleInputChange} />
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Nom d'utilisateur</label>
                        <input type="text" className="signup__form-text" name="username" id="username" value={credentials.username} onChange={handleInputChange} />
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Mot de passe</label>
                        <input type={passwordIsVisible ? "text" : "password"} name="password" id="password" className="signup__form-text" value={credentials.password} onChange={handleInputChange} />
                        <span onClick={() => setPasswordIsVisible(!passwordIsVisible)}>{passwordIsVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}</span>
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Confirmation du mot de passe</label>
                        <input type={passwordIsVisible ? "text" : "password"} name="passwordConfirmation" id="passwordConfirmation" className="signup__form-text" value={credentials.passwordConfirmation} onChange={handleInputChange} />
                        <span onClick={() => setPasswordIsVisible(!passwordIsVisible)}>{passwordIsVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}</span>
                    </div>
                    <Button type="submit" className="button">Créer un compte</Button>
                </form>
                <Link to={'/signin'}>J'ai déjà un compte ?</Link>
            </div>
        </div>
    )
}

export default Signup