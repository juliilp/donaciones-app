import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { compare, hash } from "bcryptjs";
import IUser from "../interfaces/User.interface";
import createToken from "../utils/createToken";
import DatosModel from "../models/Datos.model";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "No se encontro el usuario" });
    }
    const passwordCompare = await compare(findUser.password, password);

    if (passwordCompare) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = await createToken({ id: findUser._id });

    res.cookie("userLoginToken", token, {
      sameSite: "none",
      secure: false,
      domain: "localhost",
    });
    res.status(200).json({
      message: "Usuario logueado",
      nombre: findUser.nombre,
      email: findUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return res
        .status(401)
        .json({ message: "Ya se encuentra un usuario con ese email" });
    }

    const hashPassword = await hash(password, 10);
    const createUser = await UserModel.create({
      nombre,
      email,
      password: hashPassword,
    });

    const token = await createToken({ id: createUser._id });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await UserModel.find({});
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
  }
};
export { login, createUser, allUsers };
