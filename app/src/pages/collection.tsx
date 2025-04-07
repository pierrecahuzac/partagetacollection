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
    const [isUpdateCollection, setIsUpdateCollection] = useState<boolean>(false)

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
    const handleUpdateCollection = (e: any) => {
        e.preventDefault()
        setIsUpdateCollection(!isUpdateCollection)

    }
    return (
        <div className="collection">


            <div className="collection__item">
                {isUpdateCollection ?
                    <button onClick={(e) => handleUpdateCollection(e)} className="collection__button-modify">
                        Valider</button>
                    :
                    <button onClick={(e) => handleUpdateCollection(e)} className="collection__button-validate">
                        Modifier
                    </button>
                }
                {collection &&
                    <div className="collection__item__datas">
                        {/* <picture> */}
                        {collection.cover !== null &&
                            <img className="collection__item__img" src={`${protocol}://${domain}:${port}/uploads/${collection?.cover?.replace(/^\/+/, '')}`} alt="collection cover" />
                        }
                        {/* </picture> */}

                        {/* <div >{collection?.tags?.length && collection?.tags?.map((tag: any) => {

                            return (
                                <button key={tag.id}>{tag.name}</button>
                            )
                        })}</div> */}
                        {isUpdateCollection ?
                            <div className="collection__item__data">
                                <input type="text" value={collection.title} className="collection__item__title" />
                                <select name="" id="" className="collection__item__status">
                                    <option value="">Publique</option>
                                    <option value="">Privée</option>
                                </select>


                                <input type="text" value={collection.description} className="collection__item__description" />
                                <input type="text" value={new Date(collection.startedAt).toLocaleDateString("fr-FR")} className="collection__item__startedAt" /></div>
                            :
                            <>
                                <div className="collection__item__title">Titre : {collection.title}</div>
                                <div className="collection__item__status">Visibilité : {collection.isPublic ? "Publique" : "Privée"}</div>

                                <div className="collection__item__description">Description : {collection.description}</div>
                                <div className="collection__item__startedAt">Commencé le  : {new Date(collection.startedAt).toLocaleDateString("fr-FR")}</div></>
                        }


                    </div>
                }
            </div>
        </div>
    )
}

export default Collection