import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

import { ItemProps } from "../@interface/ItemProps";
import CollectionsProps from "../@interface/CollectionProps";

const Homepage = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [items, setItems] = useState<ItemProps[] | []>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [_VITE_API_DOMAINisLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();



    const baseURL = `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_DOMAIN}:${import.meta.env.VITE_API_PORT}/api`;

    /** Récupérer les collections */
    const fetchCollections = async () => {
        try {
            const response = await axios.get<{ result: CollectionsProps[] }>(
                `${baseURL}/collection`,
                {
                    withCredentials: true,

                }
            );
            console.log(response);
            setUserCollections(response.data.result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            setUserCollections(null);
        }
    };

    /** 🔹 Récupérer les objets */
    const fetchItems = async () => {
        try {
            const response = await axios.get<ItemProps[]>(`${baseURL}/item`, {
                withCredentials: true,

            });
            console.log(response);
            setItems(response.data);
        } catch (err: any) {
            setError(err);
            setItems([]);
        }
    };

    /** 🔄 Exécuter les requêtes au changement de `isConnected` */
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        Promise.all([fetchCollections(), fetchItems()]).finally(() => setIsLoading(false));
    }, [isConnected]); // ✅ Re-fetch lorsque l'utilisateur se connecte ou se déconnecte

    const openCollection = (collectionId: string) => {
        navigate(`/collection/${collectionId}`);
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-8 px-4 font-quicksand">
            <div className="max-w-6xl mx-auto mt-10">

                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Toutes les collections publiques</h1>
                        <button
                            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                            onClick={() => navigate('/create-item')}
                        >
                            <span>+</span>
                            Ajouter un objet
                        </button>
                        <button
                            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                            onClick={() => navigate('/create-collection')}
                        >
                            <span>+</span>
                            Ajouter une collection
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userCollections?.length && userCollections?.map((collection: any) => (
                            <article
                                key={collection.id}
                                onClick={() => openCollection
                                    (collection.id)}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
                            >
                                <div className="space-y-3">
                                    <h3 className="text-xl font-semibold text-gray-800">{collection.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {collection?.tags?.map((tag: any, index: number) => (
                                            <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 line-clamp-2">{collection.description}</p>

                                    <div>
                                        <img src={`http://localhost:3001/uploads/${collection?.cover}`} alt="cover" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                                        <span className={`px-2 py-1 rounded-full ${collection.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {collection.isPublic ? "Publique" : "Privée"}
                                        </span>
                                        <span>
                                            Créée le {new Date(collection.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>



                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800">Derniers objets ajoutés</h2>
                    {items?.length && items?.map((item: any) => (
                        
                        
                        <article
                            key={item.id}

                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
                        >
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)} // ✅ Vérifie si l'item est déjà sélectionné
                                onChange={(e) => {
                                    console.log("ID de l'item :", item.id); // 🔍 Debugging
                                
                                    if (!item.id) {
                                        console.error("⚠️ ID de l'item introuvable !");
                                        return;
                                    }
                                
                                    if (e.target.checked) {
                                        setSelectedItems(prevState => [...prevState, item.id]);
                                    } else {
                                        setSelectedItems(prevState => prevState.filter(id => id !== item.id));
                                    }
                                
                                    console.log("Éléments sélectionnés :", selectedItems);
                                }}
                            />
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-800" onClick={() => openCollection

                                    (item.id)}>Titre : {item.name}</h3>
                                {/* <div className="flex flex-wrap gap-2">
                                {item?.tags?.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                                        {tag.name}
                                    </span>
                                ))}
                            </div> */}
                                <p className="text-gray-600 line-clamp-2">Description : {item.description}</p>
                                <p className="text-gray-600 line-clamp-2">Quantité : {item.quantity}</p>
                                <p className="text-gray-600 line-clamp-2">Prix : {item.price} €</p>
                                <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                                    <span className={`px-2 py-1 rounded-full ${item.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {item.isPublic ? "Publique" : "Privée"}
                                    </span>
                                    <span>
                                        Ajouté le : {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                    <span>

                                        Crée par : {item.user.username}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Homepage