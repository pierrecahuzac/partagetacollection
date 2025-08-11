import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SlHeart } from "react-icons/sl";
//import { ImHeart } from "react-icons/im";
import { SlTrash } from "react-icons/sl";

import { ItemProps } from "../@interface/ItemProps";
import { SlPencil } from "react-icons/sl";
import Modale from "../components/ui/modale";
import Button from "../components/ui/button";
import Carrousel from "../components/ui/carrousel";
import { currencies } from "../utils/currencies";
import "../styles/item.scss";
import { toast } from "react-toastify";



interface Condition {
    id: string;
    name: string;
    description?: string;
    order?: number;
}

const ItemPage: FC = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [openModaleDelete, setOpenModaleDelete] = useState<boolean>(false);
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [
        modalAddingObjectInColectionIsOpen,
        setModalAddingObjectInColectionIsOpen,
    ] = useState<boolean>(false);
    const [item, setItem] = useState<ItemProps>({
        id: "",
        name: "",
        title: "",
        description: "",
        condition: "",
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
        creatorId: "",
    });
    const [selectedCollection, setSelectedCollection] = useState<Array<{ id: string; value: string }>>([]);
    const [customParams, setCustomParams] = useState({
        purchasePrice: "",
        conditionId: "",
        notes: "",
        currency: "EUR",
    });

    const [userCollections, setUserCollections] = useState<Array<{
        id: string;
        title: string;
        description: string;
        images: Array<{ url: string; status: string }>;
    }>>([]);
    const [modalImagesIsOpen, setModalImagesIsOpen] = useState<boolean>(false);
    const [connectedUserId, setConnectedUserId] = useState<string>("");
    // const [itemInCollection, setItemInCollection] = useState()
    const [conditions, setConditions] = useState<Condition[]>([]);

    useEffect(() => {
        Promise.all([
            fetchUser(),
            fetchDatas(),
            fetchAllUserCollections(),
            fetchAllConditions(),
            //fetchAllStatus()

        ]);
    }, []);
    const fetchDatas = async () => {
        try {
            const response = await axios.get(`${baseURL}/item/${itemId}`, {
                withCredentials: true,
            });

            setItem(response.data.item);

        } catch (error) {
            
        }
    };
    const fetchUser = async () => {
        const getUser: any = await axios.get(`${baseURL}/user`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        setConnectedUserId(getUser.data.user.id);
    };
    const fetchAllUserCollections = async () => {
        const response: any = await axios.get(
            `${baseURL}/collection/user-collection`,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        setUserCollections(response.data.result);
    };
    const fetchAllConditions = async () => {
        const response = await axios.get(`${baseURL}/condition`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });


        setConditions(response.data.conditions);
    };

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`${baseURL}/item/${item.item.id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message)

        }
    };

    const openModalImages = () => {
        setModalImagesIsOpen(true);
    };


    const addingItemsToCollection = async () => {
        try {

            if (selectedCollection.length === 0) {
                alert("Veuillez sélectionner au moins une collection");
                return;
            }

            for (const collection of selectedCollection as Array<{
                id: string;
                value: string;
            }>) {
                try {
                    const response = await axios.post(
                        `${baseURL}/collection-item`,
                        {
                            itemId: item.item.id,
                            userId: connectedUserId,
                            collectionId: collection.id,
                            purchasePrice: customParams.purchasePrice,
                            condition: customParams.conditionId,
                            notes: customParams.notes,
                        },
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        }
                    );
                    if (response.status === 200) {
                        toast.success(
                            `Objet ajouté avec succès à la collection ${collection.value}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `Erreur lors de l'ajout à la collection ${collection.value}`
                    );
                }
            }

            // Réinitialisation des champs après l'ajout
            setModalAddingObjectInColectionIsOpen(false);
            setCustomParams({
                purchasePrice: "",
                conditionId: "",
                notes: "",
                currency: "EUR",
            });
            setSelectedCollection([]);
            toast.success("Objet ajouté avec succès dans la collection")
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
                return prev.filter((item) => item.id !== id);
            }
        });
    };

    const handleCustomParams = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setCustomParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="item">
            {modalImagesIsOpen && (
                <Modale onClose={() => setModalImagesIsOpen(false)}>
                    <Carrousel images={item?.images} />
                </Modale>
            )}
            <div className="item__article">
                <div className="item__cover">
                    <div className="item__image-container">
                        {item ? (
                            <img
                                className="item__image"
                                src={`${item?.images[0]?.url}`}
                                alt="item cover"
                            />
                        ) : "pas d'images"}
                    </div>
                    {item?.images?.length !== undefined && item?.images?.length > 1 && (
                        <p className="collection__cover-more" onClick={openModalImages}>
                            voir plus d'images
                        </p>
                    )}
                </div>
                <div className="item__infos" /* id={item.id} */>
                    <div className="item__modify">
                        <SlPencil />
                    </div>
                    <div className="item__title">{item?.item?.name}</div>
                    <div className="item__description">{item?.item?.description}</div>
                    <div className="item__details">
                        <div className="item__section">
                            {/* <h3 className="item__section-title">Informations générales</h3> */}
                            {item?.item?.barcode && (
                                <div className="item__detail">
                                    <span className="item__detail-label">Code barres:</span>
                                    <span className="item__detail-value">{item?.item?.barcode}</span>
                                </div>
                            )}
                            {item?.isPublic && (
                                <div className="item__detail">
                                    <span className="item__detail-label">Public:</span>
                                    <span className="item__detail-value">
                                        {item?.item?.isPublic ? "Oui" : "Non"}
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Affichage conditionnel selon le formatType.name */}
                        {item?.item?.formatType?.name === "Bande dessinée" && (
                            <div className="item__section">
                                <h3 className="item__section-title">
                                    Informations Bande dessinée
                                </h3>
                                {item?.item?.isbn && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">ISBN:</span>
                                        <span className="item__detail-value">{item?.item?.isbn}</span>
                                    </div>
                                )}
                                {item?.item?.author && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Auteur:</span>
                                        <span className="item__detail-value">{item?.item?.author}</span>
                                    </div>
                                )}
                                {item?.item?.publisher && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Éditeur:</span>
                                        <span className="item__detail-value">{item?.item?.publisher}</span>
                                    </div>
                                )}
                                {item?.item?.language && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Langue:</span>
                                        <span className="item__detail-value">{item?.item?.language}</span>
                                    </div>
                                )}
                                {item?.item?.year && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">
                                            Année de publication:
                                        </span>
                                        <span className="item__detail-value">{item?.item?.year}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {(item?.item?.formatType?.name === "CD" ||
                            item?.item?.formatType?.name === "Vinyle" ||
                            item?.item?.formatType?.name === "K7") && (
                                <div className="item__section">
                                    <h3 className="item__section-title">Informations Musique</h3>
                                    {item?.item?.album && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Album:</span>
                                            <span className="item__detail-value">{item?.item?.album}</span>
                                        </div>
                                    )}
                                    {item?.item?.artist && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Artiste:</span>
                                            <span className="item__detail-value">{item?.item?.artist}</span>
                                        </div>
                                    )}
                                    {item?.item?.style && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Style:</span>
                                            <span className="item__detail-value">{item?.item?.style}</span>
                                        </div>
                                    )}
                                    {item?.item?.audioDuration && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Durée audio:</span>
                                            <span className="item__detail-value">
                                                {item?.item?.audioDuration}
                                            </span>
                                        </div>
                                    )}
                                    {item?.item?.year && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Année de sortie:</span>
                                            <span className="item__detail-value">{item?.item?.year}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                        {item?.item?.formatType?.name === "Comics" && (
                            <div className="item__section">
                                <h3 className="item__section-title">Informations Comics</h3>
                                {item?.item?.platform && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Éditeur:</span>
                                        <span className="item__detail-value">{item?.item?.platform}</span>
                                    </div>
                                )}
                                {item?.item?.gameDeveloper && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Auteur:</span>
                                        <span className="item__detail-value">
                                            {item?.item?.gameDeveloper}
                                        </span>
                                    </div>
                                )}
                                {item?.item?.gameEditor && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Dessinateur:</span>
                                        <span className="item__detail-value">
                                            {item?.item?.gameEditor}
                                        </span>
                                    </div>
                                )}
                                {item?.item?.genre && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">Genre:</span>
                                        <span className="item__detail-value">{item?.item?.genre}</span>
                                    </div>
                                )}
                                {item?.item?.year && (
                                    <div className="item__detail">
                                        <span className="item__detail-label">
                                            Année de publication:
                                        </span>
                                        <span className="item__detail-value">{item?.item?.year}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {(item?.item?.formatType?.name === "Bluray" ||
                            item?.item?.formatType?.name === "DVD") && (
                                <div className="item__section">
                                    <h3 className="item__section-title">Informations Film/Vidéo</h3>
                                    {item?.item?.director && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Réalisateur:</span>
                                            <span className="item__detail-value">{item?.item?.director}</span>
                                        </div>
                                    )}
                                    {item?.item?.videoEditor && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Éditeur vidéo:</span>
                                            <span className="item__detail-value">
                                                {item?.item?.videoEditor}
                                            </span>
                                        </div>
                                    )}
                                    {item?.item?.videoDuration && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Durée:</span>
                                            <span className="item__detail-value">
                                                {item?.item?.videoDuration}
                                            </span>
                                        </div>
                                    )}
                                    {item?.item?.year && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Année de sortie:</span>
                                            <span className="item__detail-value">{item?.item?.year}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                </div>

                {openModaleDelete && (
                    <Modale onClose={() => setOpenModaleDelete(false)}>
                        <p>Voulez-vous supprimer cet objet de votre collection?</p>
                        <p>Attention, ceci est définitif </p>
                        <p>
                            <Button onClick={() => deleteItem()} disabled={false}>
                                Oui!
                            </Button>
                            <Button
                                onClick={() => setOpenModaleDelete(false)}
                                disabled={false}
                            >
                                Non
                            </Button>
                        </p>
                    </Modale>
                )}
            </div>
            {modalAddingObjectInColectionIsOpen && (
                <div className="modale">
                    <div className="modale__container">
                        <div
                            className="modale__close"
                            onClick={() => {
                                setModalAddingObjectInColectionIsOpen(false);
                            }}
                        >
                            <img src="/img/x.svg" alt="" />
                        </div>
                        <h2 className="modale__title">Ajouter à une collection</h2>

                        {/* Divs de debug */}
                        <div className="modale__debug">
                            <div style={{ color: "white", marginBottom: "0.5rem" }}>
                                ID de l'objet: {item.id}
                            </div>
                            <div style={{ color: "white", marginBottom: "0.5rem" }}>
                                ID de l'utilisateur: {connectedUserId}
                            </div>
                            <div style={{ color: "white", marginBottom: "0.5rem" }}>
                                Collections sélectionnées:{" "}
                                {selectedCollection.map((col: any) => col.id).join(", ")}
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
                                <label htmlFor="currency">Currency</label>
                                <select
                                    id="currency"
                                    value={customParams.currency}
                                    name="currency"
                                    onChange={handleCustomParams}
                                >
                                    {currencies && currencies.length ? (
                                        currencies.map((currency: any) => (
                                            <option key={currency.id} value={currency.name}>
                                                {currency.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Aucune catégorie</option>
                                    )}
                                </select>
                            </div>
                            <div className="modale__input-group">
                                <label htmlFor="condition">État</label>
                                <select
                                    id="condition"
                                    name="condition"
                                    value={customParams.conditionId}
                                    onChange={handleCustomParams}
                                >
                                    <option value="">Sélectionner un état</option>
                                    {conditions && conditions?.map((condition) => (
                                        <option key={condition?.id} value={condition?.id}>
                                            {condition?.name?.toLocaleLowerCase().replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
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
                            {userCollections.length === 0 && (
                                <button type="button" className="modale__create-collection">
                                    Créer une collection
                                </button>
                            )}
                            {userCollections &&
                                userCollections.length > 0 &&
                                userCollections.map(
                                    (
                                        collection: {
                                            id: string;
                                            title: string;
                                            description: string;
                                            images: { url: string; status: string }[];
                                        },
                                        index: number
                                    ) => (
                                        <div className="modale__item" key={index}>
                                            <input
                                                onClick={(e: any) => handleItem(e)}
                                                type="checkbox"
                                                id={collection.id}
                                                value={collection.title}
                                                className="modale__checkbox"
                                            />
                                            <img
                                                src={`${baseURL}${collection?.images[0]?.url}`}
                                                alt=""
                                                className="modale__cover"
                                            />
                                            <span className="modale__data">{collection.title}</span>
                                        </div>
                                    )
                                )}
                        </div>

                        <button
                            className="modale__add"
                            onClick={() => addingItemsToCollection()}
                        >
                            Ajouter à cette collection
                        </button>
                    </div>
                </div>
            )}
            <div className="item__footer">
                <button
                    onClick={() => {
                        setModalAddingObjectInColectionIsOpen(true);
                    }}
                >
                    <SlHeart />
                </button>
                {connectedUserId === item.creatorId && (
                    <button className="" onClick={() => setOpenModaleDelete(true)}>
                        <SlTrash />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemPage;
