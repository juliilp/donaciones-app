import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IAuthProvider } from "../interface/AuthProvider.interface";
import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthProvider | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const navigate = useNavigate();
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
          setUser(null);
          setIsAuthenticate(false);
        }
      }
      guardarUsuario();
    }
  }, []);

  const handlerCerrarSesion = () => {
    async function cerrarSesion() {
      await axios("/user/logout");
      setUser(null);
      setIsAuthenticate(false);
    }
    cerrarSesion();
  };

  const handlerLogin: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    const result = await axios.post(
      "/user/login",
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    );
    setUser(result.data);
    setIsAuthenticate(true);
    if (result.status === 200) {
      navigate("/");
    }
  };

  const initialValue: IAuthProvider = {
    user,
    isAuthenticate,
    handlerCerrarSesion,
    handlerLogin,
  };
  return (
    <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
