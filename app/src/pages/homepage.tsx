import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { ItemProps } from "../@interface/ItemProps";
import CollectionsProps from "../@interface/CollectionProps";
// import CDImg from "../../public/img/D00003.jpg"
// import blurayImg from '../../public/img/boitier-bluray-01.jpg';
// import DVDImg from '../../public/img/istockphoto-1097301900-612x612.jpg'
// import vinyleImg from '../../public/img/50-cd-couleur-jet-d-encre-boitier-digifile-2-volets.jpg'

import '../styles/homepage.scss'
import CollectionComponent from "../components/collectionComponent";
import ItemComponent from "../components/itemComponent";

const Homepage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    // const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [items, setItems] = useState<ItemProps[] | []>([])
    const [_isLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();

    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    /** Récupérer les collections */
    // const fetchUserCollections = async () => {
    //     try {
    //         const response = await axios.get<{ result: CollectionsProps[] }>(
    //             `${baseURL}/api/collection/user-collection`,
    //             {
    //                 withCredentials: true,
    //             }
    //         );
    //         setUserCollections(response.data.result);
    //     } catch (err) {
    //         setError(err instanceof Error ? err.message : "Une erreur est survenue");
    //         setUserCollections(null);
    //     }
    // };
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
            // fetchUserCollections(),
            // fetchUserItems(),
            fetchItems()])
            .finally(() => setIsLoading(false));
    }, [isConnected]);

    // const openCollection = (collectionId: string) => {
    //     navigate(`/collection/${collectionId}`);
    // };
    const openItem = (itemId: string) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="homepage">
            <div className="homepage__container">
                {/* <div className="homepage__collections-section">
                    <h2>Mes collections</h2>
                    {userCollections?.map((collection: CollectionsProps) => (
                       <CollectionComponent key={collection.id} collection={collection} openCollection={openCollection} baseImageUrl={baseImageUrl}/>
                    ))}
                </div> */}

                <h2 className="homepage__section-title">Les derniers objets ajoutés</h2>
                <div className="homepage__items-list">
                    {Array.isArray(items) &&
                        items.length > 0 &&
                        items.map((item :any)  => (
                            <ItemComponent key={item.id} item={item} openItem={openItem} baseImageUrl={baseImageUrl}/>
                        ))}
                </div>
            </div>
        </div>
    );

}

export default Homepage