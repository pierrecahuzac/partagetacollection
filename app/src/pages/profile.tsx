import axios from "axios";
import { useEffect, useState } from "react"

import '../styles/profile.scss';
import useToast from "../hooks/useToast";
import { Spinner } from "../components/ui/loader";

// 🎯 Ajouter une interface pour le type
interface User {
    email: string;
    username: string;
    role: string;
    status?: {
        name: string;
    };
    collections?: any[];
}

const Profile = () => {
    const { onError } = useToast()
    const [user, setUser] = useState<User | null>(null) // ✅ Typage + null initial
    const [loading, setLoading] = useState(true) // ✅ État de chargement
    const baseURL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchUser = async () => {
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
            } catch (error) {
                onError("Erreur lors du chargement du profil")
            } finally {
                setLoading(false) // ✅ Arrêter le loading
            }
        }
        fetchUser()
    }, [])

    const handleDeleteUserAccount = async () => {
        try {
            await axios.delete(`${baseURL}/auth/user/`, {
                withCredentials: true
            })
        } catch (error) {
            onError(`Une erreur s'est produite`)
        }
    }

    // ✅ Affichage de chargement
    if (loading) {
        return <div className="profile">Chargement...<Spinner/></div>
    }

    // ✅ Vérification si user existe
    if (!user) {
        return <div className="profile">Aucune donnée utilisateur</div>
    }

    return (
        <div className="profile">
            <div className="profile__datas">
                <div className="profile__email">Email : {user.email}</div>
                <div className="profile__username">Nom d'utilisateur : {user.username}</div>
                <div className="profile__role">Rôle : {user.role?.toLowerCase()}</div>
                {/* ✅ Vérification avant accès à status.name */}
                <div className="profile__role">
                    Status : {user.status?.name?.toLowerCase() || 'Non défini'}
                </div>
                <div className="profile__collections">
                    Nombre de collections : {user.collections?.length || 0}
                </div>
               
                <div
                    className="profile__delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUserAccount()
                    }}
                >
                    Supprimer
                </div>
            </div>
        </div>
    )
}

export default Profile
