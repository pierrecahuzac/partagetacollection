import axios from "axios";
import baseURL from "../utils/baseURL";

export const submitUser = async (e: any, credentials: any) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      // `${protocol}://${domain}:${port}/auth/signup`,
      `${baseURL}/auth/signup`,
      credentials,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const { message } = response.data;
    if (message === "User created") {
      return response;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const loginUser = async (
  //   e: any,
  credentials: any,
) => {
  //   e.preventDefault();
  const body = {
    email: credentials.email,
    password: credentials.password,
  };
  try {
    const response = await axios.post(
      /* `${protocol}://${domain}:${port}/auth/signin`, */
      `${baseURL}/auth/signin`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
   

    const { message } = response.data;
    if (message === "User connected") {
      return response
    }
  } catch (error: any) {
    return error
    /* console.log(error);
    if(error.response.data.message ==='Combinaison email/mot de passe incorrecte'){
      console.log('Combinaison email/mot de passe incorrecte');
      
    } */
  }
};
