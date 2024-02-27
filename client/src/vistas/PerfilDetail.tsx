import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../interface/IUser.interface";

export default function PerfilDetail() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState<IUser | null>(null);

  useEffect(() => {
    async function allPerfiles() {
      const res = await axios(`/user/userId/${id}`);
      if (res.status === 200) {
        setPerfil(res.data);
      }
    }
    allPerfiles();
  }, []);

  return (
    <section>
      <h1>{perfil?.nombre}</h1>
      <img src={perfil?.fotoPerfil.secure_url} alt="imagen" />
      <p>{perfil?.description}</p>
      <p>{perfil?.motivoDonacion}</p>
    </section>
  );
}
