import { useEffect, useState } from "react";

import axios from "axios";
import { TagsProps } from "../@interface/TagsInterface";
import { NewCollectionProps } from "../@interface/NewCollectionProps";

const CreateCollection = () => {
    const protocol = import.meta.env.VITE_API_PROTOCOL;
    const domain = import.meta.env.VITE_API_DOMAIN;
    const port = import.meta.env.VITE_API_PORT;
    const [allTags, setAllTags] = useState<[] | TagsProps[]>([]);
    const [newCollection, setNewCollection] = useState<NewCollectionProps | {}>({
        name: "",
        description: "",
        title: "",
        tags: [],
        isPublic: false,
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
            console.log(response.data.tags);
            setAllTags(response.data.tags);
        };
        fetchDatas();
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setNewCollection((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const submitCollection = async (e: any) => {
        e.preventDefault();
        // @ts-ignore
        if (!newCollection.title || !newCollection.description) {
            return
        }
        try {
            const response = await axios.post(
                `${protocol}://${domain}:${port}/api/collection`,
                newCollection,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-quicksand">Créer une collection</h2></div>
                <form action="w-10/12 m-auto mt-5">
                    <div className="w-10/12 m-auto fx flex flex-col">
                        <label className="" htmlFor="">
                            Titre
                        </label>
                        <input
                            type="text"
                            onChange={handleInputChange}
                            name="title"
                            value=//@ts-ignore
                            {newCollection.title}
                            className="border-1 border-gray-300 rounded-sm px-4 py-2"
                        />
                    </div>
                    <div className="w-10/12 m-auto flex flex-col">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            className="border-1 border-gray-300 rounded-sm px-4 py-2"
                            //@ts-ignore
                            value={newCollection.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-10/12 m-auto flex-col">
                        <label htmlFor="">Catégorie(s)</label>

                        {allTags.length &&
                            allTags?.map((tag: TagsProps) => {
                                return (
                                    <div key={tag.id} className="border-2 w-15 rounded-sm">
                                        <input type="checkbox" name={tag.name} id={tag.id} value={tag.id} onChange={(e) => setNewCollection((prevCollection) => ({ ...prevCollection, tags: e.target.name }))} />
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

                    <button
                        onClick={(e) => {
                            submitCollection(e);
                        }}
                        className="bg-blue-600 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2"
                    >
                        Créer
                    </button>
                </form>
            </div></div>
    );
};

export default CreateCollection;
