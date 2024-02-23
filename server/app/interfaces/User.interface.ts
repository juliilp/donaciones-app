import mongoose from "mongoose";

interface IUser {
  id: mongoose.ObjectId;
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: boolean;
  descripcion: string;
  motivoDonacion: string;
  isAdmin: boolean;
  fotoPerfil: string;
}

export default IUser;
