import { FieldValues, SubmitHandler } from "react-hook-form";
import { IDatos } from "./Datos.interface";

interface IFoto {
  public_id: string;
  secure_url: string;
}

export interface IUser {
  email: string;
  foto: IFoto;
  nombre: string;
  id: string;
  isAdmin: boolean;
  motivoDonacion: string;
  description: string;
  datos: any[];
}

export interface IAuthProvider {
  user?: IUser;
  isAuthenticate?: boolean;
  handlerCerrarSesion?: () => void;
  handlerLogin: SubmitHandler<FieldValues>;
  handlerEditPerfil: SubmitHandler<FieldValues>;
  handlerEliminarDatos: (_id: string) => void;
  handlerCrearDatos: SubmitHandler<FieldValues>;
  datos: any;
  setDatos: any;
  handlerEditDatos: (datos: IDatos) => void;
}
