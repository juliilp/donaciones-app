import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/donaciones-app");
    console.log("Conectado a la DB!");
  } catch (error) {
    console.log("Error al connectar en la DB " + error);
  }
};

export default connectDB;
