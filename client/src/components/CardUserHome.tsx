import { Link } from "react-router-dom";

interface IFoto {
  public_id: string;
  secure_url: string;
}

interface Props {
  nombre: string;
  fotoPerfil: IFoto;
  description: string;
  id: string;
}

export default function CardUserHome({
  nombre,
  fotoPerfil,
  description,
  id,
}: Props) {
  return (
    <Link to={`/perfil/${id}`}>
      <article>
        <h2>{nombre}</h2>
        <img src={fotoPerfil.secure_url} alt="Imagen" />
        {description ? <p>{description}</p> : <span>Sin descripcion</span>}
      </article>
    </Link>
  );
}
