import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AuthContextProps } from "../@interface/AuthContextProps";

// 🔹 Définition du type pour le contexte

// 🔹 Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 🔹 Création du provider pour gérer l’état d'authentification
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(() => { return localStorage.getItem("isConnected") === "true"; });

  useEffect(() => {
    localStorage.setItem("isConnected", isConnected.toString());
  }, [isConnected]);
  
  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};