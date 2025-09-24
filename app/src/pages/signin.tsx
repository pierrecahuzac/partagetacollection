import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
import useToast from "../hooks/useToast";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

import Button from "../components/ui/button";


import '../styles/signin.scss'
import Spinner from "../components/ui/spinner";

type credentialsProps = {
    email: string
    password: string
}

const Signin = () => {
    const navigate = useNavigate()
    const { setIsConnected, signin } = useAuth();
    const { onSuccess, onError } = useToast()
    const [credentials, setCredentials] = useState<credentialsProps>
        ({
            email: "",
            password: ""
        })
    const [isLoading, setIsLoading] = useState(false)
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleLoginUser = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await signin(credentials);
            if (response.response.status !== 200) {
                onError('Mauvaise combinaison email / mot de passe')
                return
            }
            localStorage.setItem("username", response.response.data.username);
            onSuccess('Utilisateur connecté avec succès');
            setIsConnected(true);
            setIsLoading(false)
            navigate("/");

        } catch (error: any) {
            onError(error.response.data.message || 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
            setIsLoading(false)
        }
    }

    return (
        <div className="signin">

            <div className="signin__container">
                <div className="signin__title">
                    <h2 >
                        Connexion
                    </h2>
                </div>
                <form className="signin__form" onSubmit={(e) => handleLoginUser(e)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="signin__form-label">
                                Email
                            </label>
                            <div className="signin__form-input">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    className="signin__form-text"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="signin__form-label">
                                Mot de passe
                            </label>
                            <div className="signin__form-input">
                                <input
                                    type={passwordIsVisible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    className="signin__form-text"

                                />
                                <span onClick={() => setPasswordIsVisible(!passwordIsVisible)}>{passwordIsVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="signin__button"
                            disabled={!credentials.password || !credentials.email}
                        >
                            {isLoading ? <Spinner /> : "Se connecter"}

                        </Button>
                    </div>
                </form>
                <div className="signin__links">
                    <Link to={'/forgot-password'} className="signin__links-password-forgot">Mot de passe oublié</Link>
                    <Link to={'/signup'} className="signin__links-to-signup">Je n'ai pas de compte ?</Link></div>

            </div>

        </div>

    )
}

export default Signin