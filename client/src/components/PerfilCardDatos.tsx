import useAuth from "../hooks/useAuth";
import { IPerfilCardDatos } from "../interface/IPerfilCardDatos.interface";

export default function PerfilCardDatos({
  Alias,
  CVU,
  Cuil,
  Plataforma,
  _id,
}: IPerfilCardDatos) {
  const { handlerEliminarDatos } = useAuth();
  return (
    <article className="flex flex-col gap-3 border border-black p-4" key={_id}>
      <span>Alias: {Alias}</span>
      <span>CVU: {CVU}</span>
      <span>Cuil: {Cuil}</span>
      <span>Plataforma: {Plataforma}</span>
      <button onClick={() => handlerEliminarDatos(_id)}>Eliminar</button>
    </article>
  );
}
