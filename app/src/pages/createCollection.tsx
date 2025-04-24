import { ChangeEvent, useEffect, useState } from "react";

import axios from "axios";

import { NewCollectionProps } from "../@interface/NewCollectionProps";
import { CoverProps } from "../@interface/CoverProps";
import { useNavigate } from "react-router";
import useToast from "../hooks/useToast";
import { acceptedFormats } from "../utils/acceptedFormats";

import '../styles/createCollection.scss'

const CreateCollection = () => {
    const baseURL = import.meta.env.VITE_BASE_URL
    const { onError } = useToast()
    //@ts-ignore 
    const [formatsType, setAllFormatsType] = useState([]);
    // const [coverImage, setCoverImage] = useState()
    // const [ssUploadCoverModalOpen, setIsUploadCoverModalOpen] = useState(false);
    const [file, setFile] = useState<CoverProps>()
    const navigate = useNavigate()
    const [
        collectionStatuses, setCollectionStatuses] = useState<string[]>()

    const [newCollection, setNewCollection] = useState<NewCollectionProps>({
        description: "",
        title: "",
        tags: [],
        cover: "",
        startedAt: "",
        collectionStatus: ""
    });

    useEffect(() => {
        const fetchFormatsType = async () => {
            const response = await axios.get(`${baseURL}/api/format-type`, {
                withCredentials: true
            })
            
            setAllFormatsType(response.data)
            //
        }
        fetchFormatsType()
    }, []
    )

    const selectCoverToUpload = (cover: CoverProps) => {
        const response = handleFilesChange(cover);
        if (response === true) {
            setNewCollection((prevCollection) => ({ ...prevCollection, cover: cover.name }));
            setFile(cover);
        }
    };

    const handleFilesChange = (file: CoverProps) => {
        try {
            const maxSize = 500000000;
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

        if (!newCollection.title) {
            onError("La  collection doit avec un titre")
            return
        }
        // Création de FormData
        const formData = new FormData();
        // Convertir en JSON
        formData.append("newCollection", JSON.stringify(newCollection));

        if (file) {

            //@ts-ignore 
            formData.append("file", file);
        }
        try {
            const response = await axios.post(
                `${baseURL}/api/collection`,
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
    useEffect(() => {
        const fetchCollectionstatus = async () => {
            try {
                const allCollectionStatuses = await axios.get(`${baseURL}/api/collection-status`,
                    {
                        withCredentials: true
                    }
                )
                setCollectionStatuses(allCollectionStatuses.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCollectionstatus()
    }, [])

    const statusModified = (status: string): string => {
        if (status === 'PRIVATE') return 'Privée'
        else if (status === 'PUBLIC') return 'Publique'
        else return "Amis"
    }

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
                        <label htmlFor="startedAt">Date de début</label>
                        <input
                            type="date"
                            name="startedAt"
                            className=""
                            value={newCollection.startedAt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="startedAt">Type de collection</label>
                        <select
                            name=""
                            id=""
                            defaultChecked
                            onChange={(e) => {
                                setNewCollection(prevState => ({
                                    ...prevState,
                                    formatType: e.target.value
                                }))
                            }
                            }>
                            <option value="" id="" key="">choisir
                            </option>{
                                formatsType && formatsType.map((format: { id: string, name: string }) => (
                                    <option value={format.name} id={format.id} key={format.id}>{format.name}
                                    </option>
                                ))
                            }</select>
                    </div>
                    <div className="inline-flex items-center">Status
                        <select onChange={(e) =>
                            setNewCollection((prev) => ({
                                ...prev,
                                collectionStatus: e.target.value,
                            }))
                        }
                            name="" id="">
                            <option value="" id="" key="" defaultChecked>choisir</option>
                            {collectionStatuses && collectionStatuses.map((s: string) => (
                                <option value={s} >{statusModified(s)}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className="event__form">
                        <label htmlFor="images" className="event__label">
                            {/*  Ajouter des images */}
                            <input
                                className=""
                                type="file"
                                id="images"
                                multiple
                                accept={acceptedFormats.join(",")}

                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files !== null && e.target.files.length) {
                                        const targetFile: any = e.target.files[0];
                                        //setFile(targetFile)
                                        selectCoverToUpload(targetFile);
                                    }
                                }}
                            />
                        </label>
                        <div>                                                        <div className="event__files-section">
                            {file &&

                                <div /* key={index} */ className="img-div">
                                    <img     //@ts-ignore 
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="image"
                                    />
                                    <div className="middle">

                                    </div>
                                </div>
                            }
                        </div>
                        </div>

                    </div>
                    <div className="">
                        <label htmlFor="">Commentaire</label>
                        <input
                            type="text"
                            name="description"
                            className=""
                            value={newCollection.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button
                            onClick={(e) => {
                                submitCollection(e);

                            }}
                            className="create-collection__submit"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateCollection;
