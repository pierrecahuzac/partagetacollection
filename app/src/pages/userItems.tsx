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
    const [openModaleDelete, setOpenModaleDelete] = useState<boolean>(false)
    const  {collectionItemId}  = useParams()
    const navigate = useNavigate()
    const [modalAddingObjectInColectionIsOpen, setModalAddingObjectInColectionIsOpen] = useState<boolean>(false)
    const {onError} = useToast()
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
    const [customParams, setCustomParams] = useState({
        purchasePrice: '',
        condition: '',
        notes: ''
    })

    const [userCollections, setUserCollections] = useState<[]>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [connectedUserId, setConnectedUserId] = useState("")
    const [_itemInCollection, setItemInCollection] = useState()
    // const {collectionItemId } = useParams();

   
    useEffect(() => {
        const fetchDatas = async () => {
            try { 
                const response = await axios.get(`${baseURL}/collection-item/${collectionItemId}`, {
                    withCredentials: true
                })
                console.log(response.data.item);
                
                setItem(response.data.item);
                setItemInCollection(response.data.itemInCollection)
            } catch (error) {
                
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
        const fetchAllUserCollections = async () => {
            const response: any = await axios.get(`${baseURL}/collection/user-collection`, {
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
                navigate("/")
            }
        } catch (error) {
       
            onError(`Une errur c'est produite`)
        }
    }

    const openModalImages = () => {
        setModalImagesIsOpen(true);
    }


    const addingItemsToCollection = async () => {
        try {
            // Vérification qu'au moins une collection est sélectionnée
            if (selectedCollection.length === 0) {
                alert("Veuillez sélectionner au moins une collection");
                return;
            }

            // Pour chaque collection sélectionnée, on crée une entrée dans collection-item
            for (const collection of selectedCollection as Array<{ id: string; value: string }>) {
                try {
                    const response = await axios.post(
                        `${baseURL}/api/collection-item`,
                        {
                            createItemId: item.id,
                            userId: connectedUserId,
                            collectionId: collection.id,
                            purchasePrice: customParams.purchasePrice,
                            condition: customParams.condition,
                            notes: customParams.notes,

                        },
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }
                    );

                    if (response.status === 200) {

                    }
                } catch (error) {
                    console.error(`Erreur lors de l'ajout à la collection ${collection.value}:`, error);
                }
            }

            // Réinitialisation des champs après l'ajout
            setModalAddingObjectInColectionIsOpen(false);
            setCustomParams({
                purchasePrice: '',
                condition: '',
                notes: ''
            });
            setSelectedCollection([]);

            // Optionnel : redirection ou message de succès
            alert("Objet(s) ajouté(s) avec succès à la/les collection(s)");

        } catch (error) {
            console.error("Erreur lors de l'ajout de l'objet:", error);
            alert("Une erreur est survenue lors de l'ajout de l'objet");
        }
    };

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

    const handleCustomParams = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomParams(prev => ({
            ...prev,
            [name]: value
        }));
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
                        {item && item?.images && <img className="item__image" src={`${baseURL}/uploads/${item?.images[0]?.url}`} alt="item cover" />}
                    </div>
                    {item?.images?.length !== undefined && item?.images?.length > 1 &&
                        <p className="collection__cover-more" onClick={openModalImages}>voir plus d'images</p>
                    }
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
                <div className="modale">
                    <div className="modale__container">
                        <div className="modale__close" onClick={() => {
                            setModalAddingObjectInColectionIsOpen(false)
                        }}>
                            <img src="/img/x.svg" alt="" />
                        </div>
                        <h2 className="modale__title">Ajouter à une collection</h2>

                        {/* Divs de debug */}
                        <div className="modale__debug">
                            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
                                ID de l'objet: {item.id}
                            </div>
                            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
                                ID de l'utilisateur: {connectedUserId}
                            </div>
                            <div style={{ color: 'white', marginBottom: '0.5rem' }}>
                                Collections sélectionnées: {selectedCollection.map((col: any) => col.id).join(', ')}
                            </div>
                        </div>

                        <div className="modale__custom-params">
                            <h3>Paramètres personnalisés</h3>
                            <div className="modale__input-group">
                                <label htmlFor="purchasePrice">Prix d'achat</label>
                                <input
                                    type="number"
                                    id="purchasePrice"
                                    name="purchasePrice"
                                    value={customParams.purchasePrice}
                                    onChange={handleCustomParams}
                                    placeholder="Prix d'achat"
                                />
                            </div>
                            <div className="modale__input-group">
                                <label htmlFor="condition">État</label>
                                <input
                                    type="text"
                                    id="condition"
                                    name="condition"
                                    value={customParams.condition}
                                    onChange={handleCustomParams}
                                    placeholder="État de l'objet"
                                />
                            </div>
                            <div className="modale__input-group">
                                <label htmlFor="notes">Notes</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={customParams.notes}
                                    onChange={handleCustomParams}
                                    placeholder="Notes personnelles"
                                />
                            </div>
                        </div>

                        <div className="modale__list">
                            <h3>Sélectionner une collection</h3>
                            {userCollections && userCollections.length > 0 &&
                                userCollections.map((collection: { id: string, title: string, description: string, images: { url: string, status: string }[] }, index: number) => (
                                    <div className="modale__item" key={index}>
                                        <input
                                            onClick={(e: any) => handleItem(e)}
                                            type="checkbox"
                                            id={collection.id}
                                            value={collection.title}
                                            className="modale__checkbox"
                                        />
                                        <img src={`${baseURL}${collection?.images[0].url}`} alt="" className="modale__cover" />
                                        <span className="modale__data">{collection.title}</span>
                                    </div>
                                ))}
                        </div>
                        <button className="modale__add"
                            onClick={() => addingItemsToCollection()}>
                            Ajouter à cette collection
                        </button>
                    </div>
                </div>
            }
            <div className="item__footer">
                <button type='button'>Supprimer l'objet de cette collection</button>
            </div>
        </div >
    )
}

export default UserItem