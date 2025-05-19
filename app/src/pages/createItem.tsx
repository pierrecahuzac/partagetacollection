import { useEffect, useState } from "react";
import axios from "axios";

import useToast from "../hooks/useToast";

import { NewItemProps } from "../@interface/NewItemProps";

import { acceptedFormats } from "../utils/acceptedFormats";
import { currencies } from "../utils/currencies";

import "../styles/createItem.scss";
import { useNavigate } from "react-router";


const CreateItem = () => {
    const { onError, onSuccess } = useToast();
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [file, setFile] = useState<File[] | []>([]);
    const [formatsType, setFormatsType] = useState([]);
    const [userCollections, setUserCollections] = useState([])
    const [newItem, setNewItem] = useState<NewItemProps>({
        name: "",
        description: "",
        formatType: "",
        formatTypeId: "",
        isPublic: false,
        quantity: 0,
        price: 0,
        artist: "",
        author: "",
        cover: [],
        currency: "EUR",
        barcode: "",
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
            console.log('validFiles:', validFiles, 'covers:', covers);

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
        const fetchUserCollections = async () => {
            const response = await axios.get(
                `${baseURL}/api/collection`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            setUserCollections(response.data.result);
        }
        const fetchFormatsTypes = async () => {
            const response = await axios.get(
                `${baseURL}/api/format-type`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            setFormatsType(response.data);
        };
        Promise.all([
            fetchFormatsTypes(),
            fetchUserCollections()
        ]).then(() => {
            console.log("done");
        })
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewItem((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const submitItem = async (e: any) => {
        e.preventDefault();
        if (!newItem.name || !newItem.description) {
            return;
        }
        // Création de FormData
        const formData = new FormData();
        // Convertir en JSON
        formData.append("newItem", JSON.stringify(newItem));

        if (file && file.length > 0) {
            file.forEach((f: any) => {
                formData.append("files", f); // attention au nom côté back !
            });
        }
        try {
            const response = await axios.post(`${baseURL}/api/item`,
                formData, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                },
            });
            if (response.status === 201) {
                onSuccess("Item crée");
                navigate('/homepage')
            }
        } catch (error) {
            console.log(error);
        }
    };

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

                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <form action="" className="create-item__form">
                    <div className="">
                        <label className="" htmlFor="">
                            Nom de l'objet
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
                    {(newItem.formatType === "Comics" ||
                        newItem.formatType === "Bande déssinée") && (
                            <div className="">
                                <label className="" htmlFor="">
                                    Auteur(s)
                                </label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="author"
                                    value={newItem.author}
                                    className=""
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
                    {/* <div className="">
                        <label htmlFor="">Quantité</label>
                        <input
                            type="number"
                            name="quantity"
                            className=""
                            value={newItem.quantity}
                            onChange={handleInputChange}
                        />
                    </div> */}
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
                    <div className="create-item__category">
                        <div>
                            <label htmlFor="">Catégorie</label>
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
                        <div>
                            <label htmlFor="">Prix</label>
                            <div>
                                <input
                                    type="text"
                                    name="price"
                                    className="create-item__price"
                                    value={newItem.price}
                                    onChange={handleInputChange}
                                />

                                <select
                                    value={newItem.currency} // 
                                    onChange={(e) =>
                                        setNewItem((prevState) => ({
                                            ...prevState,
                                            currency: e.target.value,
                                        }))
                                    }
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency.id} value={currency.name}>
                                            {currency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="">
                        <div className="item__tag" style={{ display: "flex", alignItems: "center" }}>
                            <label htmlFor="">Catégorie(s)</label>
                            {formatsType && formatsType.length ? (

                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        const formatTypeId = e.target.value;


                                        setNewItem((prevState) => ({
                                            ...prevState,
                                            formatType: selectedValue,
                                            formatTypeId,
                                        }));
                                    }}

                                >
                                    {formatsType.map((format: { id: string; name: string }) => (
                                        <option value={format.id} key={format.id}>
                                            {format.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="">
                        Objet publique?
                        <label className="">
                            <input
                                type="checkbox"
                                name="isPublic"
                                id="isPublic"
                                onChange={(e) =>
                                    setNewItem((prevItem) => ({
                                        ...prevItem,
                                        isPublic: e.target.checked,
                                    }))
                                }
                                value={newItem.isPublic}
                                className=""
                            />
                        </label>
                    </div>

                    Ajouter à la collection :
                    <select
                        name="collectionToAddItem"
                        id="collectionToAddItem"
                        value={newItem.collectionToAddItem}
                        onChange={(e) => setNewItem(prev => ({
                            ...prev,
                            collectionToAddItem: e.target.value
                        }))}
                    >
                        <option value="">Sélectionnez une collection</option>
                        {userCollections && userCollections.map((collection: { id: string, title: string }) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.title}
                            </option>
                        ))}
                    </select>

                    <button disabled={!newItem.name || !newItem.formatTypeId}
                        onClick={(e) => {
                            submitItem(e);
                        }}
                        className="create-item__form__button"
                    >
                        Créer
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateItem;
