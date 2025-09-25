import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import useToast from "../hooks/useToast";

import { NewItemProps } from "../@interface/NewItemProps";

import { acceptedFormats } from "../utils/acceptedFormats";

import { fetchFormatsTypes } from "../utils/fetchDatas";

import "../styles/createItem.scss";

const CreateItem: FC = (): JSX.Element => {
    const { onError, onSuccess } = useToast();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [file, setFile] = useState<File[] | []>([]);
    const [formatsType, setFormatsType] = useState<Array<{ id: string; name: string }>>([]);
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
        country: '',
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
            setFile(prev => [...(prev || []), ...validFiles]);
            const newCover = validFiles.map(file => file.name);
            setNewItem(prev => ({
                ...prev,
                cover: [...(prev?.cover || []), ...newCover]
            }));
        }
    };

    useEffect(() => {
        Promise.all([
            fetchFormatsTypes(baseURL),

        ]).then(([formats]) => {
            setFormatsType(formats);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewItem((prevFormData) => {
            if (name === "formatTypeId") {
                const selectedFormat = formatsType.find((format: { id: string }) => format.id === value);
                return {
                    ...prevFormData,
                    formatTypeId: value,
                    formatType: selectedFormat ? selectedFormat.name : "",
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
                formData.append("files", f);
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
                navigate('/');
            }
        } catch (error) {
            onError("Une erreur est survenue lors de la création de l'objet.");
            console.error(error);
        }
    };

    const isDisabled = newItem.name === "" || !newItem.formatTypeId;

    return (
        <div className="create-item">
            <div className="create-item__container">
                <div className="create-item__cover__upload">
                    <label htmlFor="images" className="create-item__cover__upload__label">
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
                                    <button className="create-item__cover__upload__delete" type="button" onClick={() => {
                                        setFile(prev => prev.filter((_, i) => i !== index));
                                        setNewItem(prev => ({ ...prev, cover: prev.cover.filter((_, i) => i !== index) }));
                                    }}>X</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form action="" className="create-item__form">
                    <div className="create-item__datas">

                        <label htmlFor="">Catégorie <span style={{ color: "red", fontSize: "1.5rem" }}>* </span></label>
                        <select onChange={handleInputChange} name="formatTypeId" value={newItem.formatTypeId} >
                            <option value="" key="default">Choisir</option>
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
                    <div className="create-item__datas" >
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
                    <div className="create-item__datas">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            className=""
                            value={newItem.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="create-item__datas">
                        <label htmlFor="">Pays</label>
                        <input
                            type="text"
                            name="country"
                            className=""
                            value={newItem.country}
                            onChange={handleInputChange}
                        />


                    </div>
                    <div className="create-item__datas">
                        {newItem.formatType === "Billet" ?
                            <><label htmlFor="">Numéro de série</label>
                                <input
                                    type="number"
                                    name="barcode"
                                    className=""
                                    value={newItem.barcode}
                                    onChange={handleInputChange}
                                /></> : <><label htmlFor="">Code barres</label>
                                <input
                                    type="number"
                                    name="barcode"
                                    className=""
                                    value={newItem.barcode}
                                    onChange={handleInputChange}
                                /></>}

                    </div>

                    {/* Musique : Vinyle, CD, K7 */}
                    {(newItem.formatType === "Vinyle" || newItem.formatType === "CD" || newItem.formatType === "K7") && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="artist">Artiste</label>
                                <input type="text" placeholder="Nom de l'artiste" name="artist" value={newItem.artist} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="album">Album</label>
                                <input type="text" placeholder="Nom de l'album" name="album" value={newItem.album} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année</label>
                                <input type="text" placeholder="Année de sortie" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="style">Style musical</label>
                                <input type="text" placeholder="Ex: Rock, Pop, Jazz" name="style" value={newItem.style} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Livres et BD : Comics, Bande dessinée, Livre */}
                    {(newItem.formatType === "Comics" || newItem.formatType === "Bande dessinée" || newItem.formatType === "Livre") && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="author">Auteur(s)</label>
                                <input type="text" placeholder="Auteur(s)" name="author" value={newItem.author} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="publisher">Éditeur</label>
                                <input type="text" placeholder="Nom de l'éditeur" name="publisher" value={newItem.publisher} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="collection">Collection</label>
                                <input type="text" placeholder="Ex: The Walking Dead, Astérix" name="collection" value={newItem.collection} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Films : Bluray, DVD, LaserDisc, Objets de cinéma et de télévision */}
                    {(newItem.formatType === "Bluray" || newItem.formatType === "DVD" || newItem.formatType === "LaserDisc") && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="director">Réalisateur(s)</label>
                                <input type="text" placeholder="Réalisateur(s)" name="director" value={newItem.director} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année de sortie</label>
                                <input type="text" placeholder="Année" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="style">Genre du film</label>
                                <input type="text" placeholder="Ex: Action, Comédie, Drame" name="style" value={newItem.style} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Nouveaux champs pour "Objets de cinéma et de télévision" */}
                    {newItem.formatType === "Objets de cinéma et de télévision" && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="cinematicWork">Titre de l'œuvre</label>
                                <input type="text" placeholder="Ex: Star Wars, Le Seigneur des 
                                Anneaux" name="cinematicWork"
                                    value={newItem.cinematicWork} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="cinematicItemType">Type d'objet</label>
                                <input type="text" placeholder="Ex: Affiche, Prop, Costume"
                                    name="cinematicItemType" value={newItem.cinematicItemType} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année de l'œuvre</label>
                                <input type="text" placeholder="Année de sortie du film/série" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Jeux vidéo */}
                    {newItem.formatType === "Jeux-vidéos" && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="platform">Plateforme(s)</label>
                                <input type="text" placeholder="Ex: PlayStation 5, PC, Switch" name="platform" value={newItem.platform} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="genre">Genre(s)</label>
                                <input type="text" placeholder="Ex: RPG, Aventure, Stratégie" name="genre" value={newItem.genre} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="developer">Développeur</label>
                                <input type="text" placeholder="Nom du studio développeur" name="developer" value={newItem.developer} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="publisher">Éditeur</label>
                                <input type="text" placeholder="Nom de l'éditeur" name="publisher" value={newItem.publisher} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année de sortie</label>
                                <input type="text" placeholder="Année de sortie du jeu" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Pièces, Billets, Timbres */}
                    {(newItem.formatType === "Pièces (monnaie)" || newItem.formatType === "Billet" || newItem.formatType === "Timbre") && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="country">Pays d'origine</label>
                                <input type="text" placeholder="Pays" name="country" value={newItem.country} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année</label>
                                <input type="text" placeholder="Année d'émission ou de frappe" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Figurines */}
                    {newItem.formatType === "Figurines" && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="figurineCharacter">Personnage</label>
                                <input type="text" placeholder="Nom du personnage"
                                    name="figurineCharacter" value={newItem.figurineCharacter} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="figurineBrand">Marque</label>
                                <input type="text" placeholder="Ex: Funko, Neca, Kotobukiya"
                                    name="figurineBrand" value={newItem.figurineBrand} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="collection">Collection</label>
                                <input type="text" placeholder="Nom de la collection" name="collection" value={newItem.collection} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Articles de sport */}
                    {newItem.formatType === "Articles de sport" && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="sportType">Type de sport</label>
                                <input type="text" placeholder="Ex: Football, Basket-ball, Rugby"
                                    name="sportType" value={newItem.sportType} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="sportBrand">Marque</label>
                                <input type="text" placeholder="Ex: Adidas, Nike, Puma"
                                    name="sportBrand" value={newItem.sportBrand} onChange={handleInputChange} />
                            </div>
                        </>
                    )}

                    {/* Cartes postales */}
                    {newItem.formatType === "Cartes postales" && (
                        <>
                            <div className="create-item__datas">
                                <label htmlFor="cardOrigin">Provenance</label>
                                <input type="text" placeholder="Ville, pays" name="cardOrigin" value=
                                    {newItem.cardOrigin} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="cardPublisher">Éditeur</label>
                                <input type="text" placeholder="Nom de l'éditeur"
                                    name="cardPublisher" value={newItem.cardPublisher} onChange={handleInputChange} />
                            </div>
                            <div className="create-item__datas">
                                <label htmlFor="year">Année d'émission</label>
                                <input type="text" placeholder="Année" name="year" value={newItem.year} onChange={handleInputChange} />
                            </div>
                        </>
                    )}
                    <div className="create-item__submit">
                        <button
                            disabled={isDisabled}
                            onClick={submitItem}
                            className={isDisabled ? "create-item__form__button--disabled" : "create-item__form__button"}
                        >
                            Créer
                        </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ color: "red", fontSize: "2rem" }}>*</span> Obligatoire pour créer
                    </div>
                    <div className="create__footer">
                        <p className="create-item__disclaimer" style={{ display: "flex", alignItems: "center" }}>
                            Les objets crées ici sont génériques et réutilsables par la communauté. Il n'y a pas de données personnelles dedans (prix d'achat, état...)
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default CreateItem;