import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { AuthContextProps } from "../@interface/AuthContextProps";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(
    () => {
      return localStorage.getItem("isConnected") === "true";
    });

  useEffect(() => {
    localStorage.setItem("isConnected", isConnected.toString());
  }, [isConnected]);

  const logout = async (): Promise<any> => {
    const baseURL = import.meta.env.VITE_BASE_URL;
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
    <AuthContext.Provider value={{ isConnected, setIsConnected, logout }}>
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