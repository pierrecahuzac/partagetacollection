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
import { toast } from "react-toastify";

import '../styles/collection.scss';

const Collection = () => {
    const navigate = useNavigate()
    const { collectionId } = useParams<string>();
    const { onSuccess, onError } = useToast()
    const baseURL = import.meta.env.VITE_BASE_URL

    const [collection, setCollection] = useState<CollectionProps>()
    const [isUpdateCollection, setIsUpdateCollection] = useState<boolean>(false)
    const [modalAddingObjectIsOpen, setModalAddingObjectIsOpen] = useState<boolean>(false);
    const [allItems, setAllItems] = useState<[]>([])
    const [selectedItems, setSelectedItems] = useState<Array<{ id: string; value: string }>>([])
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [deleteCollectionModale, setDeleteCollectionModale] = useState<boolean>(false);
    const [updatePhotosOnExistantCollection, setUpdatePhotosOnExistantCollection] = useState<{ files: File[]; cover: string[] }>({ files: [], cover: [] });
    const [collectionDatasToUpdate, setCollectionDatasToUpdate] = useState<{
        title: string,
        description: string,
        status: string,
        startedAt: string,
        isPublic: boolean
    }>({
        title: '',
        description: '',
        status: '',
        startedAt: "",
        isPublic: false
    })



    useEffect(() => {
        fetchCollection()
    }, [modalAddingObjectIsOpen]);

    useEffect(() => {
        if (collection) {
            setCollectionDatasToUpdate({
                title: collection.title,
                description: collection.description,
                status: collection.status ? collection.status.name : "",
                startedAt: collection.startedAt ? new Date(collection.startedAt).toISOString().split('T')[0] : "",
                isPublic: collection.isPublic
            });
        }
    }, [collection, isUpdateCollection]);

    const fetchCollection = async () => {
        try {
            const response = await axios.get(`${baseURL}/collection/user-collections/${collectionId}`, {
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

    const handleUpdateCollection = async (e: any) => {
        e.preventDefault()
        try {
            console.log(updatePhotosOnExistantCollection);
            

            const response = await axios.patch(`${baseURL}/collection/user-collections/${collectionId}`, {
                ...collectionDatasToUpdate,
                updatePhotosOnExistantCollection,
                startedAt: new Date(collectionDatasToUpdate.startedAt).toISOString()
            }, {
                withCredentials: true
            })
            if (response.status !== 200) {
                toast.error(`
                        Une erreur c'est produite pendant la mise à jour de la collecion`)
            }

            toast.success(`
                La mise à jour de la collection est réussi avec succès`)
            await fetchCollection()
        } catch (error) {
            console.log(error);
            toast.error(`
                Une erreur c'est produite pendant la mise à jour de la collecion`)
        }
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
                return prev.filter((item: { id: string }) => item.id !== id);
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
            setUpdatePhotosOnExistantCollection((prev: { files: File[]; cover: string[] }) => ({
                ...prev,
                files: [...prev.files, ...validFiles],
                cover: [...(prev.cover || []), ...validFiles.map(file => file.name)]
            }));
        }
    };

    const modifyCollection = (): void => {
        setIsUpdateCollection(!isUpdateCollection)
    }

    const updateCollectionDatas = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { value, name } = e.target;
        setCollectionDatasToUpdate((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));

    }
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

            <div className="collection__container">
                {/* <h1>Collection {collection?.title}</h1> */}
                <div className="collection__buttons" >
                    <button onClick={() => openAddingObjectToCollection
                        ()} className="collection__button-add">
                        Ajouter un objet
                    </button>

                    <button onClick={modifyCollection} className="collection__button-validate"
                    >
                        Modifier
                    </button>

                    <button type="button" onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openDeleteCollectionModale()
                    }} className="collection__delete">Supprimer
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
                                <form action="submit" className="collection__form_update">
                                    <div className="collection__item__data">
                                        <input type="text" value={collectionDatasToUpdate.title} name="title" className="collection__item__title" onChange={e => updateCollectionDatas(e)} />
                                        <select name="status" value={collectionDatasToUpdate.status} className="collection__item__status" onChange={e => updateCollectionDatas(e)}>
                                            <option value="PUBLIC">Publique</option>
                                            <option value="PRIVATE">Privée</option>
                                        </select>
                                        <input type="text" value={collectionDatasToUpdate.description} name="description" className="collection__item__description" onChange={e => updateCollectionDatas(e)} />
                                        <input type="date" name="startedAt" value={collectionDatasToUpdate.startedAt} className="collection__item__startedAt" onChange={e => updateCollectionDatas(e)} />
                                        <label htmlFor="images" className="create-collection__element-label">
                                            <input
                                                className="create-collection__element-input"
                                                type="file"
                                                id="images"
                                                multiple
                                                accept={acceptedFormats.join(",")}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.files && e.target.files.length) {
                                                        const filesArray: File[] = Array.from(e.target.files);
                                                        selectCoverToUpload(filesArray);
                                                    }
                                                }}
                                            />
                                        </label>
                                        <button type="submit" onClick={(e) => handleUpdateCollection(e)} className="collection__button-modify"
                                        >
                                            Valider
                                        </button>
                                    </div>
                                </form> :
                                <>
                                    <div className="collection__item__data">
                                        <div className="collection__item__title">Titre: {collection.title}</div>
                                        <div className="collection__item__description">Description: {collection.description}</div>
                                        <div className="collection__item__status">Status: {(collection?.status?.name)?.toLowerCase().replace('_', ' ')}</div>
                                        <div className="collection__item__status">Visibilité: {(collection?.visibility?.name)?.toLowerCase()}</div>
                                        <div className="collection__item__startedAt">Commencé le: {collection.startedAt ? new Date(collection.startedAt).toLocaleDateString("fr-FR") : ""}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="collection__list">
                            {collection?.collectionItems?.map((item: any) => {


                                return (
                                    <div
                                        key={item.id}
                                        data-id={item.id}
                                        className="collection__item"

                                        onClick={() => {
                                            navigate(`/my-item/${item.id}`)
                                        }
                                        }

                                    >
                                        {
                                            item.item.images ? (
                                                <img
                                                    className="collection__item__cover"
                                                    src={`${item.item.images[0].url}`}
                                                    alt="cover de l'item"
                                                />
                                            ) : (
                                                <div className="collection__item__cover collection__item__cover--placeholder">
                                                    Pas d’image
                                                </div>
                                            )
                                        }
                                        < div className="collection__item__datas" >
                                            <div className="collection__item__name" style={{ color: 'white' }}>{item?.item.name}</div>
                                            <div className="collection__item__description" style={{ color: 'white' }}>{item?.item.description}</div>
                                            <div className="collection__item__price" style={{ color: 'white' }}>{item.item.pricePaid}€</div>
                                            <div className="collection__item__status" style={{ color: 'white' }}>{item?.item.status}</div>
                                        </div>
                                        <div
                                            className="collection__item__delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteItemFormCollection(item.id, collection.id);
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


            </div >
            {deleteCollectionModale &&
                <Modale onClose={() => setDeleteCollectionModale(false)}>
                    <p>Voulez-vous supprimer cette collection?</p>
                    <p>Attention, ceci est définitif</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Button
                            className="collection__delete"
                            type="button" disabled={false}
                            onClick={() => handleDeleteCollection()}>
                            Oui!

                        </Button>
                        <Button className="collection__cancel"
                            type="button"
                            disabled={false}
                            onClick={() => setDeleteCollectionModale(false)}>
                            Non

                        </Button>
                    </div>
                    <div style={{
                        color: "grey",
                        fontSize: "12px",
                    }}>* une collection ne peut être supprimée si des objets sont dedans.</div>
                </Modale>}
        </div >
    )
}

export default Collection