import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import { SlTrash } from "react-icons/sl";


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
    const [modalAddingObjectInColectionIsOpen, setModalAddingObjectInColectionIsOpen] = useState<boolean>(false)
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
    const [selectedCollection, setSelectedCollection] = useState([])
    console.log(item);
    const [userCollections, setUserCollections] = useState<[]>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [connectedUserId, setConnectedUserId] = useState("")
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

        const fetchUser = async () => {
            const getUser: any = await axios.get(`${baseURL}/user`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            console.log(getUser.data.user.id);
            setConnectedUserId(getUser.data.user.id)

        }
        const fetchAllUserCollections = async () => {
            const response: any = await axios.get(`${baseURL}/api/collection/user-collection`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            setUserCollections(response.data.result)
        }
        fetchUser()
        fetchDatas()
        fetchAllUserCollections()
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
        setModalImagesIsOpen(true);
    }
    //console.log(`${baseURL}/uploads/${item?.images[0]?.url}`);

    const addItemToMyCollection = () => {
        console.log("addItemToMyCollection");
    }
    
    

    const handleItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value, checked } = e.target;
        setSelectedCollection((prev: any) => {
            if (checked) {
                // Si la case est cochée, on ajoute l'item
                return [...prev, { id, value }];
            } else {
                // Sinon, on le retire
                //@ts-ignore
                return prev.filter(item => item.id !== id);
            }
        });
    };
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
                        {item && <img className="item__image" src={`${baseURL}/uploads/${item?.images[0]?.url}`} alt="item cover" />}</div>
                    {item?.images?.length !== undefined && item?.images?.length > 1 &&
                        <p className="collection__cover-more" onClick={openModalImages}>voir plus d'images</p>
                    }
                </div>

                <div className="item__infos" id={item.id}>
                    <div className="item__modify"><SlPencil /></div>
                    <div className="item__title">{item.name}</div>
                    <div className="item__description">{item.description}</div>
                    <div className="item__condition">{item.condition}</div>
                    <div className="item__details">
                        {/* Informations générales */}
                        <div className="item__section">
                            <h3 className="item__section-title">Informations générales</h3>
                            {item.barcode && <div className="item__detail">
                                <span className="item__detail-label">Code-barres:</span>
                                <span className="item__detail-value">{item.barcode}</span>
                            </div>}
                            {item.isPublic && <div className="item__detail">
                                <span className="item__detail-label">Public:</span>
                                <span className="item__detail-value">{item.isPublic ? "Oui" : "Non"}</span>
                            </div>}
                            {item.price && <div className="item__detail">
                                <span className="item__detail-label">Prix:</span>
                                <span className="item__detail-value">{item.price}</span>
                            </div>}
                        </div>

                        {/* Affichage conditionnel selon le formatType.name */}
                        {item.formatType?.name === "Bande dessinée" && (
                            <div className="item__section">
                                <h3 className="item__section-title">Informations Bande dessinée</h3>
                                {item.isbn && <div className="item__detail">
                                    <span className="item__detail-label">ISBN:</span>
                                    <span className="item__detail-value">{item.isbn}</span>
                                </div>}
                                {item.author && <div className="item__detail">
                                    <span className="item__detail-label">Auteur:</span>
                                    <span className="item__detail-value">{item.author}</span>
                                </div>}
                                {item.publisher && <div className="item__detail">
                                    <span className="item__detail-label">Éditeur:</span>
                                    <span className="item__detail-value">{item.publisher}</span>
                                </div>}
                                {item.language && <div className="item__detail">
                                    <span className="item__detail-label">Langue:</span>
                                    <span className="item__detail-value">{item.language}</span>
                                </div>}
                                {item.year && <div className="item__detail">
                                    <span className="item__detail-label">Année de publication:</span>
                                    <span className="item__detail-value">{item.year}</span>
                                </div>}
                            </div>
                        )}

                        {(item.formatType?.name === "CD" || item.formatType?.name === "Vinyle" || item.formatType?.name === "K7") && (
                            <div className="item__section">
                                <h3 className="item__section-title">Informations Musique</h3>
                                {item.album && <div className="item__detail">
                                    <span className="item__detail-label">Album:</span>
                                    <span className="item__detail-value">{item.album}</span>
                                </div>}
                                {item.artist && <div className="item__detail">
                                    <span className="item__detail-label">Artiste:</span>
                                    <span className="item__detail-value">{item.artist}</span>
                                </div>}
                                {item.style && <div className="item__detail">
                                    <span className="item__detail-label">Style:</span>
                                    <span className="item__detail-value">{item.style}</span>
                                </div>}
                                {item.audioDuration && <div className="item__detail">
                                    <span className="item__detail-label">Durée audio:</span>
                                    <span className="item__detail-value">{item.audioDuration}</span>
                                </div>}
                                {item.year && <div className="item__detail">
                                    <span className="item__detail-label">Année de sortie:</span>
                                    <span className="item__detail-value">{item.year}</span>
                                </div>}
                            </div>
                        )}

                        {item.formatType?.name === "Comics" && (
                            <div className="item__section">
                                <h3 className="item__section-title">Informations Comics</h3>
                                {item.platform && <div className="item__detail">
                                    <span className="item__detail-label">Éditeur:</span>
                                    <span className="item__detail-value">{item.platform}</span>
                                </div>}
                                {item.gameDeveloper && <div className="item__detail">
                                    <span className="item__detail-label">Auteur:</span>
                                    <span className="item__detail-value">{item.gameDeveloper}</span>
                                </div>}
                                {item.gameEditor && <div className="item__detail">
                                    <span className="item__detail-label">Dessinateur:</span>
                                    <span className="item__detail-value">{item.gameEditor}</span>
                                </div>}
                                {item.genre && <div className="item__detail">
                                    <span className="item__detail-label">Genre:</span>
                                    <span className="item__detail-value">{item.genre}</span>
                                </div>}
                                {item.year && <div className="item__detail">
                                    <span className="item__detail-label">Année de publication:</span>
                                    <span className="item__detail-value">{item.year}</span>
                                </div>}
                            </div>
                        )}

                        {(item.formatType?.name === "Bluray" || item.formatType?.name === "DVD") && (
                            <div className="item__section">
                                <h3 className="item__section-title">Informations Film/Vidéo</h3>
                                {item.director && <div className="item__detail">
                                    <span className="item__detail-label">Réalisateur:</span>
                                    <span className="item__detail-value">{item.director}</span>
                                </div>}
                                {item.videoEditor && <div className="item__detail">
                                    <span className="item__detail-label">Éditeur vidéo:</span>
                                    <span className="item__detail-value">{item.videoEditor}</span>
                                </div>}
                                {item.videoDuration && <div className="item__detail">
                                    <span className="item__detail-label">Durée:</span>
                                    <span className="item__detail-value">{item.videoDuration}</span>
                                </div>}
                                {item.year && <div className="item__detail">
                                    <span className="item__detail-label">Année de sortie:</span>
                                    <span className="item__detail-value">{item.year}</span>
                                </div>}
                            </div>
                        )}
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
            {modalAddingObjectInColectionIsOpen &&
                <div className="modale"><div className="modale__container">
                    <div className="modale__close" onClick={() => {
                        setModalAddingObjectInColectionIsOpen(false)
                    }}>
                        <img src="/img/x.svg" alt="" />
                    </div>
                    <div className="modale__list">
                        {userCollections && userCollections.length > 0 &&
                            userCollections.map((collection: { id: string, title: string, description: string, images: { url: string , status: string}[] }) => (
                                <div className="modale__item">
                                    <input
                                        onClick={(e: any) => handleItem(e)
                                        }
                                        key={collection.id}
                                        type="checkbox"
                                        name=""
                                        id={collection.id}
                                        value={collection.title}
                                        className="modale__checkbox"
                                    />
                                    <img src={`${baseURL}${collection?.images[0].url}`} alt="" className="modale__cover" />
                                    <span className="modale__data" style={{color: "white"}}>{collection.title}</span>
                                </div>
                            ))}

                    </div>
                    <button className="modale__add"
                    /*  onClick={
                        addingItemsToCollection
                    } */>Ajouter à ma collection</button>
                </div>
                </div>
            }
            <div className="item__footer">
                <button onClick={() => { setModalAddingObjectInColectionIsOpen(true) }}><SlHeart /></button>

                {connectedUserId === item.creatorId && <button className="" onClick={() => setOpenModaleDelete(true)}
                ><SlTrash /></button>}
            </div>
        </div >
    )
}

export default ItemPage