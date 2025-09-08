import axios from "axios";
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/spinner";
import '../styles/user-collections.scss'

const userCollections = () => {
    const [collections, setCollections] = useState<any>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const baseURL = import.meta.env.VITE_BASE_URL;
    ;

    const navigate = useNavigate()

    useEffect(() => {
        const fetchMyCollections = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${baseURL}/collection/user-collections`,
                    {
                        withCredentials: true,
                    }
                );


                setCollections(response.data.result);
                setIsLoading(false)
                setErrorMessage(null);
            } catch (err) {
                setCollections([]);
                setErrorMessage("Impossible de charger vos collections. Veuillez réessayer plus tard.");
                setIsLoading(false)
                if (import.meta.env.MODE === 'development') {
                    console.error("Erreur lors du chargement des collections :", err);
                }
            }
        };
        fetchMyCollections()
    }, []);

    return (
        <div className="user-collections">
            <h1 className="user-collections__title">Mes collections</h1>
            {errorMessage && <p className="user-collections__error-message">{errorMessage}</p>}

            {isLoading ? <div className="user-collections__loading" ><Spinner/></div> :
                <div className="user-collections__list">
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
                </div>
            }
        </div>
    )
}

export default userCollections
