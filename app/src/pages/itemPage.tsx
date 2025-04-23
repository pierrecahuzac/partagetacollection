import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import baseURL from "../utils/baseURL"

import '../styles/item.scss'
import { ItemProps } from "../@interface/ItemProps"
const ItemPage = () => {
    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;
    const { itemId } = useParams()
    const [item, setItem] = useState<ItemProps>({
        id: "",
        name: "",
        description: "",
        cover: ''
    })
    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/item/${itemId}`, {
                    withCredentials: true
                })
                setItem(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchDatas()
    }, [])
    // const backToCollection = (id) => {

    // }
    return (
        <div className="item">
            {/* <div onClick={
                () => backToCollection(id)
            }>Retour à la collection</div> */}
            {/* Possibilité d'utiliser JsBarcode pour afficher un code barre au format img */}
            <article className="item__article">
                <div className="item__cover">
                    <img className="collection__img" src={`${protocol}://${domain}:${port}/uploads/${item.cover}`} alt="collection cover" />
                </div>
                <div className="item__infos">
                    <div>ID : {item.id}</div>
                    <div>Titre : {item.name}</div>
                    <div>Description: {item.description}</div>
                </div>
                </article >
        </div >
    )
}

export default ItemPage