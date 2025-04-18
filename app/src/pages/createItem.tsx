import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import useToast from "../hooks/useToast";

import { NewItemProps } from "../@interface/NewItemProps";

import baseURL from "../utils/baseURL";

import { acceptedFormats } from "../utils/acceptedFormats";
import { CoverProps } from "../@interface/CoverProps";
import { currencies } from "../utils/currencies";
import "../styles/createItem.scss";

const CreateItem = () => {
    const navigate = useNavigate();
    const { onError, onSuccess } = useToast();
    const protocol = import.meta.env.VITE_API_PROTOCOL;
    const domain = import.meta.env.VITE_API_DOMAIN;
    const port = import.meta.env.VITE_API_PORT;
    const [file, setFile] = useState<File | null>(null);
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
        author: "",
        cover: "",
        currency: "",
    });

    const validFileSize = (file: any, maxSize: number) => {
        if (file && !acceptedFormats.includes(file.type)) {
            console.error(
                `Le format de fichier ${file.name} n'est pas accepté. Ignorée.`
            );
            return false;
        }

        if (file.size && file.size > maxSize) {
            console.error(
                `La photo ${file.name} est trop lourde (${file.size} octets). Ignorée.`
            );
            return false;
        }
        return true;
    };
    const handleFilesChange = (file: CoverProps) => {
        try {
            const maxSize = 500000000;
            const fileSizeIsValid = validFileSize(file, maxSize);
            if (fileSizeIsValid === false) {
                onError("Taille de l'image trop grosse");
                return;
            }
            return fileSizeIsValid;
        } catch (error) {
            console.log(error);
        }
    };
    const selectCoverToUpload = (cover: CoverProps) => {
        const response = handleFilesChange(cover);
        if (response === true) {
            setNewItem((prev) => ({ ...prev, cover: cover.name }));
            // @ts-ignore
            setFile(cover);
        }
    };
    useEffect(() => {
        const fetchFormatsTypes = async () => {
            const response = await axios.get(
                `${protocol}://${domain}:${port}/api/format-type`,
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
        fetchFormatsTypes();
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
        console.log(formData);

        if (file) {
            console.log(file);
            //@ts-ignore
            formData.append("cover", file);
        }
        try {
            const response = await axios.post(`${baseURL}/api/item`, formData, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                },
            });
            console.log(response);
            if (response.status === 201) {
                onSuccess("Item crée");
                //navigate('/my-collection')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="create-item">
            <div className="create-item__container">
                <div>
                    <h2 className="">Créer un objet</h2>
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
                    <div className="">
                        <label htmlFor="">Quantité</label>
                        <input
                            type="number"
                            name="quantity"
                            className=""
                            value={newItem.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <div>
                        <label htmlFor="">Prix</label>

                        <input
                            type="text"
                            name="price"
                            className="create-item__price"
                            value={newItem.price}
                            onChange={handleInputChange}
                        />
                        <select
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
                    <div className="">
                        <div className="item__tag" style={{ display: "flex", alignItems:"center"}}>
                            <label htmlFor="">Catégorie(s)</label>
                            {formatsType && formatsType.length ? (

                                <select
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        const formatTypeId = e.target.value;
                                        console.log(formatTypeId);

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
                    <form className="create-item__cover__upload">
                        <label
                            htmlFor="images"
                            className="create-item__cover__upload__label"
                        >
                            Ajouter des images
                            <input
                                type="file"
                                id="images"
                                className="create-item__cover__upload__button"
                                multiple
                                accept={acceptedFormats.join(",")} //@ts-ignore
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const targetFile: any = e.target.files[0];
                                    selectCoverToUpload(targetFile);
                                }}
                            />
                        </label>
                        {file && (
                            <div className="create-item__cover__upload__container">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="create-item-img"
                                />
                            </div>
                        )}
                    </form>
                    <button
                        onClick={(e) => {
                            console.log(newItem);
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
