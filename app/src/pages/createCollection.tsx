import { useEffect, useState } from "react";

import axios from "axios";
import { TagsProps } from "../@interface/TagsInterface";
import { NewCollectionProps } from "../@interface/NewCollectionProps";
import { CoverProps } from "../@interface/CoverProps";
import { useNavigate } from "react-router";
import useToast from "../hooks/useToast";

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
    const [allTags, setAllTags] = useState<[] | TagsProps[]>([]);
    const [newCollection, setNewCollection] = useState<NewCollectionProps>({
        description: "",
        title: "",
        tags: [],
        isPublic: false,
        cover: "",
        startedAt: ""
    });

    useEffect(() => {
        const fetchDatas = async () => {
            const response = await axios.get(
                `${protocol}://${domain}:${port}/api/tag`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            setAllTags(response.data.tags);
        };
        fetchDatas();
    }, []);

    const selectCoverToUpload = (cover: CoverProps) => {
        const response = handleFilesChange(cover);
        if (response === true) {
            setNewCollection((prevCollection) => ({ ...prevCollection, cover: cover.name }));

            setFile(cover);
        }
    };

    const handleFilesChange = (file: CoverProps) => {
        console.log(file);
        try {
            const maxSize = 1000000;
            const fileSizeIsValid = validFileSize(file, maxSize);
            if (fileSizeIsValid === false) {
                onError("Taille de l'image trop grosse")
                return;

            }
            console.log('fichier valide');
            return fileSizeIsValid;
        } catch (error) {
            console.log(error);
        }
    };

    const validFileSize = (
        file: any,
        maxSize: number,
    ) => {
        console.log(file);
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
            formData.append("file", file); // Ajouter l'image
        }

        // Debug : Vérifier ce qui est envoyé
        formData.forEach((value, key) => {
            console.log(`FormData -> ${key}:`, value);
        });

        try {
            // j'envois data pour creér la collection
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
            console.log(response);
            if (response.status === 201) {
                navigate(`/homepage`)
            }

        } catch (error) {
            console.log(error);
        }
    };
    const acceptedFormats = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/HEIC",
        "image/HEVC",
        "image/heic",
        "image/hevc",
    ]
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-quicksand">Créer une collection</h2></div>
                <form action="w-full m-auto mt-5">
                    <div className="w-full m-auto fx flex flex-col">
                        <label className="" htmlFor="">
                            Titre
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="title"
                            value=
                            {newCollection.title}
                            className="border-1 border-gray-300 rounded-sm px-4 py-2"
                        />
                    </div>
                    <div className="w-full m-auto flex flex-col">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="border-1 border-gray-300 rounded-sm px-4 py-2"

                            value={newCollection.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-10/12 m-auto flex flex-col">
                        <label htmlFor="startedAt">Date de débtu</label>
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

                        {allTags.length &&
                            allTags?.map((tag: TagsProps) => {
                                return (
                                    <div key={tag.id} className="border-2 w-15 rounded-sm">
                                        <input type="checkbox" name={tag.name} id={tag.id} value={tag.id} onChange={(e) =>
                                            //@ts-ignore 
                                            setNewCollection((prevCollection) => ({ ...prevCollection, tags: e.target.name }))} />
                                        {tag.name}
                                    </div>
                                );
                            })}
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
                                value={newCollection.isPublic} className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-custom-style" />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                    {/* <button className="cursor-pointer rounded-md bg-amber-400" onClick={e => { handleModaleUpload(e) }}>
                        + Ajouter une image de couverture ?

                    </button> */}
                    <form className="event__form">
                        <label htmlFor="images" className="event__label">
                            Ajouter des images
                            <input
                                className="bg-amber-300 rounded-md"
                                type="file"
                                id="images"
                                multiple
                                accept={acceptedFormats.join(",")}     //@ts-ignore 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const targetFile: any = e.target.files[0];
                                    console.log(targetFile);
                                    //setFile(targetFile)
                                    selectCoverToUpload(targetFile);
                                    // if (targetFiles) {
                                    //     setIsUploadPhotosModalOpen(true);
                                    // }
                                }}
                            />
                        </label>
                        {/* Modale */}
                        <div
                        //isOpen={isUploadPhotosModalOpen}
                        //onClose={() => setIsUploadPhotosModalOpen(false)}
                        >
                            {file && (
                                <button
                                    className="event__button"
                                    type="button"
                                // onClick={(e) => handleUpdateImage(e)}
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
                    {modaleIsOpen && <div className="w-10/12 m-auto h-full z-10 flex justify-center absolute top-0 left-0 align-middle">
                        <div>Modale</div>
                        <div onClick={() => setModaleIsOpen(false)}>X</div>
                        <input
                            type="file"
                            id="coverCollection"
                            accept={acceptedFormats.join(",")}
                            onChange={(e) => {
                                //@ts-ignore
                                const targetFile: any = e.target.files[0];
                                console.log(targetFile);

                                selectCoverToUpload(targetFile);
                                // if (targetFile) {
                                //     setIsUploadCoverModalOpen(true);
                                // }
                            }}
                        />
                        {coverImage && <div><image      //@ts-ignore  
                            src={coverImage} alt="cover" className="w-full h-full object-cover" /></div>}
                        <button type="button">valdier la couverture</button></div>}

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
