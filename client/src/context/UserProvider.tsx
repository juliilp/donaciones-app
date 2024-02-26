import React, { createContext, useEffect, useState } from "react";

import { IUserProvider } from "../interface/IUserProvider";
import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IPerfilCardDatos } from "../interface/IPerfilCardDatos.interface";

interface UserProviderProps {
  children: React.ReactNode;
}

export const userContext = createContext<IUserProvider | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [datos, setDatos] = useState<IPerfilCardDatos[]>([]);

  useEffect(() => {
    async function getDatos() {
      const result = await axios("/datos");
      setDatos(result.data);
    }
    getDatos();
  }, []);

  const handlerCrearDatos: SubmitHandler<FieldValues> = async (data) => {
    const result = await axios.post("/datos/", {
      Cuil: data.Cuil,
      CVU: data.CVU,
      Alias: data.Alias,
      Plataforma: data.Plataforma,
    });

    const dataResult: IPerfilCardDatos = result.data;
    setDatos([...datos, dataResult]);
  };
  const handlerEliminarDatos = async (_id: string) => {
    const switchConfirm = confirm("Estas seguro de eliminarlo?");
    if (switchConfirm) {
      const res = await axios.delete(`/datos/${_id}`);
      if (res.status === 200) {
        const datosFiltrados = datos.filter((d) => d._id !== _id);
        setDatos(datosFiltrados);
      }
    }
  };

  const initialValue: IUserProvider = {
    handlerCrearDatos,
    handlerEliminarDatos,
    datos,
  };
  return (
    <userContext.Provider value={initialValue}>{children}</userContext.Provider>
  );
};

export default UserProvider;
