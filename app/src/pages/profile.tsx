import axios from "axios";
import { useEffect, useState } from "react"

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
        <div className="font-quicksand">
            {user &&
                <div className="flex-col">
                    <div>Email :{user.email}</div>
                    <div>Nom d'utilisateur : {user.username}</div>
                    <div>Rôle: {user.role === 'USER' ? 'Utilisateur' : 'Admin'}</div>
                </div>}
        </div>
    )
}

export default Profile