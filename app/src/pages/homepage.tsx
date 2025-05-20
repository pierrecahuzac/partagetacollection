import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { ItemProps } from "../@interface/ItemProps";
import CollectionsProps from "../@interface/CollectionProps";
import CDImg from "../../public/img/D00003.jpg"
import blurayImg from '../../public/img/boitier-bluray-01.jpg';
import DVDImg from '../../public/img/istockphoto-1097301900-612x612.jpg'
import vinyleImg from '../../public/img/50-cd-couleur-jet-d-encre-boitier-digifile-2-volets.jpg'

import '../styles/homepage.scss'

const Homepage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [items, setItems] = useState<ItemProps[] | []>([])
    const [_isLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();

    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
    
    /** Récupérer les collections */
    const fetchUserCollections = async () => {
        try {
            const response = await axios.get<{ result: CollectionsProps[] }>(
                `${baseURL}/api/collection/user-collection`,
                {
                    withCredentials: true,
                }
            );
            setUserCollections(response.data.result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            setUserCollections(null);
        }
    };
    const fetchItems = async () => {
        try {
            const response = await axios.get<ItemProps[]>(`${baseURL}/api/item`, {
                withCredentials: true,
            });
            setItems(response.data);
        } catch (err: any) {
            setError(err);
            setItems([]);
        }
    };

    /** Exécuter les requêtes au changement de `isConnected` */
    useEffect(() => {
        if (!isConnected) {
            navigate('/')
        }
        setIsLoading(true);
        setError(null);

        Promise.all([
            fetchUserCollections(),
            // fetchUserItems(),
            fetchItems()])
            .finally(() => setIsLoading(false));
    }, [isConnected]); 

    const openCollection = (collectionId: string) => {
        navigate(`/collection/${collectionId}`);
    };
    const openItem = (itemId: string) => {
        navigate(`/item/${itemId}`);
    };

    const imgSource = (item: any) => {
        if (item?.formatType?.name.toLowerCase() === "cd") {
            return CDImg;

        } else if (item?.formatType?.name.toLowerCase() === "bluray") {
            return blurayImg;
        }
        else if (item?.formatType?.name.toLowerCase() === "dvd") {
            return DVDImg;
        }
        else if (item?.formatType?.name.toLowerCase() === "vinyle") {
            return vinyleImg;
        }
        else {
            return CDImg
        }
    }

    return (
        <div className="homepage">
            <div className="homepage__container">
                <div className="homepage__collections-section">
                    <h2>Mes collections</h2>
                    {userCollections?.map((collection: CollectionsProps) => (
                        <article
                            key={collection.id}
                            onClick={() => openCollection(collection.id)}
                            className="homepage__collection"
                        >
                            <div className="homepage__collection__image-wrapper">
                                {collection.images && collection.images.length > 0 ? (
                                    collection.images
                                        .filter((img : {isCover: boolean}) => img.isCover)
                                        .map((img: any) =>
                                            img.url ? (
                                                <img
                                                    key={img.id}
                                                    src={`${baseImageUrl}${img.url}`}
                                                    alt="cover"
                                                    className="homepage__collection__image"
                                                />
                                            ) : null
                                        )
                                ) : (
                                    <img
                                        src="/default-cover.jpg"
                                        alt="Image de couverture par défaut"
                                        className="homepage__collection__image"
                                    />
                                )}

                            </div>
                            <div className="homepage__collection__content">
                                <h3 className="homepage__collection__title">{collection.title}</h3>

                                <div className="homepage__collection__tags">
                                    {collection?.tags?.map((tag, index) => (
                                        <span key={index} className="homepage__collection__tag">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <p className="homepage__collection__description">
                                    {collection.description}
                                </p>

                                <div className="homepage__collection__footer">
                                    <div className="homepage__collection__visibility">
                                        <span className="homepage__collection__visibility-text">
                                            {collection.isPublic ? "Publique" : "Privée"}
                                        </span>
                                        <div
                                            className={
                                                collection.isPublic
                                                    ? "homepage__collection--public"
                                                    : "homepage__collection--private"
                                            }
                                        />
                                    </div>
                                    <span className="homepage__collection__date">
                                        {new Date(collection.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <h2 className="homepage__section-title">Mes derniers objets ajoutés</h2>
                <div className="homepage__items-list">
                    {Array.isArray(items) &&
                        items.length > 0 &&
                        items.map((item: {
                            id: string,
                            formatType?: {
                                name: string
                            },
                            name?: string,
                            description?: string,
                            quantity?: number,
                            createdAt?: string | any,
                            price?: number,
                            cover?: string, 
                            images?: {
                                id: string,
                                url: string,
                                isCover: boolean
                            }[]
                        }) => (
                            <article
                                key={item.id}
                                onClick={() => openItem(item.id)}
                                className="homepage__item"
                            >
                                <div className="homepage__item__image-wrapper">
                                    <img
                                        // src={item?.cover === "" ? imgSource(item) : `${baseURL}/uploads/${item?.cover}`}
                                        src={item?.images?.length > 0 ? `${baseURL}/uploads/${item?.images[0].url}` : `${baseURL}/uploads/${item?.cover}`}
                                        alt={item?.formatType?.name}
                                        className="homepage__item__image"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="homepage__item__content">
                                    <h3 className="homepage__item__title">{item.name}</h3>

                                    <div className="homepage__item__details">
                                        <div className="homepage__item__description">
                                            {item.description}
                                        </div>

                                        <div className="homepage__item__price">
                                            {item.price} €
                                        </div>

                                    </div>

                                    <div className="homepage__item__date">
                                        Ajouté le : {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* {item?.user?.username && (
                                    <div className="homepage__item__creator">
                                        Créé par : {item.user.username}
                                    </div>
                                )} */}
                            </article>
                        ))}
                </div>
            </div>
        </div>
    );

}

export default Homepage