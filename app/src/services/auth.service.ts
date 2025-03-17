import axios from "axios";

const protocol: string = import.meta.env.VITE_API_PROTOCOL;
const domain: string = import.meta.env.VITE_API_DOMAIN;
const port: string = import.meta.env.VITE_API_PORT;

export const submitUser = async (e: any, credentials: any) => {
  e.preventDefault();
  console.log("Données envoyées :", credentials);
  try {
    const response = await axios.post(
      `${protocol}://${domain}:${port}/auth/signup`,
      credentials,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response);
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
      `${protocol}://${domain}:${port}/auth/signin`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response);

    const { message } = response.data;

    if (message === "User connected") {
        return response
     
    }
  } catch (error: any) {
    console.log(error);
  }
};
