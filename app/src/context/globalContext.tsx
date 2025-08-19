import { createContext, useContext, useState, ReactNode, useEffect, SetStateAction, Dispatch } from "react";

interface GlobalContextType {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  })

  useEffect(() => {   
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');  }   
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);


  return (
    <GlobalContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};