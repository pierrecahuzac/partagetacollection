import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import CollectionProps from "../@interface/CollectionProps";
import { handleDeleteItemFromCollection } from '../utils/itemService';
import Carrousel from '../components/ui/carrousel'
import useToast from "../hooks/useToast";
import Modale from "../components/ui/modale";
import Button from "../components/ui/button";

import '../styles/collection.scss';
import { acceptedFormats } from "../utils/acceptedFormats";

const Collection = () => {
    const { collectionId } = useParams<string>();
    const { onSuccess, onError } = useToast()
    const baseURL = import.meta.env.VITE_BASE_URL

    const [collection, setCollection] = useState<CollectionProps>()
    const [isUpdateCollection, setIsUpdateCollection] = useState<boolean>(false)
    const [modalAddingObjectIsOpen, setModalAddingObjectIsOpen] = useState<boolean>(false);
    const [allItems, setAllItems] = useState<[]>([])
    const [selectedItems, setSelectedItems] = useState<[]>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [deleteCollectionModale, setDeleteCollectionModale] = useState<boolean>(false);
    const [_addPhotosToExistantNewCollection, setAddPhotosToExistantNewCollection] = useState<[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchCollection()
    }, [modalAddingObjectIsOpen])
    const fetchCollection = async () => {
        try {
            const response = await axios.get(`${baseURL}/collection/user-collection/${collectionId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setCollection(response.data.result)
        } catch (error) {

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

            }
        }
    }, [modalAddingObjectIsOpen])
    const fetchAllItems = async () => {
        const response = await axios.get(`${baseURL}/item`,
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
            const response = await axios.patch(`${baseURL}/collection/${collectionId}/items`, {
                itemsToAdd: selectedItems.map((item: { id: string }) => item.id),
            }, {
                withCredentials: true
            })
            setCollection(response.data.result.updatedCollection)
            setModalAddingObjectIsOpen(false)
        } catch (error) {

        }
    }

    const handleDeleteCollection = async () => {
        try {
            const response = await axios.delete(`${baseURL}/collection/${collectionId}/delete`, {
                withCredentials: true
            })
            if (response.status !== 200) {
                onError(response.data.message)
            }
            onSuccess("Collection supprimée avec succès")
            navigate(-1)
        } catch (error) {

        }
    }
    const deleteItemFormCollection = async (collectionItemId: string, collectionId: string): Promise<void> => {
        try {
            await handleDeleteItemFromCollection(collectionItemId, collectionId);
            await fetchCollection()
        } catch (error) {

        }
    }
    const openModalImages = () => {

        setModalImagesIsOpen(true); // On ouvre toujours la modale
    }
    const openDeleteCollectionModale = () => {
        setDeleteCollectionModale(true)
    }
    const handleFilesChange = (files: File[]): File[] => {
        const maxSize = 500000000;
        const validFiles = files.filter((file) => {
            const isValidType = acceptedFormats.includes(file.type);
            const isValidSize = file.size <= maxSize;

            if (!isValidType) {
                console.error(`Format invalide pour le fichier : ${file.name}`);
            }
            if (!isValidSize) {
                console.error(`Taille excessive pour le fichier : ${file.name}`);
            }

            return isValidType && isValidSize;
        });

        if (validFiles.length < files.length) {
            onError("Certains fichiers ont été ignorés (format ou taille invalide)");
        }

        return validFiles;
    };

    const selectCoverToUpload = (covers: File[]) => {
        const validFiles = handleFilesChange(covers);
        if (validFiles.length > 0) {
            // @ts-ignore
            setFiles((prev: File[]) => [...prev, ...validFiles]);
            setAddPhotosToExistantNewCollection((prevCollection: any) => ({
                ...prevCollection,
                cover: [...prevCollection.cover, ...validFiles.map(file => file.name)]
            }));
        }
    };


    return (
        <div className="collection">

            {modalImagesIsOpen &&
                <Modale onClose={() => setModalImagesIsOpen(false)}>
                    <Carrousel images={collection?.images} />
                </Modale>
            }
            {modalAddingObjectIsOpen &&
                <div className="modale">
                    <div className="modale__container">
                        <div className="modale__close" onClick={() => setModalAddingObjectIsOpen(false)}>
                            <img src="/img/x.svg" alt="" />
                        </div>
                        <div className="modale__list">
                            {allItems && allItems.length > 0 &&
                                allItems.map((item: { id: string, name: string, description: string, images: { url: string }[] }) => (
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
                                        <img src={item?.images[0]?.url} alt="" className="modale__cover" />
                                        <span className="modale__data">{item.name} - {item.description}</span>
                                    </div>
                                ))}

                        </div>
                        <button className="modale__add" onClick={
                            addingItemsToCollection
                        }>Ajouter à cette collection</button>
                    </div>
                </div>
            }
            {deleteCollectionModale &&
                <Modale onClose={() => setDeleteCollectionModale(false)}>
                    <p>Voulez-vous supprimer cette collection?</p>
                    <p>Attention, ceci est définitif</p>
                    <p>
                        <Button className="collection__delete" type="button" disabled={false} onClick={() => handleDeleteCollection()}>{"Oui!"}</Button>
                        <Button className="" type="button" disabled={false} onClick={() => setDeleteCollectionModale(false)}>Non</Button>
                    </p>
                </Modale>}
            <div className="collection__container">
                {/* <h1>Collection {collection?.title}</h1> */}
                <div className="collection__buttons" >
                    <button onClick={() => openAddingObjectToCollection
                        //@ts-ignore 
                        (!modalAddingObjectIsOpen)} className="collection__button-add">
                        Ajouter un objet
                    </button>
                    {/* <button onClick={() => navigate("/create-item")} className="collection__button-add collection__button-create">
                        Créer un objet
                    </button> */}
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
                                            src={image.url}
                                            alt="collection cover"
                                        />
                                    ))
                                }
                                {collection?.images?.length !== undefined && collection?.images?.length > 1 &&
                                    <p className="collection__cover-more" onClick={openModalImages}>voir plus d'images</p>
                                }
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
                                    <label htmlFor="images" className="create-collection__element-label">
                                        {/*  Ajouter des images dans la colelction existante */}
                                        <input
                                            className="create-collection__element-input"
                                            type="file"
                                            id="images"
                                            multiple
                                            accept={acceptedFormats.join(",")}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files && e.target.files.length) {
                                                    const filesArray = Array.from(e.target.files);
                                                    selectCoverToUpload(filesArray);
                                                }
                                            }}
                                        />
                                    </label>
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
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}><button onClick={(e) => handleUpdateCollection(e)} className="collection__button-validate"
                                        >
                                                Modifier
                                            </button></div>

                                    </div>
                                </>
                            }
                        </div>

                        <div className="collection__list">
                            {collection?.collectionItems?.map((collectionItem: any) => {
                                return (
                                    <div
                                        key={collectionItem.id}
                                        data-id={collectionItem.id}
                                        className="collection__item"
                                        // Navigue vers la page de collection-item (on ne veux aps l'item generique mais celui ajouté dans la collection )
                                        onClick={() => {
                                            navigate(`/my-item/${collectionItem.id}`)
                                        }
                                        }
                                    //  onClick={() => navigate(`/item/${item.id}`)}
                                    >
                                        {
                                            collectionItem.item.images ? (
                                                <img
                                                    className="collection__item__cover"
                                                    src={`${collectionItem.item.images[0].url}`}
                                                    alt="cover de l'item"
                                                />
                                            ) : (
                                                <div className="collection__item__cover collection__item__cover--placeholder">
                                                    Pas d’image
                                                </div>
                                            )
                                        }
                                        < div className="collection__item__datas" >
                                            <div className="collection__item__name">{collectionItem.name}</div>
                                            <div className="collection__item__description">{collectionItem.description}</div>
                                            <div className="collection__item__price">{collectionItem.pricePaid}€</div>
                                            <div className="collection__item__status">{collectionItem.status}</div>
                                        </div>
                                        <div
                                            className="collection__item__delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteItemFormCollection(collectionItem.id, collection.id);
                                            }}
                                        >
                                            X
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                }
                <div className="collection__cta">
                    <button type="button" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openDeleteCollectionModale()
                    }} className="collection__delete">Supprimer la collection
                    </button>
                </div>

            </div >
        </div >
    )
}

export default Collection