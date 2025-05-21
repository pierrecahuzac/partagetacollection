import axios from "axios";

export const fetchFormatsTypes = async (baseURL: string) => {
    const response = await axios.get(
        `${baseURL}/api/format-type`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    return response.data

};

export const fetchUserCollections = async (baseUrl: string) => {
    const response = await axios.get(
        `${baseUrl}/api/collection`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    return response.data.result;
} 