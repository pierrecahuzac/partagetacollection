import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";


import UserLogo from '/logo/user.svg';

import { SlClose } from "react-icons/sl";

import "../../styles/header.scss";
import useToast from "../../hooks/useToast";
import { useGlobalContext } from "../../context/globalContext";
import moonIcon from '/img/moon.svg'
import sunIcon from '/img/sun.svg'
const Header = () => {
    const navigate = useNavigate();
    const { onSuccess } = useToast()
    const { isConnected, logout } = useAuth();
    const { isDarkMode, setIsDarkMode } = useGlobalContext()
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [logoSrc, setLogoSrc] = useState<string>(window.innerWidth > 394 ? "/logo/elipseTitle.svg" : "/logo/logoelipse.svg");
   // const baseURL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const handleResize = () => {
            setLogoSrc(window.innerWidth > 394 ? "/logo/elipseTitle.svg" : "/logo/logoelipse.svg");
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logout()

            onSuccess(response.data.message)
            navigate("/");
        } catch (error) {
            //onError('Erreur lors de la déconnexion:', error)
            console.error('Erreur lors de la déconnexion:', error);
            navigate("/");
        }
    };

    const openMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };
    new Date().getFullYear()

    const switchMode = () => {
        isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true)

    }

    return (
        <div className="header">
            <nav className="header__nav">
                <div className="header__nav__logo"> <img
                    src={logoSrc}
                    alt="logo"
                    className="header__nav__logo-logo"
                    onClick={() => navigate("/")}
                />
                </div>

                {isConnected ? (
                    <div className="header__nav__profile" >
                        {/* <div>Hey {localStorage.getItem("username")} !</div> */}
                        {isDarkMode ? <span onClick={switchMode} style={{ width: "30px", height: "30px" }}><img src={moonIcon} /></span> : <span onClick={switchMode} style={{ width: "30px", height: "30px" }}><img src={sunIcon} /></span>

                        }
                        <img
                            src="/logo/connected.webp"
                            onClick={openMenu}
                            alt="user logo"
                            className="header__nav__user"
                        />
                    </div>
                ) : (
                    <>
                        {isDarkMode ? <div onClick={switchMode} style={{ width: "30px", height: "30px" }}><img src={moonIcon} /></div> : <div style={{ width: "30px", height: "30px" }} onClick={switchMode}><img src={sunIcon} /></div>

                        }
                        <img
                            src={UserLogo}
                            onClick={openMenu}
                            alt="user logo"
                            className="header__nav__user"
                        />
                    </>
                )}
                {menuIsOpen && (
                    <div className="header__nav__menu">

                        {isConnected ? (
                            <div className="header__nav__container"
                            >

                                <div
                                    className="header__nav__menu__button"
                                    onClick={() => {
                                        navigate('/profile');
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Mon profil
                                </div>
                                <div
                                    className="header__nav__menu__button"
                                    onClick={() => {
                                        navigate('/my-collections');
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Mes collections
                                </div>

                                <div
                                    className="header__nav__menu__button"
                                    onClick={() => {
                                        handleLogout();
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Déconnexion
                                </div>
                                
                               


                                <footer style={{padding:0,position:"absolute", display: "flex", bottom: 0, left: 0, alignItems: "center", justifyContent:"center" }}>
                                    <p>Site crée et développé par 
                                        <Link to={'https://www.linkedin.com/in/pcahuzac/'} style={{textDecoration:"none", fontWeight:'bold'}}> Pierre CAHUZAC </Link>
                                         Tous droits réservés @{new Date().getFullYear()} Partage ta collection </p>
                                </footer>
                            </div>
                        ) : (
                            <>
                                <div className="header__nav__container">
                                    {/* <div className="header__nav__logo-container"
                                    style={{
                                        width: "200px"
                                    }}>
                                    <img
                                        src={logoSrc}
                                        alt="logo"
                                        className="header__nav__logo-logo"
                                        onClick={() => navigate("/")}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </div> */}
                                    <div
                                        className="header__nav__menu__button"
                                        onClick={() => {
                                            navigate('/signin');
                                            setMenuIsOpen(false);
                                        }}
                                    >
                                        Me connecter
                                    </div>
                                    <div
                                        className="header__nav__menu__button"
                                        onClick={() => {
                                            navigate('/signup');
                                            setMenuIsOpen(false);
                                        }}
                                    >
                                        Créer un compte
                                    </div>
                                </div>
                            </>
                        )}
                        <span onClick={() => { setMenuIsOpen(false) }} className="close"><SlClose /></span>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
