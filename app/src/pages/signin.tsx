import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import useToast from "../hooks/useToast";
import { loginUser } from "../services/auth.service";

import '../styles/signin.scss'

const Signin = () => {
    const { setIsConnected } = useAuth();
    const navigate = useNavigate()
    const { onSuccess } = useToast()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleLoginUser = async (e: any) => {
        e.preventDefault()
        const response = await loginUser(credentials);
        if (response?.status === 200) {
            localStorage.setItem("isConnected", "true");
            onSuccess('Utilisateur connecté avec succès');
            setIsConnected(true);
            navigate("/homepage");
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
                <form className="signin__form" onSubmit={e => handleLoginUser(e)}>
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
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    className="signin__form-text"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="signin__button"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Signin