import { useEffect, useState } from "react";

import axios from "axios";
import { TagsProps } from "../../@interface/TagsInterface";
import { NewCollectionProps } from "../../@interface/NewCollectionProps";

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

        try {
            const response = await axios.post(
                `${protocol}://${domain}:${port}/collection`,
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
        <div className="text-center w-10/12 m-auto">
            <form action="w-10/12 m-auto ">
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
                <label htmlFor="isPublic">Collection publique?</label>
                <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    onChange={(e) =>
                        setNewCollection((prevCollection) => ({
                            ...prevCollection,
                            isPublic: e.target.checked,
                        }))
                    }
                    //@ts-ignore
                    value={newCollection.isPublic}
                />
                <button
                    onClick={(e) => {
                        submitCollection(e);
                    }}
                    className="bg-blue-600 rounded-sm text-white hover:text-black hover:bg-blue-700 px-4 py-2 m-2"
                >
                    Créer
                </button>
            </form>
        </div>
    );
};

export default CreateCollection;
