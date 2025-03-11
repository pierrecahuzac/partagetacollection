import { useState } from 'react'
import './header.scss'
import { useNavigate } from 'react-router'
const Header = () => {
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean>(true)
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__container-logo">
                    <img src="/logo.png" alt="logo" className="header__container-logo-img" />
                </div>
                <div className="header__container-connection">
                    {isConnected ? <div className="header__container-connection-text">
                        <div onClick={() => navigate('/profile')}>Profil</div>


                    </div> : <div className="header__container-connection-text">
                        <div onClick={() => navigate('/signin')}>Connexion</div>
                        <div onClick={() => navigate('/signup')}>Créer un compte</div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default Header