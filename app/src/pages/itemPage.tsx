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
        description: ""
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
    return (
        <div className="item">
            {/* Possibilité d'utiliser JsBarcode pour afifher un code barre au format img */}
            <article className="item__article">
                <div>ID : {item.id}</div>
                <div>Titre : {item.name}</div>
                <div>Description: {item.description}</div>
                <div>
                <img className="collection__img" src={`${protocol}://${domain}:${port}/uploads/${item.cover}`} alt="collection cover" />
                    
                    <img src="" alt="" /></div>
                <div></div>
                <div></div>



            </article>

        </div>
    )
}


export default ItemPage