export interface AuthContextProps {
    isConnected: boolean;
    setIsConnected: (value: boolean) => void;
    logout: () => Promise<any>;
  }
  