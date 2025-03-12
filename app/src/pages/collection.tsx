import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import CollectionProps from "../@interface/CollectionProps";
const Collection = () => {
    const [collection, setCollection] = useState<CollectionProps>()


    const { collectionId } = useParams();


    useEffect(() => {
        try {
            const fetchCollection = async () => {
                const response = await axios.get(`http://localhost:3001/api/collection/${collectionId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                console.log(response);
                setCollection(response.data.result)
            }
            fetchCollection()

        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div className="flex w-10/12 m-auto  h-full flex-col justify-center align-middle font-quicksand">
            {collection &&
                <>
                <div className="w-full flex flex-wrap">{collection?.tags?.length && collection?.tags?.map((tag: any) => {
                        return (
                            <button className="w-20
                             rounded-sm bg-blue-400 text-white font-quicksand text-xs  px-4 py-2 m-2" key={tag.id}>{tag.name}</button>
                        )
                    })}</div>
                    
                    <div>Titre : {collection.title}</div>
                    <div>Visibilité : {collection.isPublic ? "Publique" : "Privée"}</div>

                    <div>Description : {collection.description}</div>
                    <div>Commencé le  : {new Date(collection.startingAt).toLocaleDateString("fr-FR")}</div>
                </>
            }
        </div>
    )
}

export default Collection