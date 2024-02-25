import { Request, Response } from "express";
import DatosModel from "../models/Datos.model";
import UserModel from "../models/User.model";

const createDatos = async (req: Request, res: Response) => {
  try {
    const { Cuil, CVU, Alias, Plataforma } = req.body;

    const createDatos = await DatosModel.create({
      Cuil,
      CVU,
      Alias,
      Plataforma,
      user: req.user?.id,
    });

    await UserModel.findByIdAndUpdate(
      req.user?.id,
      { $push: { datos: createDatos } }, // Agrega el nuevo dato al array "datos"
      { new: true } // Devuelve el documento actualizado
    );
    res.status(200).json(createDatos);
  } catch (error) {
    console.log(error);
  }
};

const updateDatos = async (req: Request, res: Response) => {
  try {
    const { Cuil, CVU, Alias, Plataforma } = req.body;
    const { id } = req.params;

    // Actualiza el documento en Datos
    const updatedDatos = await DatosModel.findByIdAndUpdate(
      id,
      {
        Cuil,
        CVU,
        Alias,
        Plataforma,
      },
      { new: true }
    );

    // Obtiene el usuario y actualiza el array datos
    const user = await UserModel.findById(req.user?.id);

    if (user) {
      const index = user.datos.findIndex((dato) => dato._id.toString() === id);
      if (index !== -1) {
        user.datos[index] = updatedDatos?.toObject();
        await user.save();
      }
    }

    res.status(200).json(updatedDatos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
};

const deleteDatos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteDatos = await DatosModel.findByIdAndDelete(id);

    const user = await UserModel.findById(req.user?.id);

    if (user) {
      user.datos = user.datos.filter((obj) => obj._id.toString() !== id);
      await user.save();
    }
    res.status(200).json(deleteDatos);
  } catch (error) {
    console.log(error);
  }
};

const getAllDatos = async (req: Request, res: Response) => {
  const allDatos = await DatosModel.find();

  res.json(allDatos);
};

const getDatos = async (req: Request, res: Response) => {
  try {
    const idUser = req.user?.id;
    const datosUser = await DatosModel.find({
      user: idUser,
    });
    res.status(200).json(datosUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createDatos, updateDatos, deleteDatos, getAllDatos, getDatos };
