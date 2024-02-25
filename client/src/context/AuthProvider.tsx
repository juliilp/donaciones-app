import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IAuthProvider } from "../interface/AuthProvider.interface";
import axios from "axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthProvider | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any[]>([]);
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies.userLoginToken) {
      async function guardarUsuario() {
        try {
          const result = await axios.get("/user/verify", {
            withCredentials: true,
          });
          setUser(result.data);
          setIsAuthenticate(true);
        } catch (error) {
          console.log(error);
          setUser([]);
          setIsAuthenticate(false);
        }
      }
      guardarUsuario();
    }
  }, []);

  const initialValue: IAuthProvider = {
    user,
    isAuthenticate,
  };
  return (
    <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
