import { FieldValues, SubmitHandler } from "react-hook-form";

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
}
