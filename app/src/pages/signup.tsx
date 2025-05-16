import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import useToast from "../hooks/useToast";
import { z } from "zod";
import { useAuth } from "../context/authContext";
import { loginUser, submitUser } from "../services/auth.service";
import "../styles/signup.scss"

const Signup = () => {
    const navigate = useNavigate()
    const { setIsConnected } = useAuth();
    const { onSuccess, onError } = useToast()
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        passwordConfirmation: '',
        username: ''
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
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
            .refine((password) => /[A-Z]/.test(password), {
                message: passwordErrorMessage.upperCaseErrorMessage,
            })
            .refine((password) => /[a-z]/.test(password), {
                message: passwordErrorMessage.lowerCaseErrorMessage,
            })
            .refine((password) => /[0-9]/.test(password), {
                message: passwordErrorMessage.numberErrorMessage
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
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
                console.log(safeParsed.error)
                onError(safeParsed.error.errors[0].message);
                return;
            }

            const response = await submitUser(e, credentials)
           
            if(response?.response?.data.message ==='Email already exists'){
                onError("Email existant, merci de vous connecter")
                return
            }
            if (response?.status === 201) {
                onSuccess("Utilisateur créé avec succès")
                const userConnected = await loginUser(credentials);
                if (userConnected?.status === 200) {
                    onSuccess("Utilisateur connecté avec succès")
                    setIsConnected(true)
                    localStorage.setItem("isConnected", "true");
                    navigate("/homepage")
                }
            }
        } catch (error: any) {
            console.log(error)
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
                    <button type="submit" className="signup__form-submit">Créer un compte</button>
                </form>
                <Link to={'/signin'}>J'ai déjà un compte ?</Link>
            </div>
        </div>
    )
}

export default Signup