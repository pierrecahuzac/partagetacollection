import axios from "axios";

import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import BurgerMenuOpen from '../assets/burger-menu-open.svg'
import BurgerMenuClose from '../assets/burger-menu-close.svg'

const Header = () => {
    const navigate = useNavigate();

    const { isConnected, setIsConnected } = useAuth();
    const [menuIsClose, setMenuIsClose] = useState<boolean>(true)
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
            if (response.status === 401 || response.status === 200) {
                setIsConnected(false);
                navigate("/");
            }
            localStorage.clear();
            return;
        } catch (error) {
            // @ts-ignore
            if (error.response.data.statusCode) {
                setIsConnected(false);
                navigate("/");
            }
        }
    };

    return (

        <div className="w-full font-quicksand box-border fixed bg-amber-50">
            <nav className="w-11/12 m-auto p-px flex justify-between">
                {/* Mobile */}
                <div className="w-15 h-15 p-1 relative">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="h-15 w-15 p-2"
                        onClick={() => navigate("/homepage")}
                    />
                </div>
                <div className="hidden sm:flex  sm:w-60 sm:justify-center">
                    {isConnected ? (
                        <div className="flex justify-between p-px sm:flex">
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
                                className="bg-black w-50 rounded-xl text-white font-bold px-4 py-2 m-2 hover:cursor-pointer border-transparent hover:bg-white hover:text-black hover:duration-200 hover:border-1 transition"
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
                {/* Desktop */}

                <div className="flex justify-center align-middle   w-9 h-9 absolute right-10 top-3 cursor-pointer hover:bg-red-200 border-transparent hover:border-1 hover:rounded-md sm:hidden" onClick={() => setMenuIsClose(!menuIsClose)}>
                    {menuIsClose
                        ?

                        <img src={BurgerMenuClose} alt="burger menu close icon" />

                        :
                        <>

                            <img src={BurgerMenuOpen} alt="burger menu open icon" />

                            <div className="" >
                                <div className="flex flex-col absolute top-20 right-0">
                                    <span>
                                        <Link to={"/"} className="bg-slate-500">Acceuil</Link>
                                    </span>
                                    <span>
                                        <Link to={"/profile"} className="bg-slate-500">Profile</Link>
                                    </span>
                                </div>
                            </div>
                        </>
                    }



                </div>
                <div></div>
            </nav>
        </div>
    );
};

export default Header;
