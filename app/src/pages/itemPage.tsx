import axios from "axios"
import { FC, useEffect,  useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ItemProps } from "../@interface/ItemProps"
//import bwipjs from 'bwip-js';

import '../styles/item.scss'
const ItemPage: FC = () => {   
    const baseURL = import.meta.env.VITE_BASE_URL
    const { itemId } = useParams()
    const navigate = useNavigate()
    const [item, setItem] = useState<ItemProps>({
        id: "",
        name: "",
        title: "",
        description: "",
        cover: '',
        currency: "",
        quantity: 1,
        condition: '',
        barcode: null
    })
    // const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

    // useEffect(() => {
    //     // Quand le barcode est chargé, on génère le code-barres dans le canvas
    //     if (item?.barcode && canvasRef.current) {
    //         try {
    //             bwipjs.toCanvas(canvasRef.current, {
    //                 bcid: 'code128',           // type de code-barres
    //                 text: item.barcode,        // texte à encoder
    //                 scale: 3,
    //                 height: 10,
    //                 includetext: true,
    //                 textxalign: 'center',
    //             })
    //         } catch (e) {
    //             console.error("Erreur generation barcode :", e)
    //         }
    //     }
    // }, [item.barcode])
    const deleteItem = async () => {
        try {
            const response = await axios.delete(`${baseURL}/api/item/${item.id}`, {
                withCredentials: true
            })
            if (response.status === 200) {
                navigate("/homepage")
            }
            console.log(response);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="item">
            {/* <div onClick={
                () => backToCollection(id)
            }>Retour à la collection</div> */}
            {/* Possibilité d'utiliser JsBarcode pour afficher un code barre au format img */}

            <article className="item__article">
                <div className="item__cover">
                    <img className="collection__img" src={`${baseURL}/uploads/${item.cover}`} alt="collection cover" />
                </div>
                {/* {item?.barcode && (
                    <canvas ref={canvasRef} className="item__barcode" />
                )} */}
                <div className="item__infos" id={item.id}>
                    {/* <div>ID : {item.id}</div> */}
                    <div className="item__title">{item.name}</div>
                    <div className="item__description"> {item.description}</div>
                    <div className="item__price"> {item.price} {item.currency}</div>
                    <div className="item__condition"> {item.condition} </div>
                </div>
                <button className="item__delete" onClick={deleteItem}>Supprimer l'objet?</button>

            </article >
        </div >
    )
}

export default ItemPage