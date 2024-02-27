import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { IPerfilCardDatos } from "../interface/IPerfilCardDatos.interface";
import { useForm } from "react-hook-form";

export default function PerfilCardDatos({
  Alias,
  CVU,
  Cuil,
  Plataforma,
  _id,
}: IPerfilCardDatos) {
  const { handlerEliminarDatos, handlerEditDatos } = useAuth();
  const [switchModalEditar, setSwitchModalEditar] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  return (
    <article className="flex flex-col gap-3 border border-black p-4" key={_id}>
      <span>Alias: {Alias}</span>
      <span>CVU: {CVU}</span>
      <span>Cuil: {Cuil}</span>
      <span>Plataforma: {Plataforma}</span>
      <button onClick={() => handlerEliminarDatos(_id)}>Eliminar</button>
      <button onClick={() => setSwitchModalEditar((prev) => !prev)}>
        Editar
      </button>

      {switchModalEditar && (
        <form
          onSubmit={handleSubmit(({ Alias, CVU, Cuil, Plataforma }) =>
            handlerEditDatos({
              _id,
              Alias,
              CVU,
              Cuil,
              Plataforma,
            })
          )}
          className="border border-black p-6 rounded-xl w-max flex flex-col mx-auto"
        >
          <input type="text" placeholder="Alias" {...register("Alias")} />
          <input type="text" placeholder="CVU" {...register("CVU")} />
          <input type="text" placeholder="Cuil" {...register("Cuil")} />
          <input
            type="text"
            placeholder="Plataforma"
            {...register("Plataforma")}
          />
          <button>Enviar</button>
        </form>
      )}
    </article>
  );
}
