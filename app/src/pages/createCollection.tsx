import React, { ChangeEvent, useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router";
import axios from "axios";

import { NewCollectionProps } from "../@interface/NewCollectionProps";

import { acceptedFormats } from "../utils/acceptedFormats";
import useToast from "../hooks/useToast";

import '../styles/createCollection.scss'

interface CollectionStatus {
    id: string;
    name: string;
    description: string;
    order: number;
}

const CreateCollection = () => {
    const baseURL = import.meta.env.VITE_BASE_URL
    const { onError } = useToast()
    //@ts-ignore 
    const [formatsType, setAllFormatsType] = useState([]);
    // const [coverImage, setCoverImage] = useState()
    // const [ssUploadCoverModalOpen, setIsUploadCoverModalOpen] = useState(false);
    const [file, setFile] = useState<File[] | []>([]);
    const navigate = useNavigate()
    const [collectionStatuses, setCollectionStatuses] = useState<CollectionStatus[]>([]);

    const [newCollection, setNewCollection] = useState<NewCollectionProps>({
        description: "",
        title: "",
        cover: [],
        startedAt: "",
        collectionStatus: ""
    });

    useEffect(() => {
        fetchCollectionStatuses();
    }, []);

    const fetchCollectionStatuses = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/collection-status`, {
                withCredentials: true
            });
            setCollectionStatuses(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des statuts:", error);
            onError("Impossible de charger les statuts de collection");
        }
    };

    const selectCoverToUpload = (covers: File[]) => {
        const validFiles = handleFilesChange(covers);
        if (validFiles.length > 0) {
            // @ts-ignore
            setFile((prev: File[]) => [...prev, ...validFiles]);
            setNewCollection((prevCollection: any) => ({
                ...prevCollection,
                cover: [...prevCollection.cover, ...validFiles.map(file => file.name)]
            }));
        }
    };


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

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewCollection((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitCollection = async (e: any) => {
        try {
            e.preventDefault();

            if (!newCollection.title) {
                onError("La  collection doit avec un titre")
                return
            }
            // Création de FormData
            const formData = new FormData();
            // Convertir en JSON
            formData.append("newCollection", JSON.stringify(newCollection));

            if (file && file.length > 0) {
                file.forEach((f: any) => {
                    formData.append("files", f); // attention au nom côté back !
                });
            }
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
                navigate(`/`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const statusModified = (status: CollectionStatus): string => {        
        if (status.name === 'PRIVATE') return 'Privée';
        else if (status.name === 'PUBLIC') return 'Publique';
        else return "Amis";
    };

    const handleRemoveFile = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        setFile((prev) => prev.filter((_, i) => i !== index));
        setNewCollection((prevCollection: any) => ({
            ...prevCollection,
            cover: prevCollection.cover.filter((_: any, i: number) => i !== index),
        }));
    };


    return (
        <div className="create-collection">
            <h3 className="">Nouvelle collection
            </h3>
            <form action="submit" className="create-collection__form">
                <div className="create-collection__element">
                    <label className="create-collection__element-label" htmlFor="">
                        Titre
                    </label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="title"
                        value=
                        {newCollection.title}
                        className="create-collection__element-label"
                    />
                </div>
                <div className="create-collection__element">
                    <label htmlFor="startedAt" className="create-collection__element-label">Date de début</label>
                    <input
                        type="date"
                        name="startedAt"
                        className="create-collection__element-label"
                        value={newCollection.startedAt}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="create-collection__element">
                    <label htmlFor="" className="create-collection__element-label">Status <span className="create-collection__status" data-tooltip-id="question">?</span>

                        <Tooltip id="question" className="my-tooltip">

                            <ul className="tooltip__list">
                                <li><CgDanger />Fonctionnalité non implémentée</li>
                                <li className="tooltip__item" >Privée : seul le créateur verra cette collection</li>
                                <li className="tooltip__item">Publique : tous les utilisateurs inscrits pourront la voir</li>
                                <li className="tooltip__item">Amis : uniquement les amis y auront accès (sur liste)</li>
                            </ul>
                        </Tooltip></label>

                    <select 
                        className="create-collection__element-input" 
                        onChange={(e) => {
                            setNewCollection((prev) => ({
                                ...prev,
                                collectionStatus: e.target.value,
                            }));
                        }}
                        name="collectionStatus" 
                        id="collectionStatus"
                        value={newCollection.collectionStatus}
                    >
                        <option value="">Choisir un statut</option>
                        {collectionStatuses.map((status) => (
                            <option value={status.id} key={status.id}>
                                {statusModified(status)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="create-collection__element">
                    <label htmlFor="description" className="create-collection__element-label">Commentaire</label>
                    <input className="create-collection__element-input"
                        type="text"
                        name="description"
                        value={newCollection.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="create-collection__element">
                    <label htmlFor="images" className="create-collection__element-label">
                        {/*  Ajouter des images */}
                        <input
                            className="create-collection__element-input"
                            type="file"
                            id="images"
                            multiple
                            accept={acceptedFormats.join(",")}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files.length) {
                                    const filesArray = Array.from(e.target.files);
                                    selectCoverToUpload(filesArray);
                                }
                            }}
                        />

                    </label>

                    <div className="event__files-section">
                        {file.length > 0 && file.map((f, index) => (
                            <div className="create-collection__element-image" key={index}>
                                <img
                                    //@ts-ignore
                                    src={URL.createObjectURL(f)}
                                    alt={(f).name}
                                />
                                <button className="cancel-cover" onClick={(e) => handleRemoveFile(index, e)}>X</button>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="create-collection__footer">
                    <button
                        onClick={(e) => {
                            submitCollection(e);

                        }}
                        className="create-collection__submit"
                    >
                        Créer
                    </button>
                </div>
            </form >


        </div >
    );
};

export default CreateCollection;
