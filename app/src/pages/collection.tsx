import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import CollectionProps from "../@interface/CollectionProps";

import '../styles/collection.scss'

const Collection = () => {
    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;
    const [collection, setCollection] = useState<CollectionProps>()


    const { collectionId } = useParams();


    useEffect(() => {
        try {
            const fetchCollection = async () => {
                const response = await axios.get(`${protocol}://${domain}:${port}/api/collection/${collectionId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
  
                setCollection(response.data.result)
            }
            fetchCollection()

        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="collection">
            <h1 className="">{collection?.title}</h1>
            <div className="">
                <div className="">
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
                            {collection.cover !== null ? <picture>
                                <img src={`${protocol}://${domain}:${port}/uploads/${collection?.cover?.replace(/^\/+/, '')}`} alt="collection cover" />
                            </picture> : <></>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection