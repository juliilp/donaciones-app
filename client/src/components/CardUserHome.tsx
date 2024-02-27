interface IFoto {
  public_id: string;
  secure_url: string;
}

interface Props {
  nombre: string;
  fotoPerfil: IFoto;
  description: string;
}

export default function CardUserHome({
  nombre,
  fotoPerfil,
  description,
}: Props) {
  return (
    <article>
      <h2>{nombre}</h2>
      <img src={fotoPerfil.secure_url} alt="Imagen" />
      {description ? <p>{description}</p> : <span>Sin descripcion</span>}
    </article>
  );
}
