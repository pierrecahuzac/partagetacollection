import axios from "axios";
import baseURL from "./baseURL";

export const handleDeleteItemFromCollection = async (itemId: string, collectionId: string) => {
    try {
        const response = await axios.delete(`${baseURL}/api/collection-item/${itemId}`, {
            withCredentials: true,
            params: {
                collectionId
            }
        });
        return response
    } catch (error) {
        console.log(error);
    }

}