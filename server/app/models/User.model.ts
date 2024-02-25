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
    public_id: {
      type: String,
      default: "",
    },
    secure_url: {
      type: String,
      default:
        "https://res.cloudinary.com/dnlxeeahh/image/upload/v1708893266/donaciones-app/jpbjzy939nufpnyykkv9.jpg",
    },
  },
  datos: {
    type: Array,
    default: [],
  },
});

export default model("UserModel", UserModel);
