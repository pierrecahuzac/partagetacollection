import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import useToast from "../hooks/useToast";
import { loginUser } from "../services/auth.service";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

import '../styles/signin.scss'
import Button from "../components/button";

const Signin = () => {

    const { setIsConnected } = useAuth();
    const navigate = useNavigate()
    const { onSuccess, onError } = useToast()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleLoginUser = async (e: any) => {
        e.preventDefault()
        try {
            const response = await loginUser(credentials);
            if (response && response.status === 401) {
                onError(response.response.data.message)
            }
            else if (response && response?.status === 200) {
                localStorage.setItem("isConnected", "true");
                onSuccess('Utilisateur connecté avec succès');
                setIsConnected(true);
                navigate("/homepage");
            }
        } catch (error) {
            console.log(error);
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
                            Se connecter
                        </Button>
                    </div>
                </form>
                <Link to={'/signup'}>Je n'ai pas de compte ?</Link>
            </div>
        </div>
    )

}

export default Signin