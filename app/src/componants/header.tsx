import axios from "axios";

import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { useState } from "react";

import LogoTest from '../../public/logo/logotest.webp'
import UserLogo from '../../public/logo/user.svg'
import UserConnected from '../../public/logo/connected.webp'
import "../styles/header.scss"

const Header = () => {
    const navigate = useNavigate();

    const { isConnected, setIsConnected } = useAuth();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(true)

    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;

    const handleLogout = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${protocol}://${domain}:${port}/auth/logout`, {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': "application/json",
                    },
                }
            );
            console.log(response);

            if (response.status === 401 || response.status === 200) {
                setIsConnected(false);
                navigate("/");
            }
            localStorage.clear();
            return;
        } catch (error) {
            console.log(error);
            // if (error) {
            //     setIsConnected(false);
            //     navigate("/");
            // }
        }
    };


    const openMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }
    return (

        <div className="header">
            <nav className="header__nav">
                <div className="header__nav__logo">
                    <img
                        src={LogoTest}
                        alt="logo"
                        className="header__nav__logo-logo"
                        onClick={() => navigate("/homepage")}
                    />
                </div>

                {/* <button
                    type="button"
                    className="header__nav__buttons"
                    onClick={() => openMenu()}
                > */}
                    {isConnected ? <img src={UserConnected} onClick={() => openMenu()} alt="user logo" className="header__nav__user" /> : <img src={UserLogo} onClick={() => openMenu()} alt="user logo" className="header__nav__user" />}
                    {menuIsOpen &&
                        <div className="header__nav__menu">
                            {isConnected ? <>
                                <div className="header__nav__menu__button" onClick={() => navigate('/profile')}>Mon profil</div>
                                <div className="header__nav__menu__button" onClick={() => navigate('/my-collection')}>Ma collection</div>
                                <div className="header__nav__menu__button" onClick={(e) => handleLogout(e)}>Déconnexion</div></> : <><div className="header__nav__menu__button" onClick={() => navigate('/signin')}>Me connecter</div>
                                <div className="header__nav__menu__button" onClick={() => navigate('/signup')}>Créer un compte</div></>}


                        </div>}
                {/* </button> */}
            </nav>
        </div >
    )
};

export default Header;
