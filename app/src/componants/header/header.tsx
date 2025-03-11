import axios from 'axios'
import { useEffect, useState } from 'react'
//import './header.scss'
import { useNavigate } from 'react-router'
const Header = () => {
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(localStorage.getItem('isConnected'))

    return (
        <div className="w-full ">
            <div className="w-10/12 m-auto p-px flex justify-between">
                <div className="header__container-logo">
                    <img src="/logo.png" alt="logo" className="header__container-logo-img" onClick={() => navigate('/')}/>
                </div>
                <div className="flex w-auto">
                    {isConnected ? <div className="flex w-auto justify-between p-px">
                        <div className="font-bold" onClick={() => navigate('/profile')}>Mon profil</div>
                        <div className="font-bold" onClick={() => { localStorage.clear(), navigate('/') }}>Déconnexion</div>


                    </div> : <div className="flex w-auto justify-between p-px">
                        <div onClick={() => navigate('/signin')}>Connexion</div>
                        <div onClick={() => navigate('/signup')}>Créer un compte</div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default Header