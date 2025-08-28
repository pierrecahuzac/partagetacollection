import axios from "axios";
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";

import '../styles/user-collection.scss'

const UserCollection = () => {
    const [collections, setCollections] = useState<any>()
    const baseURL = import.meta.env.VITE_BASE_URL;
     ;
    
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyCollections = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/collection/user-collection`,
                    {
                        withCredentials: true,
                    }
                );
             
              
                
                setCollections(response.data.result);
            } catch (err) {
                setCollections([]);
            }
        };
        fetchMyCollections()
    }, []);

    return (
        <div className="user-collection">
            <h1>Mes collections</h1>
            <div className="user-collection__list">
                {collections?.length > 0 ? collections?.map((collection: {
                    id: string,
                    cover: string,
                    createdAt: string,
                    description: string,
                    endingAt: string,
                    isPublic: boolean,
                    startedAt: string,
                    title: string,
                    updatedAt: string,
                    userId: string,
                    images: [{
                        url: string,
                        isCover: boolean
                    }]
                }) =>
                    <div onClick={() => navigate(`/collection/${collection.id}`)} className="user-collection__item"
                        key={collection.id} id={collection.id}>

                        <div className="user-collection__item-img">
                            {(() => {
                                const coverImage = collection.images?.find(img => img.isCover) || collection.images?.[0];
                                if (coverImage && coverImage.url) {
                                    return <img
                                    //@ts-ignore
                                        key={coverImage.id}
                                        src={coverImage.url}
                                        alt="cover"
                                        className="homepage__collection__image"
                                    />;
                                }
                                return (
                                <img
                                    src="/default-cover.jpg"
                                    alt="Image de couverture par défaut"
                                    className="homepage__collection__image"
                                />
                            );
                            })()}
                        </div>
                        <div className="user-collection__item-data">
                            <p className="user-collection__item-title">Titre : {collection.title}</p>
                            <p className="user-collection__item-description">Description :  {collection.description}</p>
                            <p className="user-collection__startedAt">Débutée le:  {new Date

                                (collection.startedAt).toLocaleDateString("FR-fr")}

                            </p>
                        </div>
                    </div>
                ) : <></>}
                <div
                    className="user-collection__create"
                    onClick={() => navigate('/create-collection')}
                >
                    <p className="user-collection__item-title">Ajouter une nouvelle collection </p>
                </div>
            </div>
        </div>
    )
}

export default UserCollection
