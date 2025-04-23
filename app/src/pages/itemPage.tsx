import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import { ItemProps } from "../@interface/ItemProps"

import baseURL from "../utils/baseURL"

import '../styles/item.scss'

const ItemPage : FC= () => {
    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;
    const { itemId } = useParams()
    const [item, setItem] = useState<ItemProps>({
        id: "",
        name: "",
        title: "",
        description: "",
        cover: '',
        currency: "",
        quantity: 1,
        condition: ''
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
                <div className="item__infos" id={item.id}>
                    {/* <div>ID : {item.id}</div> */}
                    <div className="item__title">{item.name}</div>
                    <div className="item__description"> {item.description}</div>
                    <div className="item__price"> {item.price} {item.currency}</div>
                    <div className="item__condition"> {item.condition} </div>
                </div>
            </article >
        </div >
    )
}

export default ItemPage