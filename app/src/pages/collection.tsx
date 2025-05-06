import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import CollectionProps from "../@interface/CollectionProps";
import { handleDeleteItemFromCollection } from '../utils/itemService';
import Carrousel from '../components/carrousel'
import useToast from "../hooks/useToast";
import Modale from "../components/modale";

import '../styles/collection.scss';


const Collection = () => {
    const { collectionId } = useParams<string>();
    const { onSuccess, onError } = useToast()
    const baseURL = import.meta.env.VITE_BASE_URL
    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL
    const [collection, setCollection] = useState<CollectionProps>()
    const [isUpdateCollection, setIsUpdateCollection] = useState<boolean>(false)
    const [modalAddingObjectIsOpen, setModalAddingObjectIsOpen] = useState<boolean>(false);
    const [allItems, setAllItems] = useState<[]>([])
    const [selectedItems, setSelectedItems] = useState<[]>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    useEffect(() => {
        fetchStatus()
        fetchCollection()
    }, [modalAddingObjectIsOpen])
    const fetchCollection = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/collection/${collectionId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setCollection(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchStatus = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/collection/${collectionId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setCollection(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateCollection = (e: any) => {
        e.preventDefault()
        setIsUpdateCollection(!isUpdateCollection)
    }

    const openAddingObjectToCollection = (): void => {
        setModalAddingObjectIsOpen(!modalAddingObjectIsOpen)
    }

    useEffect(() => {
        if (modalAddingObjectIsOpen === true) {
            try {

                fetchAllItems()
            } catch (error) {
                console.log(error);
            }
        }
    }, [modalAddingObjectIsOpen])
    const fetchAllItems = async () => {
        const response = await axios.get(`${baseURL}/api/item`,
            {
                withCredentials: true,
            }
        )
        setAllItems(response.data)
    }
    const handleItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value, checked } = e.target;
        setSelectedItems((prev: any) => {
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

    const addingItemsToCollection = async (): Promise<void> => {
        try {
            const response = await axios.patch(`${baseURL}/api/collection/${collectionId}/items`, {
                itemsToAdd: selectedItems.map((item: { id: string }) => item.id),
            }, {
                withCredentials: true
            })
            setCollection(response.data.result.updatedCollection)
            setModalAddingObjectIsOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteCollection = async (e: any): Promise<void> => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${baseURL}/api/collection/${collectionId}`, {
                withCredentials: true
            })
            console.log(response);
            if (response.status !== 200) {
                onError(response.data.message)
            }
            onSuccess("Collection supprimée avec succès")
            navigate(-1)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteItemFormCollection = async (collectionItemId: string, collectionId: string): Promise<void> => {
        try {
            await handleDeleteItemFromCollection(collectionItemId, collectionId);
            await fetchCollection()
        } catch (error) {
            console.log(error);
        }
    }
    const openModalImages = () => {
        console.log("couocu");
        setModalImagesIsOpen(true); // On ouvre toujours la modale
    }

    
        return (
        <div className="collection">            
            {modalImagesIsOpen &&
                <Modale onClose={() => setModalImagesIsOpen(false)}>                    
                    <Carrousel images={collection?.images}/>
                </Modale>
            }
            {modalAddingObjectIsOpen &&
                <div className="modale"><div className="modale__container">
                    <div className="modale__close" onClick={() => setModalAddingObjectIsOpen(false)}>
                        <img src="/img/x.svg" alt="" />
                    </div>
                    <div className="modale__list">
                        {allItems && allItems.length > 0 &&
                            allItems.map((item: { id: string, name: string, description: string, cover: string }) => (
                                <div className="modale__item">
                                    <input
                                        onClick={(e: any) => handleItem(e)
                                        }
                                        key={item.id}
                                        type="checkbox"
                                        name=""
                                        id={item.id}
                                        value={item.name}
                                        className="modale__checkbox"
                                    />
                                    <img src={`${baseURL}/uploads/${item?.cover}`} alt="" className="modale__cover" />
                                    <span className="modale__data">{item.name} - {item.description}</span>
                                </div>
                            ))}

                    </div>
                    <button /* disabled={selectedItems.length < 1} */ className="modale__add" onClick={
                        addingItemsToCollection
                    }>Ajouter à ma collection</button>
                </div>
                </div>
            }
            <div className="collection__container">
                <div className="collection__buttons" >
                    <button onClick={() => openAddingObjectToCollection
                        //@ts-ignore 
                        (!modalAddingObjectIsOpen)} className="collection__button-add">
                        Ajouter un objet
                    </button>
                    <button onClick={() => navigate("/create-item")} className="collection__button-add collection__button-create">
                        Créer un objet
                    </button>
                </div>
                {collection &&
                    <>
                        <div className="collection__info">
                            <div className="collection__cover">
                                {collection.images
                                    ?.filter((image: {
                                        isCover: boolean,
                                        url?: string,
                                        id?: string
                                    }) => image.isCover === true)
                                    .map((image: {
                                        isCover?: boolean,
                                        url: string,
                                        id: string
                                    }) => (
                                        <img
                                            key={image.id}
                                            className="collection__cover-img"
                                            src={`${baseImageUrl}/${image.url.replace(/^\/+/, '')}`}
                                            alt="collection cover"
                                        />
                                    ))
                                } <div className="collection__cover-more" onClick={openModalImages}>voir plus d'images</div>
                            </div>

                            {isUpdateCollection ?
                                <div className="collection__item__data">
                                    <input type="text" value={collection.title} className="collection__item__title" />
                                    <select name="" id="" className="collection__item__status">
                                        <option value="">Publique</option>
                                        <option value="">Privée</option>
                                    </select>
                                    <input type="text" value={collection.description} className="collection__item__description" />
                                    <input type="text" value={new Date(collection.startedAt).toLocaleDateString("fr-FR")} className="collection__item__startedAt" />
                                    <button onClick={(e) => handleUpdateCollection(e)} className="collection__button-modify"
                                    >
                                        Valider</button></div>
                                :
                                <>
                                    <div className="collection__item__data">
                                        <div className="collection__item__title">Titre : {collection.title}</div>
                                        <div className="collection__item__status">Visibilité : {collection.isPublic ? "Publique" : "Privée"}
                                        </div>
                                        <div className="collection__item__description">Description : {collection.description}</div>
                                        <div className="collection__item__startedAt">Commencé le  : {new Date(collection.startedAt).toLocaleDateString("fr-FR")}</div>
                                        <button onClick={(e) => handleUpdateCollection(e)} className="collection__button-validate"
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                        <h2>Mes objets dans la collection</h2>
                        <div className="collection__list">
                            {collection?.items?.map((collectionItem: any) => {
                                const item = collectionItem.item;
                                const collectionItemId = collectionItem.id;
                                const collectionId = collection.id;

                                return (

                                    <div
                                        key={collectionItem.id}
                                        data-id={collectionItemId}

                                        className="collection__item"
                                        onClick={() => navigate(`/item/${item.id}`)} // Navigue vers la page de l'item
                                    >
                                        {item.cover ? (
                                            <img
                                                className="collection__item__cover"
                                                src={`${baseImageUrl}/uploads/${item.cover.replace(/^\/+/, '')}`}
                                                alt="cover de l'item"
                                            />
                                        ) : (
                                            <div className="collection__item__cover collection__item__cover--placeholder">
                                                Pas d’image
                                            </div>
                                        )}
                                        <div
                                            className="collection__item__delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteItemFormCollection(collectionItemId,
                                                    //     //@ts-ignore
                                                    collectionId);
                                            }}
                                        >
                                            Supprimer
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                }
                <div className="collection__cta"><button type="button" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteCollection(e)
                }} className="collection__delete">Supprimer la collection</button></div>

            </div>
        </div>
    )
}

export default Collection