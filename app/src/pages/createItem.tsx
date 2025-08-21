import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useToast from "../hooks/useToast";

import { NewItemProps } from "../@interface/NewItemProps";

import { acceptedFormats } from "../utils/acceptedFormats";

import { fetchFormatsTypes } from "../utils/fetchDatas";

import "../styles/createItem.scss";

const CreateItem = () => {
    const { onError, onSuccess } = useToast();
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [file, setFile] = useState<File[] | []>([]);
    const [formatsType, setFormatsType] = useState([]);
    const [newItem, setNewItem] = useState<NewItemProps>({
        name: "",
        description: "",
        formatType: "",
        formatTypeId: "",
        isPublic: false,
        quantity: 0,
        price: 0,
        artist: "",
        album: "",
        year: "",
        style: "",
        author: "",
        publisher: "",
        collection: "",
        director: "",
        platform: "",
        genre: "",
        developer: "",
        cover: [],
        currency: "EUR",
        barcode: "",
        country: ''
    });

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

    const selectCoverToUpload = (covers: File | File[]) => {
        const files = Array.isArray(covers) ? covers : [covers];
        const validFiles = handleFilesChange(files);

        if (validFiles.length > 0) {

            // Mettre à jour le fichier
            //@ts-ignore
            setFile(prev => [...(prev || []), ...validFiles]);

            // Créer une nouvelle couverture avec les noms des fichiers
            const newCover = validFiles.map(file => file.name);

            // Mettre à jour newItem
            setNewItem(prev => ({
                ...prev,
                cover: [...(prev?.cover || []), ...newCover]
            }));
        }
    };

    useEffect(() => {
        Promise.all([
            fetchFormatsTypes(baseURL),
            //fetchUserCollections(baseURL)
        ]).then(([formats, /* collections */]) => {
            setFormatsType(formats);
            //  setUserCollections(collections);

        })
    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewItem((prevFormData) => {
            if (name === "formatTypeId") {
                // Trouver le nom du format correspondant à l'ID sélectionné
                const selectedFormat = formatsType.find(
                    //@ts-ignore
                    (format) => format.id === value
                );
                return {
                    ...prevFormData,
                    formatTypeId: value,
                    //@ts-ignore
                    formatType: selectedFormat ? selectedFormat.name : "", // Mettre à jour formatType avec le nom
                };
            }
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };
    const submitItem = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("newItem", JSON.stringify(newItem));

        if (file && file.length > 0) {
            file.forEach((f: any) => {
                formData.append("files", f); // attention au nom côté back !
            });
        }
        try {
            const response = await axios.post(`${baseURL}/item/create`,
                formData, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                },
            });


            if (response.status === 201) {
                onSuccess("Item crée");
                navigate('/')
            }
        } catch (error) {

        }
    };
    // les 2 doivent etre rempli pour activer le bouton 
    const isDisabled = newItem.name === "" ||  !newItem.formatTypeId;
    
    
    return (
        <div className="create-item">
            <div className="create-item__container">
                <div className="create-item__cover__upload">
                    <label
                        htmlFor="images"
                        className="create-item__cover__upload__label"
                    >
                        <input
                            className="create-collection__element-input"
                            type="file"
                            id="images"
                            multiple
                            accept={acceptedFormats.join(",")}
                            onChange={(e: any) => {
                                if (e.target.files && e.target.files.length) {
                                    const filesArray: any = Array.from(e.target.files);
                                    selectCoverToUpload(filesArray);
                                }
                            }}
                        />
                    </label>
                    {/* @ts-ignore */}
                    {file && file.length > 0 && (
                        <div className="create-item__cover__upload__container">
                            {/* @ts-ignore */}
                            {file.map((fileItem: File, index: number) => (
                                <div key={index} className="create-item__cover__upload__item">
                                    <img
                                        src={URL.createObjectURL(fileItem)}
                                        alt={fileItem.name}
                                        className="create-item__cover__upload__item-img"
                                    />
                                    <button className="create-item__cover__upload__delete" type="button">X</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <form action="" className="create-item__form">
                    <div className="create-item__category">
                        <div>
                            <label htmlFor="">Catégorie <span style={{ color: "red", fontSize: "1.5rem" }}>* </span></label>
                            <select
                                onChange={handleInputChange}
                                name="formatTypeId"
                                value={newItem.formatTypeId}
                            >
                                {formatsType && formatsType.length ? (
                                    formatsType.map((formatType: any) => (
                                        <option key={formatType.id} value={formatType.id}>
                                            {formatType.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Aucune catégorie</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <label className="" htmlFor="">
                            Nom de l'objet <span style={{ color: "red", fontSize: "1.5rem" }}>* </span>
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="name"
                            value={newItem.name}
                            className=""
                        />
                    </div>


                    {(newItem.formatType === "Vinyle" ||
                        newItem.formatType === "CD" ||
                        newItem.formatType === "K7") && (
                            <div className="">
                                <label className="" htmlFor="">
                                    Artiste
                                </label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="artist"
                                    value={newItem.artist}
                                />
                            </div>
                        )}

                    <div className="">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            className=""
                            value={newItem.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">Pays</label>
                        <input
                            type="text"
                            name="country"
                            className=""
                            value={newItem.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">Code barre</label>
                        <input
                            type="number"
                            name="barcode"
                            className=""

                            value={newItem.barcode}
                            onChange={handleInputChange}
                        />
                    </div>

                    {(newItem.formatType === "CD" || newItem.formatType === "Vinyle" || newItem.formatType === "K7") && (
                        <>
                            <div className="form-group">
                                <label htmlFor="album">Album</label>
                                <input type="text" placeholder="Nom de l'album" name="album" value={newItem.album} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Année</label>
                                <input type="text" placeholder="Année de sortie" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="style">Style musical</label>
                                <input type="text" placeholder="Ex: Rock, Pop, Jazz" name="style" value={newItem.style} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {(newItem.formatType === "Comics" || newItem.formatType === "Bande dessinée" || newItem.formatType === "Manga" || newItem.formatType === "Livre") && (
                        <>
                            <div className="form-group">
                                <label htmlFor="author">Auteur(s)</label>
                                <input type="text" placeholder="Auteur(s)" name="author" value={newItem.author} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="publisher">Éditeur</label>
                                <input type="text" placeholder="Nom de l'éditeur" name="publisher" value={newItem.publisher} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="collection">Collection</label>
                                <input type="text" placeholder="Ex: The Walking Dead, Astérix" name="collection" value={newItem.collection} onChange={handleInputChange} />
                            </div>
                        </>
                    )}




                    {(newItem.formatType === "Bluray" || newItem.formatType === "DVD") && (
                        <>
                            <div className="form-group">
                                <label htmlFor="director">Réalisateur(s)</label>
                                <input type="text" placeholder="Réalisateur(s)" name="director" value={newItem.director} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="year">Année de sortie</label>
                                <input type="text" placeholder="Année" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="style">Genre du film</label>
                                <input type="text" placeholder="Ex: Action, Comédie, Drame" name="style" value={newItem.style} onChange={handleInputChange} />
                            </div>
                        </>
                    )}


                    {newItem.formatType === "Jeu vidéo" && (
                        <>
                            <div className="form-group">
                                <label htmlFor="platform">Plateforme(s)</label>
                                <input type="text" placeholder="Ex: PlayStation 5, PC, Switch" name="platform" value={newItem.platform} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Genre(s)</label>
                                <input type="text" placeholder="Ex: RPG, Aventure, Stratégie" name="genre" value={newItem.genre} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="developer">Développeur</label>
                                <input type="text" placeholder="Nom du studio développeur" name="developer" value={newItem.developer} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="publisher">Éditeur</label>
                                <input type="text" placeholder="Nom de l'éditeur" name="publisher" value={newItem.publisher} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Année de sortie</label>
                                <input type="text" placeholder="Année de sortie du jeu" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                        </>
                    )}
                    <button
                        disabled={isDisabled}
                        onClick={(e) => {
                            submitItem(e);
                        }}
                        className={isDisabled ? "create-item__form__button--disabled" : "create-item__form__button"}
                    >
                        Créer
                    </button>
                    <div style={{ display: "flex", alignItems: "center" }}> <span style={{ color: "red", fontSize: "2rem" }}>*</span> Obligatoire pour créer</div>
                </form>
            </div>
        </div>
    );
};

export default CreateItem;
