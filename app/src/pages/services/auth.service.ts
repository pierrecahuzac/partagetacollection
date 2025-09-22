import axios from "axios";
import baseURL from "../../utils/baseURL";
import useToast from "../../hooks/useToast";

export const signup = async (e: any, credentials: any) => {
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
    return error
  }
};

export const signin = async (

  credentials: { email: string, password: string },
) => {
  const { onError, onSuccess } = useToast()
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
    console.log(response);

    return { response }
  } catch (error: any) {
    throw error;
  }
};
