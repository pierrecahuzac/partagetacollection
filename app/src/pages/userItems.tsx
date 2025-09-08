import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

//@ts-ignore
import { ItemProps } from "../@interface/ItemProps"

import Modale from "../components/ui/modale"
import Button from "../components/ui/button"
import Carrousel from "../components/ui/carrousel";

import '../styles/item.scss'
import useToast from "../hooks/useToast"

const UserItem = () => {
    const baseURL = import.meta.env.VITE_BASE_URL
    const { collectionItemId } = useParams()
    const navigate = useNavigate()
    // const [modalAddingObjectInColectionIsOpen, setModalAddingObjectInColectionIsOpen] = useState<boolean>(false)
    const { onError } = useToast()
    const [openModaleDelete, setOpenModaleDelete] = useState<boolean>(false)
    const [item, setItem] = useState<ItemProps>({
        id: "",
        name: "",
        title: "",
        description: "",
        condition: '',
        barcode: null,
        images: [],
        album: "",
        artist: "",
        author: "",
        director: "",
        gameDeveloper: "",
        gameEditor: "",
        genre: "",
        isbn: "",
        language: "",
        platform: "",
        videoEditor: "",
        denomination: "",
        likeItems: "",
        material: "",
        audioDuration: "",
        country: "",
        collection: "",
        isPublic: "",
        videoDuration: "",
        formatTypeId: "",
        publisher: "",
        style: "",
        year: "",
        collections: "",
        creatorId: ""

    })
    // const [selectedCollection, setSelectedCollection] = useState([])
    // const [customParams, setCustomParams] = useState({
    //     purchasePrice: '',
    //     condition: '',
    //     notes: ''
    // })

    // const [userCollections, setUserCollections] = useState<[]>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [_connectedUserId, setConnectedUserId] = useState("")
    const [_itemInCollection, setItemInCollection] = useState()
    // const {collectionItemId } = useParams();


    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const response = await axios.get(`${baseURL}/collection-item/${collectionItemId}`, {
                    withCredentials: true
                })
                setItem(response.data.item);
                setItemInCollection(response.data.itemInCollection)
            } catch (error) {
                onError(`Une errur c'est produite`)
            }
        }

        const fetchUser = async () => {
            const getUser: any = await axios.get(`${baseURL}/user`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setConnectedUserId(getUser.data.user.id)

        }

        fetchUser()
        fetchDatas()

    }, [])

    const deleteItem = async () => {
        try {

            const response = await axios.delete(`${baseURL}/api/collection-item/${collectionItemId}`, {
                withCredentials: true
            })
            if (response.status === 200) {
                navigate("/")
            }
        } catch (error) {
            onError(`Une errur c'est produite`)
        }
    }

    const openModalImages = () => {
        setModalImagesIsOpen(true);
    }




    return (
        <div className="item">
            {modalImagesIsOpen &&
                <Modale onClose={() => setModalImagesIsOpen(false)} >
                    <Carrousel images={item?.images} />
                </Modale>
            }
            <div className="item__article">
                <div className="item__cover">
                    <div className="item__image-container">
                        {item?.images && item.images.length > 0 ? (
                            <img className="item__image" src={item.images[0].url} alt="item cover" />
                        ) : "pas d'images"}
                    </div>
                    {item?.images?.length !== undefined && item?.images?.length > 1 &&
                        <p className="collection__cover-more" onClick={openModalImages}>voir plus d'images</p>
                    }
                </div>
                <div className="item__infos" style={{display: "flex", flexDirection:"column"}}>
                    <div className="item__name" >
                        Nom :   {item?.item?.name}
                    </div>
                    <div className="item__description" >
                        Description :   {item?.item?.description}
                    </div>
                    <div className="item__pricePaid" >
                        Prix :   {item?.pricePaid}  {item?.currency} €
                    </div>
                </div>
            </div >
            <div className="item__datas">  <div className="item__footer">
                <button type='button'>Supprimer l'objet de cette collection</button>
            </div>
            </div>
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
        </div >
    )
}

export default UserItem