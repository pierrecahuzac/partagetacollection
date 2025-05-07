import axios from "axios";
import baseURL from "../utils/baseURL";

export const submitUser = async (e: any, credentials: any) => {
  e.preventDefault();

  try {
    const response = await axios.post(
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
    return response
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const loginUser = async (
  credentials: { email: string, password: string },
) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };
  try {
    const response = await axios.post(
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
    return response
    // const { message } = response.data;
    // if (message === "User connected") {
    //   return response
    // }
  } catch (error: any) {
    return error

  }
};
