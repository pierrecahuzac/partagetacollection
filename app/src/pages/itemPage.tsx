import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { SlHeart } from "react-icons/sl";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";
import { SlPencil } from "react-icons/sl";

import Modale from "../components/ui/modale";
import Button from "../components/ui/button";
import Carrousel from "../components/ui/carrousel";
import { currencies } from "../utils/currencies";

import ConditionProps from "../@interface/ConditionProps";
import ItemProps from "../@interface/ItemProps";

import { fetchAllConditions, fetchAllUserCollections, fetchUser } from "../utils/fetchDatas";
import useToast from "../hooks/useToast";


import "../styles/item.scss";

const ItemPage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [openModaleDelete, setOpenModaleDelete] = useState<boolean>(false);
    const { onSuccess, onError } = useToast();
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [
        modalAddingObjectInColectionIsOpen,
        setModalAddingObjectInColectionIsOpen,
    ] = useState<boolean>(false);
    const [modifyItem, setModifyItem] = useState<boolean>(false)
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
        isPublic: false,
        videoDuration: "",
        formatTypeId: "",
        publisher: "",
        style: "",
        year: "",
        collections: "",
        creatorId: "",
        likes: []
    });

    const [selectedCollection, setSelectedCollection] = useState<Array<{ id: string; value: string }>>([]);
    const [customParams, setCustomParams] = useState({
        purchasePrice: "",
        conditionId: "",
        conditionName: "",
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
    const [connectedUserId, setConnectedUserId] = useState<{
        userId: string,
        role: string
    }>({
        userId: "",
        role: ""
    });
    const [_isLoading, setIsloading] = useState<boolean>(false)
    const [conditions, setConditions] = useState<ConditionProps[]>([]);
    const [modifyItemToUpdate, setModifyItemToUpdate] = useState({
        name: "",
        description: ""

    })

    const fetchDatas = async (): Promise<void> => {
        try {
            const response = await axios.get(`${baseURL}/item/${itemId}`, {
                withCredentials: true,
            });
            const newItem = {
                ...response.data.item.item,
                images: response.data.item.images,
                likes: response.data.item.likes
            }


            setItem(newItem);
        } catch (error) {
            throw Error()
        }
    };

    useEffect(() => {
        Promise.all([
            fetchUser(setConnectedUserId),
            fetchDatas(),
            fetchAllUserCollections(setUserCollections),
            fetchAllConditions(setConditions),
        ]);
    }, []);

    const deleteItem = async (): Promise<void> => {
        try {
            const response = await axios.delete(`${baseURL}/item/${item.id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erreur inconnue");
            }
        }
    };

    const openModalImages = () => {
        setModalImagesIsOpen(true);
    };

    const addingItemsToCollection = async (): Promise<void> => {
        try {
            for (const collection of selectedCollection as Array<{
                id: string;
                value: string;
            }>) {

                const response = await axios.post(
                    `${baseURL}/collection-item`,
                    {
                        itemId: item.id,
                        userId: connectedUserId.userId,
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
                setModalAddingObjectInColectionIsOpen(false);
                setCustomParams({
                    purchasePrice: "",
                    conditionId: "",
                    conditionName: "",
                    notes: "",
                    currency: "EUR",
                });
                setSelectedCollection([]);
            }
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
                return prev.filter((item: ItemProps) => item.id !== id);
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

    const report = async () => {
        try {
            await axios.post(`${baseURL}/mail`, {
                // to: 'cahuzac.p@gmail.com',
                // from: "admin@partagetacollection.eu",
                subject: "Objet signalé par un utilisateur",
                text: `L'objet ${item.name} avec l'id ${item.id} vient d'être signalé par un utilisateur`,
                html: `<div>L'objet ${item.name} avec l'id ${item.id} vient d'être signalé par un utilisateur <div>`,
            },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
            onSuccess("Mail envoyé avec succès")
        } catch (error) {
            onError("Une erreur c'est produite")
            console.log(error);

        }
    }
    const openModifyItem = () => {
        setModifyItem(!modifyItem)

    }
    const modifyInputItemToUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;


        setModifyItemToUpdate(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const submitModifiedItemDatas = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        setIsloading(true)
        e.preventDefault()
        try {
            const response = await axios.put(`${baseURL}/item/${item.id}`, {
                name: modifyItemToUpdate.name,
                description: modifyItemToUpdate.description
            }, {
                withCredentials: true,
            })
            if (response.status !== 200) {
                toast.error("Une erreur c'est produite pendant la modification de l'objet")
            }
            toast.success(`Les modifications de l'objet ont bien été mise à jour`)
            setModifyItem(false);
            setIsloading(false);
        } catch (error) {
            console.log(error);
            toast.error("Une erreur c'est produite pendant la modification de l'objet")
            setIsloading(false)
        }
        finally {
            setIsloading(false)
        }
    }

    const addToFavorites = async (itemId = item.id) => {
        try {
            const response = await axios.post(
                `${baseURL}/item/${itemId}/favorites`,
                { itemId },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const { message } = response.data;
                if (message === "Retiré des favoris") {
                    onError(message);
                    await fetchDatas();
                    return
                }
                onSuccess(message);
                await fetchDatas();
            }

        } catch (error) {
            console.error("Erreur favoris:", error);
            onError("Une erreur est survenue");
        }
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
                        {item?.images && item?.images?.length > 0 ? (
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

                <div className="item__infos" >
                    {(connectedUserId.userId === item?.creatorId || connectedUserId.role === "ADMIN") && (
                        <div className="item__modify" onClick={openModifyItem}>
                            <SlPencil style={{ cursor: 'pointer' }} />
                        </div>
                    )}
                    {modifyItem ? <>
                        <form action="submit">
                            <label htmlFor="item_title" >Nom
                                <input type="text" className="item__title" name='name' value={modifyItemToUpdate.name} onChange={e => modifyInputItemToUpdate(e)} />
                            </label>
                            <label htmlFor="item_title" >Description
                                <input type="text" className="item__description" name='description' value={modifyItemToUpdate.description} onChange={e => modifyInputItemToUpdate(e)} />
                            </label>
                            <div className="item__details">
                                <div className="item__section">

                                    {item?.barcode && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Code barres:</span>
                                            <span className="item__detail-value">{item?.barcode}</span>
                                        </div>
                                    )}
                                    {item?.isPublic && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Public:</span>
                                            <span className="item__detail-value">
                                                {item?.isPublic ? "Oui" : "Non"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Affichage conditionnel selon le formatType.name */}
                                {item?.formatType?.name === "Bande dessinée" && (
                                    <div className="item__section">
                                        <h3 className="item__section-title">
                                            Informations Bande dessinée
                                        </h3>
                                        {item?.isbn && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">ISBN:</span>
                                                <span className="item__detail-value">{item?.isbn}</span>
                                            </div>
                                        )}
                                        {item?.author && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Auteur:</span>
                                                <span className="item__detail-value">{item?.author}</span>
                                            </div>
                                        )}
                                        {item?.publisher && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Éditeur:</span>
                                                <span className="item__detail-value">{item?.publisher}</span>
                                            </div>
                                        )}
                                        {item?.language && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Langue:</span>
                                                <span className="item__detail-value">{item?.language}</span>
                                            </div>
                                        )}
                                        {item?.year && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">
                                                    Année de publication:
                                                </span>
                                                <span className="item__detail-value">{item?.year}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(item?.formatType?.name === "CD" ||
                                    item?.formatType?.name === "Vinyle" ||
                                    item?.formatType?.name === "K7") && (
                                        <div className="item__section">
                                            <h3 className="item__section-title">Informations Musique</h3>
                                            {item?.album && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Album:</span>
                                                    <span className="item__detail-value">{item?.album}</span>
                                                </div>
                                            )}
                                            {item?.artist && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Artiste:</span>
                                                    <span className="item__detail-value">{item?.artist}</span>
                                                </div>
                                            )}
                                            {item?.style && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Style:</span>
                                                    <span className="item__detail-value">{item?.style}</span>
                                                </div>
                                            )}
                                            {item?.audioDuration && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Durée audio:</span>
                                                    <span className="item__detail-value">
                                                        {item?.audioDuration}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.year && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Année de sortie:</span>
                                                    <span className="item__detail-value">{item?.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item?.formatType?.name === "Comics" && (
                                    <div className="item__section">
                                        <h3 className="item__section-title">Informations Comics</h3>
                                        {item?.platform && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Éditeur:</span>
                                                <span className="item__detail-value">{item?.platform}</span>
                                            </div>
                                        )}
                                        {item?.gameDeveloper && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Auteur:</span>
                                                <span className="item__detail-value">
                                                    {item?.gameDeveloper}
                                                </span>
                                            </div>
                                        )}
                                        {item?.gameEditor && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Dessinateur:</span>
                                                <span className="item__detail-value">
                                                    {item?.gameEditor}
                                                </span>
                                            </div>
                                        )}
                                        {item?.genre && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Genre:</span>
                                                <span className="item__detail-value">{item?.genre}</span>
                                            </div>
                                        )}
                                        {item?.year && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">
                                                    Année de publication:
                                                </span>
                                                <span className="item__detail-value">{item?.year}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(item?.formatType?.name === "Bluray" ||
                                    item?.formatType?.name === "DVD") && (
                                        <div className="item__section">
                                            <h3 className="item__section-title">Informations Film/Vidéo</h3>
                                            {item?.director && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Réalisateur:</span>
                                                    <span className="item__detail-value">{item?.director}</span>
                                                </div>
                                            )}
                                            {item?.videoEditor && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Éditeur vidéo:</span>
                                                    <span className="item__detail-value">
                                                        {item?.videoEditor}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.videoDuration && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Durée:</span>
                                                    <span className="item__detail-value">
                                                        {item?.videoDuration}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.year && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Année de sortie:</span>
                                                    <span className="item__detail-value">{item?.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>
                            <button type="submit" className="item__modify-button" onClick={e => submitModifiedItemDatas(e)}>
                                Modifier
                            </button>
                            <button type="submit" className="item__modify-button" onClick={() => setModifyItem(false)}>
                                Annuler
                            </button>
                        </form>
                    </>
                        : <>
                            {item.name === item.description ? <div className="item__title">{item?.name}
                            </div> :
                                <>
                                    <div className="item__title">{item?.name}
                                    </div>
                                    <div className="item__description">{item?.description}</div>
                                </>
                            }
                            <div className="item__details">
                                <div className="item__section">

                                    {item?.barcode && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Code barres:</span>
                                            <span className="item__detail-value">{item?.barcode}</span>
                                        </div>
                                    )}
                                    {item?.isPublic && (
                                        <div className="item__detail">
                                            <span className="item__detail-label">Public:</span>
                                            <span className="item__detail-value">
                                                {item?.isPublic ? "Oui" : "Non"}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Affichage conditionnel selon le formatType.name */}
                                {item?.formatType?.name === "Bande dessinée" && (
                                    <div className="item__section">
                                        <h3 className="item__section-title">
                                            Informations Bande dessinée
                                        </h3>
                                        {item?.isbn && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">ISBN:</span>
                                                <span className="item__detail-value">{item?.isbn}</span>
                                            </div>
                                        )}
                                        {item?.author && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Auteur:</span>
                                                <span className="item__detail-value">{item?.author}</span>
                                            </div>
                                        )}
                                        {item?.publisher && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Éditeur:</span>
                                                <span className="item__detail-value">{item?.publisher}</span>
                                            </div>
                                        )}
                                        {item?.language && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Langue:</span>
                                                <span className="item__detail-value">{item?.language}</span>
                                            </div>
                                        )}
                                        {item?.year && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">
                                                    Année de publication:
                                                </span>
                                                <span className="item__detail-value">{item?.year}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(item?.formatType?.name === "CD" ||
                                    item?.formatType?.name === "Vinyle" ||
                                    item?.formatType?.name === "K7") && (
                                        <div className="item__section">
                                            <h3 className="item__section-title">Informations Musique</h3>
                                            {item?.album && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Album:</span>
                                                    <span className="item__detail-value">{item?.album}</span>
                                                </div>
                                            )}
                                            {item?.artist && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Artiste:</span>
                                                    <span className="item__detail-value">{item?.artist}</span>
                                                </div>
                                            )}
                                            {item?.style && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Style:</span>
                                                    <span className="item__detail-value">{item?.style}</span>
                                                </div>
                                            )}
                                            {item?.audioDuration && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Durée audio:</span>
                                                    <span className="item__detail-value">
                                                        {item?.audioDuration}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.year && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Année de sortie:</span>
                                                    <span className="item__detail-value">{item?.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                {item?.formatType?.name === "Comics" && (
                                    <div className="item__section">
                                        <h3 className="item__section-title">Informations Comics</h3>
                                        {item?.platform && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Éditeur:</span>
                                                <span className="item__detail-value">{item?.platform}</span>
                                            </div>
                                        )}
                                        {item?.gameDeveloper && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Auteur:</span>
                                                <span className="item__detail-value">
                                                    {item?.gameDeveloper}
                                                </span>
                                            </div>
                                        )}
                                        {item?.gameEditor && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Dessinateur:</span>
                                                <span className="item__detail-value">
                                                    {item?.gameEditor}
                                                </span>
                                            </div>
                                        )}
                                        {item?.genre && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">Genre:</span>
                                                <span className="item__detail-value">{item?.genre}</span>
                                            </div>
                                        )}
                                        {item?.year && (
                                            <div className="item__detail">
                                                <span className="item__detail-label">
                                                    Année de publication:
                                                </span>
                                                <span className="item__detail-value">{item?.year}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(item?.formatType?.name === "Bluray" ||
                                    item?.formatType?.name === "DVD") && (
                                        <div className="item__section">
                                            <h3 className="item__section-title">Informations Film/Vidéo</h3>
                                            {item?.director && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Réalisateur:</span>
                                                    <span className="item__detail-value">{item?.director}</span>
                                                </div>
                                            )}
                                            {item?.videoEditor && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Éditeur vidéo:</span>
                                                    <span className="item__detail-value">
                                                        {item?.videoEditor}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.videoDuration && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Durée:</span>
                                                    <span className="item__detail-value">
                                                        {item?.videoDuration}
                                                    </span>
                                                </div>
                                            )}
                                            {item?.year && (
                                                <div className="item__detail">
                                                    <span className="item__detail-label">Année de sortie:</span>
                                                    <span className="item__detail-value">{item?.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>
                            <div className="item__footer">
                                <button className="item__footer__add-collection"
                                    onClick={() => {
                                        setModalAddingObjectInColectionIsOpen(true);
                                    }}
                                >
                                    Ajouter à ma collection
                                </button>
                                <button className="item__footer__add-favorites"
                                    onClick={() =>
                                        addToFavorites()}
                                >
                                    {item.likes.length === 0 ? <TbHeart /> : <TbHeartFilled />}
                                    <span>{item.likes && item.likes.length ? item.likes.length : ""}</span>

                                </button>

                                {(connectedUserId.userId === item?.creatorId || connectedUserId.role === "ADMIN") && (
                                    <button className="item__footer__delete-item" onClick={() => setOpenModaleDelete(true)}>
                                        <SlTrash />
                                    </button>
                                )}
                                <button type="button" className="item__footer__add-signal" onClick={() => report()}>
                                    Signaler
                                </button>
                            </div></>}

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

                {modalAddingObjectInColectionIsOpen && (
                    <div className="item__modale">
                        <div className="item__modale__container">
                            <div
                                className="item__modale__close"
                                onClick={() => {
                                    setModalAddingObjectInColectionIsOpen(false);
                                }}
                            >
                                Fermer <img src="/img/x.svg" alt="" />
                            </div>
                            <h1 className="item__modale__title">Choisir la/les collections</h1>

                            <div className="item__modale__list">
                                <h3>Sélectionner une collection</h3>
                                {userCollections.length === 0 && (
                                    <button type="button" className="item__modale__create-collection">
                                        Créer une collection
                                    </button>
                                )}
                                <div className="item__modale__collections">
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
                                                <div className="item__modale__collection" key={index}>
                                                    <input
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItem(e)}
                                                        type="checkbox"
                                                        id={collection.id}
                                                        value={collection.title}
                                                        className="item__modale__checkbox"
                                                    />
                                                    <img
                                                        src={`${collection?.images[0]?.url}`}
                                                        alt=""
                                                        className="item__modale__cover"
                                                    />
                                                    <span className="item__modale__data">{collection.title}</span>
                                                </div>
                                            )
                                        )}
                                </div>
                                <div className="item__modale__custom-params">
                                    <h3>Paramètres personnalisés</h3>
                                    <div className="item__modale__input-group">
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
                                    <div className="item__modale__input-group">
                                        <label htmlFor="currency">Devise</label>
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
                                    <div className="item__modale__input-group">
                                        <label htmlFor="condition">État de l'objet</label>
                                        <select
                                            id="condition"
                                            name="conditionId"
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
                                    <div className="item__modale__input-group">
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

                                <button
                                    className="item__modale__add-collection"
                                    onClick={() => addingItemsToCollection()}
                                >
                                    Ajouter à cette collection
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div >
    );
};

export default ItemPage;
