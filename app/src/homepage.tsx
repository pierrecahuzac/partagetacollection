import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Card from "./componants/card"
import CollectionsProps from "./@interface/CollectionsProps";

const Homepage = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('isConnected')) {
            setIsConnected(true)
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


    return (
        <div>
            {isConnected && <div>
                <h1>Mes collections</h1>
                <button className="bg-blue-200 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2" onClick={() => navigate('/create-collection')}>
                    Ajouter une collection</button>
            </div>
            }
            {userCollections?.length && userCollections?.map((collection: CollectionsProps) => {
                return (
                    <div>
                        {collection.title}
                        {collection.description}
                        <div>Status :{collection.isPublic ? "Publique" : "Privée"}</div>
                        <div>Démarrée le:  {new Date(collection.startingAt).toLocaleDateString("fr-FR")}</div>

                    </div>
                )
            })}
            <h1>Collections publiques</h1>

        </div>
    )
}

export default Homepage