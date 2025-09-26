import axios from "axios";

import { useState } from "react";
import { UserProps } from "../@interface/UserProps";


const Community = () => {
    const [user, setUser] = useState<UserProps>({
        email: '',
        username: '',
        collections: [],
        role: {
            id: '',
            name: ''
        },
        id: '',
        status: {
            id: '',
            name: '',
            description: '',
            order: 1,
            createdAt: '',
            updatedAt: ''
        },
        likeItems: [],
        item: []
    })
    const [search, setSearch] = useState('')

    const searchPeople = async (e: React.FormEvent) => {
        setUser({
            email: '',
            username: '',
            collections: [],
            role: {
                id: '',
                name: ''
            },
            id: '',
            status: {
                id: '',
                name: '',
                description: '',
                order: 1,
                createdAt: '',
                updatedAt: ''
            },
            likeItems: [],
            item: []
        });
        e.preventDefault()
        const baseURL = import.meta.env.VITE_BASE_URL
        try {
            const response = await axios.post(`${baseURL}/user/searchUser`, { search }, {
                withCredentials: true
            })
            console.log(response.data.user);
            setUser(response.data.user)

        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
        }
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="community">
            <form onSubmit={searchPeople} className="community__form" style={{ marginTop: '10rem' }}>
                <input
                    type="text"
                    value={search}
                    className="community__searchBar"
                    onChange={changeInput}
                    placeholder="Rechercher des utilisateurs..."
                />
                <button type="submit" className="community__submit">
                    Chercher
                </button>
            </form>
            {user &&
                <>
                    <div>{user?.username}</div>
                    <div>{user?.email}</div>
                    <div>{user?.collections && user?.collections.map((collection: any) => collection.title)}</div><div className="community__add-friend">Demande ajout</div>
                    <div>{user?.item && user?.item?.map((it: any) => it?.name)}</div>


                </>
            }
        </div>
    )


}

export default Community;
