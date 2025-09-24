import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { AuthContextProps } from "../@interface/AuthContextProps";
import baseURL from "../utils/baseURL";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(
    () => {
      return localStorage.getItem("isConnected") === "true";
    });

  useEffect(() => {
    localStorage.setItem("isConnected", isConnected.toString());
  }, [isConnected]);

  const signup = async (e: any, credentials: any) => {
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

  const signin = async (
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
      return { response }
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async (): Promise<any> => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/logout`, {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
          },
        }
      );
      return response
      
    } catch (error) {
      console.warn('Erreur lors de la déconnexion côté serveur:', error);
    } finally {      
      localStorage.clear();
      setIsConnected(false);
    }
  };
  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected, logout, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};