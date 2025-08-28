import { useEffect, useState } from "react";
import axios from "axios";

import useToast from "../hooks/useToast";

import '../styles/administration.scss';

const baseURL = import.meta.env.VITE_BASE_URL
const Administration = () => {
    const { onSuccess, onError } = useToast()
    const [allUsers, setAllUsers] = useState([])
    const [userCanBeModified, setUserCanBeModified] = useState(false)
    useEffect(() => {
        fetchAllUsers()
    }, [])
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/admin/allUsers`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            onSuccess('Utilisateurs récupérés')
            setAllUsers(response.data)
        } catch (error) {
            onError('Erreur de récupération des utilisateurs')
            throw error
        }
    }

    // const modifyUserRole = async () => {
    //     try {
    //         const modifyUser = await axios.put(`${baseURL}/admin/modifyUserRole`,
    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 }
    //             })
    //         console.log(modifyUser);

    //         onSuccess('Rôle modifié avec succès'
    //         )
    //     } catch (error) {
    //         console.log(error);
    //         onError('Erreur de modification du rôle')

    //     }
    // }


    return (
        <div className="administration" style={{ marginTop: "4rem" }}>
            {allUsers && allUsers.map((user: {
                id: string, username: string, email: string, role: string, status?: string
            }) => (
                <div className="administration__user" key={user.id} style={{ width: "100%", height: "100%" }}>
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
                                        <input type="text" />
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
            ))}

        </div>
    )
}

export default Administration