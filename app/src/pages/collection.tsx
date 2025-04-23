import axios from "axios";
import { useEffect, useState } from "react"
import { Link, Links, useNavigate, useParams } from "react-router";
import CollectionProps from "../@interface/CollectionProps";
import baseURL from "../utils/baseURL";

import '../styles/collection.scss'


const Collection = () => {
    const { collectionId } = useParams();
    const protocol: string = import.meta.env.VITE_API_PROTOCOL;
    const domain: string = import.meta.env.VITE_API_DOMAIN;
    const port: string = import.meta.env.VITE_API_PORT;
    const [collection, setCollection] = useState<CollectionProps>()
    const [isUpdateCollection, setIsUpdateCollection] = useState<boolean>(false)
    const [modalAddingObjectIsOpen, setModalAddingObjectIsOpen] = useState<boolean>(false);
    const [allItems, setAllItems] = useState<[]>([])
    const [selectedItems, setSelectedItems] = useState<[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.get(`${protocol}://${domain}:${port}/api/collection/${collectionId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                console.log(response);

                setCollection(response.data.result)

            } catch (error) {
                console.log(error);
            }
        }
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${protocol}://${domain}:${port}/api/collection/${collectionId}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                console.log(response);

                setCollection(response.data.result)

            } catch (error) {
                console.log(error);
            }
        }
        fetchStatus()
        fetchCollection()
    }, [modalAddingObjectIsOpen])

    const handleUpdateCollection = (e: any) => {
        e.preventDefault()
        setIsUpdateCollection(!isUpdateCollection)
    }

    const openAddingObjectToCollection = (e: any) => {
        console.log(e);
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
    const handleItem = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const addingItemsToCollection = async (e: any) => {
        console.log(e, collectionId);
        try {
            const response = await axios.patch(`${baseURL}/api/collection/${collectionId}/items`, {
                //@ts-ignore
                itemsToAdd: selectedItems.map(item => item.id),
            }, {
                withCredentials: true
            })
            console.log(response);

            setModalAddingObjectIsOpen(false)

        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteItemFromCollection = async (itemId: string) => {
        console.log('je veux supprimer de ma collec');
        try {
            const response = await axios.delete(`${baseURL}/api/collection-item/${itemId}`, {
                withCredentials: true,
                params: {
                    collectionId
                }

            });
            console.log(response);
            if (response.status === 200) {
                // Mise à jour du state local
                setCollection((prevCollection: any) => {
                    if (!prevCollection) return prevCollection;
                    return {
                        ...prevCollection,
                        items: prevCollection.items.filter((collectionItem: any) => collectionItem.item.id !== itemId)
                    };
                });
            }

        } catch (error) {
            console.log(error);

        }

    }
    const handleDeleteCollection = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${baseURL}/api/collection/${collectionId}`, {
                withCredentials: true
            })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="collection">
            <div className="collection__buttons" >
                <button onClick={() => openAddingObjectToCollection(!modalAddingObjectIsOpen)} className="collection__button-add">
                    Ajouter un objet à la collection
                </button>
                <button onClick={() => navigate("/create-item")} className="collection__button-add collection__button-create">
                    Créer un objet
                </button>
            </div>
            {modalAddingObjectIsOpen &&
                <div className="modale__add-list">
                    <div className="modale__add-close" onClick={() => setModalAddingObjectIsOpen(false)}>X</div>
                    {allItems && allItems.length > 0 &&
                        allItems.map((item: { id: string, name: string, description: string }) => (
                            <div className="modale__add-item">
                                <input
                                    onClick={(e: any) => handleItem(e)
                                    }
                                    key={item.id}
                                    type="checkbox"
                                    name=""
                                    id={item.id}
                                    value={item.name}
                                />
                                <span>{item.name} - {item.description}</span>
                            </div>
                        ))}
                    <button /* disabled={selectedItems.length < 1} */ className="modale__add-submit" onClick={(e) => {
                        addingItemsToCollection(e)
                    }}>Ajouter à ma collection</button>
                </div>
            }
            <div className="collection__container">

                {collection &&
                    <>
                        <div className="collection__info">
                            <div className="collection__cover">
                                {collection.cover !== null &&
                                    <img className="collection__img" src={`${protocol}://${domain}:${port}/uploads/${collection?.cover?.replace(/^\/+/, '')}`} alt="collection cover" />
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

                                return (
                                    <div
                                        key={item.id}
                                        className="collection__item"
                                        onClick={() => navigate(`/item/${item.id}`)} // Navigue vers la page de l'item
                                    >
                                        {item.cover ? (
                                            <img
                                                className="collection__item__cover"
                                                src={`${protocol}://${domain}:${port}/uploads/${item.cover.replace(/^\/+/, '')}`}
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
                                                e.stopPropagation(); // ← super important !
                                                handleDeleteItemFromCollection(item.id);
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
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteCollection(e)
            }} className="collection__delete">Supprimer la collection</div>
        </div>
    )
}

export default Collection