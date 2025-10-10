import axios from "axios";
import { useEffect } from "react"

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import '../styles/user-collections.scss'

const userCollections = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()
    const fetchMyCollections = async () => {

        try {
            const response = await axios.get(
                `${baseURL}/collection/user-collections`,
                {
                    withCredentials: true,
                }
            );return response.data.result;
        } catch (err) {
            console.log(err);
            
            throw err

        }
    };

    const { data: userCollectionsData, isLoading, error } = useQuery({
        queryKey: ['userCollections'],
        queryFn: fetchMyCollections
    })


    useEffect(() => {
        fetchMyCollections()
    }, []);

    return (
        <div className="user-collections">
            <h1 className="user-collections__title">Mes collections</h1>

            {isLoading ?
                <>Chargement</> :
                <div className="user-collections__list">
                    {userCollectionsData?.length > 0 ? userCollectionsData?.map((collection: {
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
                            isCover: boolean,
                            id: string
                        }]
                    }) =>
                        <div onClick={() => navigate(`/collection/${collection.id}`)} className="user-collections__item"
                            key={collection.id} id={collection.id}>

                            <div className="user-collections__item-img">
                                {(() => {
                                    const coverImage = collection.images?.find(img => img.isCover) || collection.images?.[0];
                                    if (coverImage && coverImage.url) {
                                        return <img
                                            key={coverImage.id}
                                            src={coverImage.url}
                                            alt="cover"
                                            className="user-collections__item-img-element"
                                        />;
                                    }
                                    return (
                                        <img
                                            src="/default-cover.jpg"
                                            alt="Image de couverture par défaut"
                                            className="user-collections__item-img-element"
                                        />
                                    );
                                })()}
                            </div>
                            <div className="user-collections__item-data">
                                <p className="user-collections__item-title">Titre : {collection.title}</p>
                                <p className="user-collections__item-description">Description :  {collection.description}</p>
                                <p className="user-collections__startedAt">Débutée le:  {new Date(collection.startedAt).toLocaleDateString("FR-fr")}
                                </p>
                            </div>
                        </div>
                    ) : <></>}
                    <div
                        className="user-collections__create"
                        onClick={() => navigate('/create-collection')}
                    >
                        <p className="user-collections__item-title">Ajouter une nouvelle collection </p>
                    </div>
                </div>}
            {error && <p>{error.message}</p>}


        </div>
    )
}

export default userCollections
