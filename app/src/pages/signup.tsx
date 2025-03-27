// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import useToast from "../hooks/useToast";
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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmitUser = async (e: any) => {
        try {
            if(credentials.password !== credentials.passwordConfirmation){
                onError("Les mots de passe ne correspondent pas")
                return
            }
            if(!credentials.email || !credentials.password || !credentials.username){
                onError("Veuillez remplir tous les champs")
                return
            }
            const response = await submitUser(e, credentials)
 
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
        } catch (error) {
            console.log(error)
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
                <form action="submit"

                    onSubmit={e => handleSubmitUser(e)}
                    className="signup__form">
                    <div className="signup__form-input" >
                        <label htmlFor="" className="signup__form-label">Email</label>
                        <input type="text" className="signup__form-text" name="email" id="email" value={credentials.email} onChange={handleInputChange} />
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Nom d'utilisateur</label>
                        <input type="text" className="signup__form-text" name="username" id="username" value={credentials.username} onChange={handleInputChange} />
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Mot de passe</label>
                        <input type="password" name="password" id="password" className="signup__form-text" value={credentials.password} onChange={handleInputChange} />
                    </div>
                    <div className="signup__form-input">
                        <label htmlFor="" className="signup__form-label">Confirmation du mot de passe</label>
                        <input type="password" name="passwordConfirmation" className="signup__form-text" id="confirmationPassword" value={credentials.passwordConfirmation} onChange={handleInputChange} />
                    </div>
                    <button type="button"                        className="signup__button"
                        onClick={handleSubmitUser}
                    >Connexion</button>
                    {/* <ReCAPTCHA className="flex justify-center"
                        sitekey={import.meta.env.VITE_CAPTCHA_KEY_PUBLIC}
                        // onChange={onChangeCaptcha}
                    /> */}
                </form>
            </div>
        </div>
    )

}

export default Signup