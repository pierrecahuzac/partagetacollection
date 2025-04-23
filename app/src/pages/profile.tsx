import axios from "axios";
import { useEffect, useState } from "react"

import '../styles/profile.scss';
const Profile = () => {
    const [user, setUser] = useState<any>({})
    useEffect(() => {
        const protocol = import.meta.env.VITE_API_PROTOCOL;
        const domain = import.meta.env.VITE_API_DOMAIN;
        const port = import.meta.env.VITE_API_PORT;

        const fetchUser = async () => {
            const getUser: any = await axios.get(`${protocol}://${domain}:${port}/user`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
 
            
            const userDatas = getUser.data.user
            setUser(userDatas)
       
        }
        fetchUser()
    }, [])
    return (
        <div className="profile">
            {user &&
                <div className="profile__datas">
                    <div className="profile__email">Email :{user.email}</div>
                    <div className="profile__username">Nom d'utilisateur : {user.username}</div>
                    <div className="profile__role">Rôle: {user.role === 'USER' ? 'Utilisateur' : 'Admin'}</div>
                    <div className="profile__collections">Nombre de collections : {user?.collections?.length}</div>
                </div>}
        </div>
    )
}

export default Profile