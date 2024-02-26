import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import PerfilCardDatos from "../components/PerfilCardDatos";
import { IPerfilCardDatos } from "../interface/IPerfilCardDatos.interface";
import axios from "axios";

export default function Perfil() {
  const { register: perfil, handleSubmit: handlerPerfil } = useForm();
  const { register: registerDatos, handleSubmit: handlerDatos } = useForm();

  const navigate = useNavigate();
  const {
    isAuthenticate,
    handlerEditPerfil,
    datos,
    handlerCrearDatos,
    setDatos,
  } = useAuth();

  const [switchNuevoMetodoDePago, setSwitchNuevoMetodoDePago] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticate) {
      return navigate("/");
    }
  }, [isAuthenticate]);

  useEffect(() => {
    async function actualizarDatos() {
      const res = await axios("/datos");
      setDatos(res.data);
    }
    actualizarDatos();
  }, []);
  return (
    <section className="w-full h-screen relative ">
      <form
        onSubmit={handlerPerfil(handlerEditPerfil)}
        className="flex flex-col gap-3 border border-black p-4 w-max mx-auto"
      >
        <h2 className="text-center text-xl font-thin">¡Edita Tu Perfil!</h2>
        <input
          type="text"
          placeholder="descripcion"
          {...perfil("descripcion")}
        />
        <input
          type="text"
          placeholder="motivoDonacion"
          {...perfil("motivoDonacion")}
        />
        <input type="text" placeholder="nombre" {...perfil("nombre")} />
        <input type="file" {...perfil("fotoPerfil")} />
        <button className="block bg-red-500 p-3 text-white rounded-xl">
          Enviar
        </button>
      </form>

      {datos.map((d: IPerfilCardDatos) => {
        return (
          <PerfilCardDatos
            Alias={d.Alias}
            CVU={d.CVU}
            Cuil={d.Cuil}
            Plataforma={d.Plataforma}
            _id={d._id}
            key={d._id}
          />
        );
      })}

      <button
        className="block"
        onClick={() => setSwitchNuevoMetodoDePago((prev) => !prev)}
      >
        ➕ Añadir método de pago{" "}
      </button>
      {switchNuevoMetodoDePago && (
        <section className="absolute flex justify-center items-center top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-gray-700">
          <form
            className="flex flex-col gap-3 border border-black p-3 relative"
            onSubmit={handlerDatos(handlerCrearDatos)}
          >
            <input type="text" placeholder="CVU" {...registerDatos("CVU")} />
            <input
              type="text"
              placeholder="Alias"
              {...registerDatos("Alias")}
            />
            <input type="text" placeholder="Cuil" {...registerDatos("CUIL")} />
            <input
              type="text"
              placeholder="Plataforma"
              {...registerDatos("Plataforma")}
            />
            <button type="submit">Enviar</button>
            <button
              className="absolute top-0 right-0"
              onClick={() => setSwitchNuevoMetodoDePago((prev) => !prev)}
              type="button"
            >
              X
            </button>
          </form>
        </section>
      )}
    </section>
  );
}
