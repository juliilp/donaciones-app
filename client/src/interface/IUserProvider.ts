import { FieldValues, SubmitHandler } from "react-hook-form";

export interface IUserProvider {
  handlerEliminarDatos: (_id: string) => void;
  handlerCrearDatos: SubmitHandler<FieldValues>;
  datos: any;
  setDatos: any;
}
