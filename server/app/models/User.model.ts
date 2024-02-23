import mongoose, { Schema, model } from "mongoose";

const UserModel = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmarPassword: {
    type: Boolean,
    default: false,
  },
  descripcion: {
    type: String,
    default: "",
  },
  motivoDonacion: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  fotoPerfil: {
    type: String,
    default: "",
  },
  datos: {
    type: Array,
    default: [],
  },
});

export default model("UserModel", UserModel);
