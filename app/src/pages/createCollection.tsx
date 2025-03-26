import { useEffect, useState } from "react";

import axios from "axios";

import { NewCollectionProps } from "../@interface/NewCollectionProps";
import { CoverProps } from "../@interface/CoverProps";
import { useNavigate } from "react-router";
import useToast from "../hooks/useToast";
import '../styles/createCollection.scss'
import { acceptedFormats } from "../utils/acceptedFormats";
const CreateCollection = () => {
    const protocol = import.meta.env.VITE_API_PROTOCOL;
    const domain = import.meta.env.VITE_API_DOMAIN;
    const port = import.meta.env.VITE_API_PORT;
    const { onError } = useToast()
    //@ts-ignore 
    const [coverImage, setCoverImage] = useState()
    // const [ssUploadCoverModalOpen, setIsUploadCoverModalOpen] = useState(false);
    const [file, setFile] = useState<CoverProps>()
    const navigate = useNavigate()
    const [modaleIsOpen, setModaleIsOpen] = useState<boolean>(false)

    const [newCollection, setNewCollection] = useState<NewCollectionProps>({
        description: "",
        title: "",
        tags: [],
        isPublic: false,
        cover: "",
        startedAt: ""
    });

  
    const selectCoverToUpload = (cover: CoverProps) => {
        const response = handleFilesChange(cover);
        if (response === true) {
            setNewCollection((prevCollection) => ({ ...prevCollection, cover: cover.name }));

            setFile(cover);
        }
    };

    const handleFilesChange = (file: CoverProps) => {

        try {
            const maxSize = 1000000;
            const fileSizeIsValid = validFileSize(file, maxSize);
            if (fileSizeIsValid === false) {
                onError("Taille de l'image trop grosse")
                return;

            }

            return fileSizeIsValid;
        } catch (error) {
            console.log(error);
        }
    };

    const validFileSize = (
        file: any,
        maxSize: number,
    ) => {

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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewCollection((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitCollection = async (e: any) => {
        e.preventDefault();

        if (!newCollection.title || !newCollection.description) {
            return
        }
        // Création de FormData
        const formData = new FormData();
        formData.append("newCollection", JSON.stringify(newCollection)); // Convertir en JSON
        if (file) {
            //@ts-ignore 
            formData.append("file", file);
        }




        try {

            const response = await axios.post(
                `${protocol}://${domain}:${port}/api/collection`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 201) {
                navigate(`/homepage`)
            }

        } catch (error) {
            console.log(error);
        }
    };
   
    return (
        <div className="create-collection">
            <div className="create-collection__container">
                <div className="create-collection__title">
                    <h2 className="">Créer une collection</h2></div>
                <form action="submit">
                    <div className="">
                        <label className="" htmlFor="">
                            Titre
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="title"
                            value=
                            {newCollection.title}
                            className=""
                        />
                    </div>
                    <div className="">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            className=""

                            value={newCollection.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-10/12 m-auto flex flex-col">
                        <label htmlFor="startedAt">Date de début</label>
                        <input
                            type="date"
                            name="startedAt"
                            className="border-1 border-gray-300 rounded-sm px-4 py-2"

                            value={newCollection.startedAt}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-10/12 m-auto flex">
                        <label htmlFor="">Catégorie(s)</label>

                        
                    </div>
                    <div className="inline-flex items-center">Collection publique?
                        <label className="flex items-center cursor-pointer relative">
                            <input type="checkbox" name="isPublic"
                                id="isPublic"
                                onChange={(e) =>
                                    setNewCollection((prevCollection) => ({
                                        ...prevCollection,
                                        isPublic: e.target.checked,
                                    }))
                                }
                                //@ts-ignore 
                                value={newCollection.isPublic} className="" id="check-custom-style" />
                            <span className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                    </div>

                    <form className="event__form">
                        <label htmlFor="images" className="event__label">
                            Ajouter des images
                            <input
                                className=""
                                type="file"
                                id="images"
                                multiple
                                accept={acceptedFormats.join(",")}     //@ts-ignore 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const targetFile: any = e.target.files[0];

                                    //setFile(targetFile)
                                    selectCoverToUpload(targetFile);

                                }}
                            />
                        </label>

                        <div

                        >
                            {file && (
                                <button
                                    className="event__button"
                                    type="button"

                                >
                                    Partager les images
                                </button>
                            )}
                            <div className="event__files-section">
                                {file &&

                                    <div /* key={index} */ className="img-div">
                                        <img     //@ts-ignore 
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="image"
                                        />
                                        <div className="middle">
                                            <button
                                                type="button"
                                                className="event__delete-button"
                                            // onClick={() => deleteImageFromFiles(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* Modale */}
                    </form>
                    {/* {modaleIsOpen && <div className="">
                        <div>Modale</div>
                        <div onClick={() => setModaleIsOpen(false)}>X</div>
                        <input
                            type="file"
                            id="coverCollection"
                            accept={acceptedFormats.join(",")}
                            onChange={(e) => {
                                //@ts-ignore
                                const targetFile: any = e.target.files[0];
                                selectCoverToUpload(targetFile);

                            }}
                        />
                        {coverImage && <div><image      //@ts-ignore  
                            src={coverImage} alt="cover" className="w-full h-full object-cover" /></div>}
                        <button type="button">valdier la couverture</button></div>} */}

                    <div>
                        <button
                            onClick={(e) => {
                                submitCollection(e);


                            }}
                            className="bg-blue-600 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2"
                        >
                            Créer
                        </button></div>

                </form>
            </div></div >
    );
};

export default CreateCollection;
