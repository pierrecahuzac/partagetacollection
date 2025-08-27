import axios from "axios";
import { useEffect, useState } from "react"

import '../styles/profile.scss';
import useToast from "../hooks/useToast";
const Profile = () => {
    const { onError } = useToast()
    const [user, setUser] = useState<any>({})
    const baseURL = import.meta.env.VITE_BASE_URL
    useEffect(() => {
        const fetchUser = async () => {
            const response: any = await axios.get(`${baseURL}/user`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const userDatas = response.data.user
            setUser(userDatas)
        }
        fetchUser()
    }, [])

    const handleDeleteUserAccount = async () => {
        try {
            await axios.delete(`${baseURL}/auth/user/`, {
                withCredentials: true
            })
        } catch (error) {
            onError(`Une erreur c'est produite`)
        }
    }

    return (
        <div className="profile">
            {user &&
                <div className="profile__datas">
                    <div className="profile__email">Email :{user.email}</div>
                    <div className="profile__username">Nom d'utilisateur : {user.username}</div>
                    <div className="profile__role">Rôle : {user.role}</div>
                    {/* <div className="profile__role">Rôle: {user.role === 'USER' ? 'Utilisateur' : 'Admin'}</div> */}
                    <div className="profile__collections">Nombre de collections : {user?.collections?.length === 0 ? "0" : user?.collections?.length}</div>
                    <div
                        className="profile__delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUserAccount()
                        }}
                    >
                        Supprimer
                    </div>
                </div>}
        </div>
    )
}

export default Profile