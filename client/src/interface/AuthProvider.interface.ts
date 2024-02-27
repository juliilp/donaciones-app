import { FieldValues, SubmitHandler } from "react-hook-form";
import { IDatos } from "./Datos.interface";
import { IUser } from "./IUser.interface";

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
