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
    try {
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
    } catch (error) {
      setUser(null);
      setIsAuthenticate(false);
    }
  };

  const handlerEditPerfil: SubmitHandler<FieldValues> = async (
    data: FieldValues
  ) => {
    try {
      const formData = new FormData();

      formData.append(
        "descripcion",
        data.descripcion ? data.nombre : user.nombre
      );
      formData.append(
        "motivoDonacion",
        data.motivoDonacion ? data.nombre : user.nombre
      );
      formData.append("nombre", data.nombre ? data.nombre : user.nombre);
      formData.append("image", data.fotoPerfil[0]);

      const res = await axios.put(`/user/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setUser({
          ...user,
          descripcion: res.data.descripcion,
          motivoDonacion: res.data.motivodonacion,
          nombre: res.data.nombre,
          foto: res.data.fotoPerfil,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const initialValue: IAuthProvider = {
    user,
    isAuthenticate,
    handlerCerrarSesion,
    handlerLogin,
    handlerEditPerfil,
  };
  return (
    <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
