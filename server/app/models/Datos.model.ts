import mongoose, { Schema, model } from "mongoose";

const Datos = new Schema({
  Cuil: {
    type: String,
    default: "",
  },
  CVU: {
    type: String,
    default: "",
  },
  Alias: {
    type: String,
    default: "",
  },
  Plataforma: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});

export default model("Datos", Datos);
