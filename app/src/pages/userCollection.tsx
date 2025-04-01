import axios from "axios";
import { useEffect, useState } from "react"

import { useNavigate } from "react-router";

import '../styles/user-collection.scss'

const UserCollection = () => {
    const [collections, setCollections] = useState<any>()
    const baseURL = `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_DOMAIN}:${import.meta.env.VITE_API_PORT}/api`;
    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
    const navigate = useNavigate()

    useEffect(() => {

        const fetchMyCollections = async () => {
            try {
                const response = await axios.get<{ result: any }>(
                    `${baseURL}/collection/user-collection`,
                    {
                        withCredentials: true,
                    }
                );

                setCollections(response.data.result);
            } catch (err) {
                //  setError(err instanceof Error ? err.message : "Une erreur est survenue");
                setCollections([]);
            }
        };
        fetchMyCollections()
    }, [])
    return (
        <div className="user-collection">
            <h1>Ma collection</h1>
            <button
                className="px-6 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={() => navigate('/create-item')}
            >
                <span>+ </span>
                Ajouter un objet
            </button>
            <button
                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                onClick={() => navigate('/create-collection')}
            >
                <span>+ </span>
                Ajouter une collection
            </button>
            <div className="user-collection__list">
                {collections?.length > 0 ? collections?.map((collection: {
                    id: String,
                    cover: String,
                    createdAt: String,
                    description: String,
                    endingAt: String,
                    isPublic: Boolean,
                    startedAt: String,
                    title: String,
                    updatedAt: String,
                    userId: String
                }) =>
                    <div onClick={() => navigate(`/collection/${collection.id}`)} className="user-collection__item" key={collection.id} id={collection.id}>
                        <div className="user-collection__item-img"><img src={`${baseImageUrl}/uploads/${collection?.cover}`} /> </div>
                        <div className="user-collection__item-data">
                            <p className="user-collection__item-title">Titre : {collection.title}</p>
                            <p className="user-collection__item-description">Description :  {collection.description}</p>
                            <p className="user-collection__startedAt">Débutée le:  {new Date  //@ts-ignore
                                (collection.startedAt).toLocaleDateString("FR-fr")}

                            </p>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    )

}

export default UserCollection