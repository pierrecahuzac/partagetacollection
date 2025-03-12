import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

import { ItemProps } from "../@interface/ItemProps";
import CollectionsProps from "../@interface/CollectionProps";

const Homepage = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [items, setItems] = useState<ItemProps[] | []>([])
    const [_VITE_API_DOMAINisLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();

    useEffect(() => {
        if (!isConnected) {
            return;
        }
        const protocol = import.meta.env.VITE_API_PROTOCOL;
        const domain = import.meta.env.VITE_API_DOMAIN;
        const port = import.meta.env.VITE_API_PORT;
        const baseURL = `${protocol}://${domain}:${port}/api`;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const [itemsResponse, collectionsResponse] = await Promise.all([
                    axios.get<ItemProps[]>(`${baseURL}/item`, {
                        withCredentials: true
                    }),
                    axios.get<{ result: CollectionsProps[] }>(`${baseURL}/collection`, {
                        withCredentials: true
                    })
                ]);
                setItems(itemsResponse.data);
                setUserCollections(collectionsResponse.data.result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
                setItems([]);
                setUserCollections(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [isConnected]);

    const openCollection = (collectionId: string) => {
        navigate(`/collection/${collectionId}`)
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-8 px-4 font-quicksand">
            <div className="max-w-6xl mx-auto mt-10">
                {isConnected && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Mes collections</h1>
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
                            {userCollections?.length ? userCollections?.map((collection: CollectionsProps) => (
                                <div
                                    key={collection.id}
                                    onClick={() => openCollection
                                        // @ts-ignore
                                        (collection.id)}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
                                >
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-semibold text-gray-800">{collection.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {collection?.tags?.map((tag, index) => (
                                                <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-600 line-clamp-2">{collection.description}</p>
                                        <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                                            <span className={`px-2 py-1 rounded-full ${collection.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {collection.isPublic ? "Publique" : "Privée"}
                                            </span>
                                            <span>
                                                Créée le {new Date(collection.startingAt).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                                    <p className="text-gray-500">Vous n'avez pas encore de collections. Commencez par en créer une !</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Collections publiques</h2>
                    {/* Ici vous pourrez ajouter la liste des collections publiques avec le même style */}
                {/* </div>  */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800">Derniers objets ajoutés</h2>
                    {items?.length && items?.map((item: ItemProps) => (
                        <div
                            key={item.id}
                            // onClick={() => openCollection
                            //     // @ts-ignore
                            //     (collection.id)}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
                        >
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                {/* <div className="flex flex-wrap gap-2">
                                {item?.tags?.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                                        {tag.name}
                                    </span>
                                ))}
                            </div> */}
                                <p className="text-gray-600 line-clamp-2">{item.description}</p>
                                <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                                    <span className={`px-2 py-1 rounded-full ${item.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {item.isPublic ? "Publique" : "Privée"}
                                    </span>
                                    <span>
                                        Créée le {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Homepage