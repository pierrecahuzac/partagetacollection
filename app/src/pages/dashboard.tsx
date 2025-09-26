import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

import useToast from "../hooks/useToast";

import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/spinner";
import { RoleProps } from "../@interface/RoleProps";
// import Button from "../components/ui/button";

import '../styles/dashboard.scss';

const baseURL = import.meta.env.VITE_BASE_URL
const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { onSuccess, onError } = useToast()
    const [allUsers, setAllUsers] = useState([])
    const [roles, setRoles] = useState<RoleProps[]>([])
    const [userCanBeModified, setUserCanBeModified] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        verifyUserRole()
    }, [])
    const verifyUserRole = async () => {
        try {
            const response = await axios.get(`${baseURL}/user`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
            if (response.data.user.role.name !== "SUPER_ADMIN") {
                onError('Accès refusé : droits insuffisants')
                navigate('/')
                return
            }
            onSuccess('Accès autorisé')
            await fetchAllUsers()
            await fetchAllRoles()
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/admin/allUsers`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setAllUsers(response.data)
        } catch (error) {
            onError('Erreur de récupération des utilisateurs')
            throw error
        }
    }
    const fetchAllRoles = async () => {
        try {
            const response = await axios.get(`${baseURL}/role`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            setRoles(response.data)
        } catch (error) {
            onError('Erreur de récupération des utilisateurs')
            throw error
        }
    }
    const changeUserRole = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);

    }

    return (
        <div className="dashboard" style={{ marginTop: "4rem" }}>
            {isLoading ? <Spinner /> :

                allUsers && allUsers.map((user: {
                    id: string, username: string, email: string, role: string, status?: string
                }) => (
                    <div className="dashboard__user" key={user.id} style={{ width: "100%", height: "100%" }}>
                        <div className="user" style={{ marginTop: "1rem" }}>
                            {userCanBeModified ?
                                <>
                                    <div>
                                        <label htmlFor="">Username
                                            <input type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">Email
                                            <input type="text" />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">Rôle
                                            <select name="" id="" onChange={e => changeUserRole(e)}>
                                                <option value="Choisir" defaultChecked>Choisir</option>
                                                {
                                                    roles.map((role) =>
                                                        <option value={role.name} id={role.id}>{role.name.toLowerCase()}</option>
                                                    )
                                                }
                                            </select>
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">Status
                                            <input type="text" />
                                        </label>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <label htmlFor="">Username
                                            <span>{user.username}
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="">Email
                                                <span>{user.email}
                                                </span>
                                            </label>
                                        </div>

                                    </div>
                                    <div>
                                        <label htmlFor="">Rôle
                                            <span>{user.role}
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="">Status
                                            <span>{user.status}
                                            </span>
                                        </label>
                                    </div>
                                </>}
                        </div>
                        <button>Supprimer l'utilisateur</button>
                        <button>Bloquer l'utilisateur</button>
                        <button onClick={() => setUserCanBeModified(!userCanBeModified)}>Modifier le rôle</button>
                    </div>
                ))
            }


        </div>
    )
}

export default Dashboard