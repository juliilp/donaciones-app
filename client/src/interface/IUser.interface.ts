import { IDatos } from "./Datos.interface";

interface IFoto {
  public_id: string;
  secure_url: string;
}

export interface IUser {
  email: string;
  fotoPerfil: IFoto;
  nombre: string;
  _id: string;
  isAdmin: boolean;
  motivoDonacion: string;
  description: string;
  datos: IDatos[];
}
