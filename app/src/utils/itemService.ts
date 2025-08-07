import axios from "axios";
import baseURL from "./baseURL";

export const handleDeleteItemFromCollection = async (collectionItemId: string, collectionId: string) => {
    try {
        const response = await axios.delete(`${baseURL}/collection-item/${collectionItemId}`, {
            withCredentials: true,
            params: { collectionId }
        });
        return response
    } catch (error) {
        
    }
}