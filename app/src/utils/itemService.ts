import axios from "axios";
import baseURL from "./baseURL";

export const handleDeleteItemFromCollection = async (collectionItemId: string, collectionId: string) => {
    try {
        const response = await axios.delete(`${baseURL}/collection-item/${collectionItemId}`, {
            withCredentials: true,
            params: {collectionId}
        });        
        console.log(response);
        
        return response
    } catch (error) {
        console.log(error);
    }

}