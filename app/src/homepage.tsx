import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import CollectionsProps from "./@interface/CollectionProps";
import { useAuth } from "./context/authContext";

const Homepage = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const navigate = useNavigate()

    const { isConnected } = useAuth();  
    useEffect(() => {
        if (!isConnected) {
            return
        }
        const protocol = import.meta.env.VITE_API_PROTOCOL;
        const domain = import.meta.env.VITE_API_DOMAIN;
        const port = import.meta.env.VITE_API_PORT;

        const fetchUserCollections = async () => {
            const allUserCollections: any = await axios.get(`${protocol}://${domain}:${port}/api/collection`, {
                withCredentials: true,
                headers: {
                }
            })
            setUserCollections(allUserCollections.data.result)
            console.log(allUserCollections.data.result);
        }
        fetchUserCollections()
    }, [])

    const openCollection = (collectionId: string) => {
        navigate(`/collection/${collectionId}`)
    }
    return (
        <div className="font-quicksand">
            {isConnected && <div>
                <h1>Mes collections</h1>
                <button className="bg-blue-200 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2" onClick={() => navigate('/create-collection')}>
                    Ajouter une collection</button>
            </div>
            }
            {/* <div className="sm:w-10/12 sm:flex sm:wrap sm:justify-center md:justify-start sm:m-auto m-4"> */}
            <div className="flex w-10/12 m-auto  flex-wrap">
                {userCollections?.length && userCollections?.map((collection: CollectionsProps) => {
                    return (
                        <div className="w-40 bg-blue-400 h-40 m-2.5 sm:w-10/12 sm:bg-green-400 border-2 border-black  rounded-xl p-2 sm:m-2" onClick={() => openCollection(collection.id)} key={collection.id}>
                            <div>Titre : {collection.title}</div>
                            <div>Catégories : {collection?.tags}</div>
                            <div>Description : {collection.description}</div>
                            <div>Status : {collection.isPublic ? "Publique" : "Privée"}</div>
                            <div>Démarrée le:  {new Date(collection.startingAt).toLocaleDateString("fr-FR")}</div>
                        </div>
                    )
                })}</div>
            <h1>Collections publiques</h1>

        </div>
    )
}

export default Homepage