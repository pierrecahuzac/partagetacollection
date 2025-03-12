import axios from "axios";

import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
const Header = () => {
    const navigate = useNavigate();

    const { isConnected, setIsConnected } = useAuth();

    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;

    const handleLogout = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `${protocol}://${domain}:${port}/auth/logout`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(response.status);

            if (response.status === 401 || response.status === 200) {
                setIsConnected(false);
                navigate("/");
            }
            localStorage.clear();
            return;
        } catch (error) {
            // @ts-ignore
            if(error.response.data.statusCode) 
            {
                setIsConnected(false);
                navigate("/");
            }
            
            /* if (response.status === 401 || response.status === 200) {
                setIsConnected(false);
                navigate("/");
            } */
        }
    };

    return (
        <div className="w-full font-quicksand box-border fixed bg-amber-50">
            <div className="w-10/12 m-auto p-px flex justify-between">
                {" "}
                <div className="header__container-logo">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="header__container-logo-img"
                        onClick={() => navigate("/homepage")}
                    />
                </div>
                <div className="flex w-auto">
                    {isConnected ? (
                        <div className="flex w-auto justify-between p-px">
                            <button
                                type="button"
                                className="bg-black rounded-sm text-white font-bold px-4 py-2 m-2 hover:cursor-pointer "
                                onClick={() => navigate("/profile")}
                            >
                                Mon profil
                            </button>
                            <button
                                type="button"
                                className="text-black font-bold hover:cursor-pointer"
                                onClick={(e) => handleLogout(e)}
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="flex w-auto justify-between p-px">
                            <button
                                type="button"
                                className="bg-black  rounded-xl text-white font-bold px-4 py-2 m-2 hover:cursor-pointer border-transparent hover:bg-white hover:text-black hover:duration-200 hover:border-1 transition"
                                onClick={() => navigate("/signup")}
                            >
                                Créer un compte
                            </button>
                            <button
                                type="button"
                                className="w-40 text-black font-bold  px-4 py-2 m-2 hover:bg-black hover:cursor-pointer hover:rounded-xl hover:text-white hover:font-bold hover:px-4 hover:py-2 hover:m-2"
                                onClick={() => navigate("/signin")}
                            >
                                Connexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
