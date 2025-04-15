import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

import { ItemProps } from "../@interface/ItemProps";
import CollectionsProps from "../@interface/CollectionProps";
import baseURL from "../utils/baseURL";
import CDImg from "../../public/img/D00003.jpg"
import blurayImg from '../../public/img/boitier-bluray-01.jpg';
import DVDImg from '../../public/img/istockphoto-1097301900-612x612.jpg'
import vinyleImg from '../../public/img/50-cd-couleur-jet-d-encre-boitier-digifile-2-volets.jpg'

import '../styles/homepage.scss'

const Homepage = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [items, setItems] = useState<ItemProps[] | []>([])

    const [_isLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();


    /** Récupérer les collections */
    const fetchCollections = async () => {
        try {
            const response = await axios.get<{ result: CollectionsProps[] }>(
                `${baseURL}/api/collection`,
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

    /** 🔹 Récupérer les objets */
    const fetchItems = async () => {
        const isConnected = localStorage.getItem('isConnected')
        try {
            const response = await axios.get<ItemProps[]>(`${baseURL}/api/item`, {
                withCredentials: true,
                params: { isConnected }

            });
            console.log(response.data);

            setItems(response.data);
        } catch (err: any) {
            setError(err);
            setItems([]);
        }
    };

    /** 🔄 Exécuter les requêtes au changement de `isConnected` */
    useEffect(() => {
        if (!isConnected) {
            navigate('/signup')
        }
        setIsLoading(true);
        setError(null);

        Promise.all([fetchCollections(), fetchItems()]).finally(() => setIsLoading(false));
    }, [isConnected]); // ✅ Re-fetch lorsque l'utilisateur se connecte ou se déconnecte

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
                <div className="">
                    {/* {userCollections && userCollections.length > 0 ? <div className="">
                        <h1 className="">Toutes les collections publiques</h1>
                    </div>
                        : <></>} */}
                    <div >
                        {userCollections?.map((collection: any) => (
                            <article
                                key={collection.id}
                                onClick={() => openCollection
                                    (collection.id)}
                                className="homepage__collection"
                            >
                                <div className="homepage__collection__caption">
                                    <img src={`http://192.168.1.59:3001/uploads/${collection?.cover}`} alt="cover" className="homepage__collection__cover" />
                                </div>
                                <h3 className="homepage__collection__title">{collection.title}</h3>
                                <div className="homepage__collection__tags">
                                    {collection?.tags?.map((tag: any, index: number) => (
                                        <span key={index} className="homepage__collection__tag">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                <p className="homepage__collection__description">{collection.description}</p>



                                <div className="homepage__datas">
                                    <div className="homepage__visibility">
                                        <div className="homepage__text">{collection.isPublic ? "Publique" : "Privée"}</div>
                                        <div className={`${collection.isPublic ? 'homepage__public' : 'homepage__private'}`}>
                                        </div>
                                    </div>
                                    <span>
                                        Créée le {new Date(collection.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                            </article>
                        ))}
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Derniers objets ajoutés</h2>
                <div className="homepage_items-list">
                    {Array.isArray(items) && items?.length && items?.map((item: any) => (
                        <article
                            onClick={() => openItem(item.id)}
                            key={item.id}
                            className="homepage__item"                        >
                            <div className="homepage__item__cover">
                                <img src={imgSource(item)}
                                    alt={item?.formatType?.name}
                                    style={{
                                        width: "20px",
                                        height: "30px"
                                    }}
                                    loading="lazy"
                                />
                            </div>
                            <div className="homepage__item__datas">
                                <h3 className="homepage__item__title" >Titre : {item.name}</h3>
                                {/* <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)} // ✅ Vérifie si l'item est déjà sélectionné
                                    className="homepage__item__checkbox"
                                    onChange={(e) => {
                                        if (!item.id) {
                                            console.error("⚠️ ID de l'item introuvable !");
                                            return;
                                        }

                                        if (e.target.checked) {
                                            setSelectedItems(prevState => [...prevState, item.id]);
                                        } else {
                                            setSelectedItems(prevState => prevState.filter(id => id !== item.id));
                                        }

                                    }}
                                /> */}
                                <div><div className="">Description : {item.description}</div>
                                    <div className="">Quantité : {item.quantity}</div>
                                    <div className="">Prix : {item.price} €</div>

                                    <div className="">
                                        <span className={item.isPublic ? "homepage__item_public" : "homepage__item_private"}>
                                            {item.isPublic ? "Public" : "Privé"}
                                        </span>
                                    </div>
                                </div>
                                <div className="homepage__item__added">
                                    Ajouté le : {new Date(item.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            {item?.user?.username ?
                                <div className="homepage__item__createdBy">
                                    Crée par : {item?.user?.username}
                                </div> : <></>
                            }
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Homepage