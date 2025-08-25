import { useEffect, useState } from "react";
import axios from "axios";

import useToast from "../hooks/useToast";

import '../styles/administration.scss';

const baseURL = import.meta.env.VITE_BASE_URL
const Administration = () => {
    const { onSuccess, onError } = useToast()
    const [allUsers, setAllUsers] = useState([])
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




    return (
        <div className="administration" style={{ marginTop: "4rem" }}>
            {allUsers && allUsers.map((user: {
                id: string, username: string, email: string, role: string
            }) => (
                <div className="administration__user" key={user.id} style={{ width: "100%", height: "100%" }}>
                    <div className="user" style={{ marginTop: "1rem" }}>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.role}</div></div>
                    <button>Delete User</button>
                    <button>Modify User</button>
                </div>
            ))}

        </div>
    )
}

export default Administration