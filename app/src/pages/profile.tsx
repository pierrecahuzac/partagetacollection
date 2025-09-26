import axios from "axios";
import { useEffect, useState } from "react"

import '../styles/profile.scss';
import useToast from "../hooks/useToast";
import Spinner from "../components/ui/spinner";
import { RoleProps } from "../@interface/RoleProps";
import { Link, useNavigate } from "react-router-dom";



interface User {
    email: string;
    username: string;
    role: RoleProps;
    status?: {
        name: string;
    };
    collections?: any[];
    likeItems: [],
    item?: []
}

const Profile = () => {
    const navigate = useNavigate()
    const { onError, onSuccess } = useToast()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const baseURL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${baseURL}/user`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const userDatas = response.data.user
                setUser(userDatas)
                setLoading(false)
            } catch (error) {
                onError("Erreur lors du chargement du profil")
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])
    const [openDeleteAccountModale, setOpenDeleteAccountModale] = useState(false)
    const handleDeleteUserAccount = async () => {
        setOpenDeleteAccountModale(true)

    }

    // ✅ Affichage de chargement
    if (loading) {
        return <div className="profile">Chargement...<Spinner /></div>
    }

    // ✅ Vérification si user existe
    if (!user) {
        return <div className="profile">Aucune donnée utilisateur</div>
    }

    const deleteAccount = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${baseURL}/auth/delete-account/`, {
                withCredentials: true
            })
            if (response.status === 200) {
                onSuccess('Compte supprimé avec succès')
                navigate('/')
            }
        } catch (error) {
            onError(`Une erreur s'est produite`)
        }
    }
    return (
        <div className="profile">
            <div className="profile__datas">

                <div className="profile__email"> {user.role.name === 'SUPER_ADMIN' &&
                    <Link
                        className="profile__email"
                        to={"/admin"}>ADMINISTRATION

                    </Link>}</div>
                <div className="profile__email"> {user.email}</div>
                <div className="profile__username">{user.username}</div>
                <div className="profile__role">{user.role?.name.toLowerCase()}</div>
                {/* ✅ Vérification avant accès à status.name */}
                <div className="profile__role">
                    Status : {user.status?.name?.toLowerCase() || 'Non défini'}
                </div>
                <div className="profile__collections">
                    {user?.collections?.length || 0} collection{user.collections && user?.collections?.length > 1 ? 's' : ''}
                </div>
                <div className="profile__collections">
                   
                    {user?.item?.length || 0} objet{
                    //@ts-ignore 
                    user?.item?.length > 1 ? 's' : ''}  crée{user?.item?.length > 1 ? 's' : ''}
                </div>
                <div className="profile__collections">
                    {user?.likeItems?.length || 0} objet{user?.likeItems?.length > 1 ? 's' : ''} en favoris
                </div>

                <div
                    className="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUserAccount()
                    }}
                >
                    Supprimer mon compte
                </div>
                {openDeleteAccountModale &&
                    <div className="modaleTest" style={{ width: "100%", height: "100%", zIndex: 2, position: "absolute", top: 0, left: 0, padding: 0, margin:0, backgroundColor:"white" }}>
                        <h1>delete account</h1>
                        <button type="button" className="button" onClick={e => deleteAccount(e)}>delete account!</button>
                        <div onClick={() => setOpenDeleteAccountModale(false)}>X</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
