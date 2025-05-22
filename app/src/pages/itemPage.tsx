import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ItemProps } from "../@interface/ItemProps"
import { SlPencil } from "react-icons/sl";

import Modale from "../components/modale"
import Button from "../components/button"
import Carrousel from "../components/carrousel";

import '../styles/item.scss'

const ItemPage: FC = () => {
    const baseURL = import.meta.env.VITE_BASE_URL
    const [openModaleDelete, setOpenModaleDelete] = useState<boolean>(false)
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
        barcode: null,
        images: []
    })
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);

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

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`${baseURL}/api/item/${item.id}`, {
                withCredentials: true
            })
            if (response.status === 200) {
                navigate("/homepage")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const openModalImages = () => {

        setModalImagesIsOpen(true); // On ouvre toujours la modale
    }
    return (
        <div className="item">
            {modalImagesIsOpen &&
                <Modale onClose={() => setModalImagesIsOpen(false)} >
                    <Carrousel images={item?.images} />
                </Modale>
            }
            <article className="item__article">
                <div className="item__cover">                    
                    <img className="collection__img" src={`${baseURL}/uploads/${item?.images[0]?.url}`} alt="item cover" />
                </div>
                {item?.images?.length !== undefined && item?.images?.length > 1 &&
                    <p className="collection__cover-more" onClick={openModalImages}>voir plus d'images</p>
                }
                <div className="item__infos" id={item.id}><div className="item__modify"><SlPencil /></div>
                    <div className="item__title">{item.name}</div>
                    <div className="item__description"> {item.description}</div>
                    <div className="item__price"> {item.price} {item.currency}</div>
                    <div className="item__condition"> {item.condition} </div>
                </div>
                <button className="item__delete" onClick={() => setOpenModaleDelete(true)}
                >Supprimer l'objet?</button>
                {openModaleDelete &&
                    <Modale
                        onClose={() => setOpenModaleDelete(false)}
                    >
                        <p>Voulez-vous supprimer cet objet de votre collection?</p>
                        <p>Attention, ceci est définitif </p>
                        <p>
                            <Button onClick={() => deleteItem()} disabled={false}>Oui!</Button>
                            <Button onClick={() => setOpenModaleDelete(false)} disabled={false}>Non</Button>
                        </p>
                    </Modale>}
            </article >
        </div >
    )
}

export default ItemPage