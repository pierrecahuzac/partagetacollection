import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
export const fetchFormatsTypes = async (baseURL: string) => {
    const response = await axios.get(
        `${baseURL}/format-type`,
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

export const fetchUser = async (setConnectedUserId: any) => {
    try {
        const getUser: any = await axios.get(`${baseURL}/user`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        setConnectedUserId({
            userId: getUser.data.user.id,
            role: getUser.data.user.role
        });        
    } catch (error) {
        console.log(error);
    }
};


export const fetchAllUserCollections = async (setUserCollections :any) => {
    const response: any = await axios.get(
        `${baseURL}/collection/user-collections`,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );    
    setUserCollections(response.data.result);
};

export   

const fetchAllConditions = async (setConditions:any ) => {
    const response = await axios.get(`${baseURL}/condition`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    setConditions(response.data.conditions);
};
