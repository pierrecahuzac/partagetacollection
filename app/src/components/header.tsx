import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { useState, useEffect} from "react";
import LogoTest from '../../public/logo/logotest.webp';
//import LogoOnly from '../../public/logo/logo_only.webp';
import UserLogo from '../../public/logo/user.svg';
import UserConnected from '../../public/logo/connected.webp';
import { SlClose } from "react-icons/sl";

import "../styles/header.scss";

const Header = () => {
    const navigate = useNavigate();
    const { isConnected, setIsConnected } = useAuth();
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
    const [logoSrc, setLogoSrc] = useState(window.innerWidth > 763 ? LogoTest : LogoTest);
    //@ts-ignore
    const baseURL = import.meta.VITE_BASE_URL

    useEffect(() => {
        const handleResize = () => {
            setLogoSrc(window.innerWidth > 763 ? LogoTest : LogoOnly);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseURL}/auth/logout`, {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': "application/json",
                    },
                }
            );
            if (response.status === 401 || response.status === 200) {
                setIsConnected(false);
                navigate("/");
                localStorage.clear();
            }
        } catch (error) {
            setIsConnected(false);
            navigate("/");
        }
    };

    const openMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };
    new Date().getFullYear()

    return (
        <div className="header">
            <nav className="header__nav">
                <div className="header__nav__logo">
                    <img
                        src={logoSrc}
                        alt="logo"
                        className="header__nav__logo-logo"
                        onClick={() => navigate("/homepage")}
                    />
                </div>
                {isConnected ? (
                    <img
                        src={UserConnected}
                        onClick={openMenu}
                        alt="user logo"
                        className="header__nav__user"
                    />
                ) : (
                    <img
                        src={UserLogo}
                        onClick={openMenu}
                        alt="user logo"
                        className="header__nav__user"
                    />
                )}
                {menuIsOpen && (
                    <div className="header__nav__menu">
                        <></>
                        {isConnected ? (
                            <div className="header__nav__container">
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
                                        navigate('/create-item');
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Créer un objet
                                </div>

                                <div
                                    className="header__nav__menu__button"
                                    onClick={() => {
                                        navigate('/my-collection');
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Mes collections
                                </div>
                                <div
                                    className="header__nav__menu__button"
                                    onClick={(e) => {
                                        handleLogout(e);
                                        setMenuIsOpen(false);
                                    }}
                                >
                                    Déconnexion
                                </div>
                                <span></span>
                                <footer>Collectify @{new Date().getFullYear()}</footer>
                            </div>
                        ) : (
                            <>
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
