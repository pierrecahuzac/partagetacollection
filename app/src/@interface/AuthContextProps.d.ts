export interface AuthContextProps {
    isConnected: boolean;
    setIsConnected: (value: boolean) => void;
    logout: () => Promise<any>;
    signin: (credentials: { email: string; password: string }) => Promise<any>;
    signup: (e: any, credentials: any) => Promise<any>;
  }
  