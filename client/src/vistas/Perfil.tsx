import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

export default function Perfil() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { isAuthenticate, handlerEditPerfil } = useAuth();

  useEffect(() => {
    if (!isAuthenticate) {
      return navigate("/");
    }
  }, [isAuthenticate]);

  return (
    <section>
      <form onSubmit={handleSubmit(handlerEditPerfil)}>
        <input
          type="text"
          placeholder="descripcion"
          {...register("descripcion")}
        />
        <input
          type="text"
          placeholder="motivoDonacion"
          {...register("motivoDonacion")}
        />
        <input type="text" placeholder="nombre" {...register("nombre")} />
        <input type="file" {...register("fotoPerfil")} />
        <button className="block bg-red-500 p-3 text-white rounded-xl">
          Enviar
        </button>
      </form>
    </section>
  );
}
