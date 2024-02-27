import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { compare, hash } from "bcryptjs";
import createToken from "../utils/createToken";
import { uploadImagen, deleteImagen } from "../utils/cloudinary";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
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
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({
      nombre: findUser.nombre,
      email: findUser.email,
      foto: findUser.fotoPerfil,
    });
  } catch (error) {
    res.status(400).json(error);
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
    res.status(400).json(error);
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    const allUser = await UserModel.find({});
    res.status(200).json(allUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editarPerfil = async (req: Request, res: Response) => {
  try {
    const { descripcion, motivoDonacion, nombre } = req.body;
    const { id } = req.params;

    // Actualiza el perfil
    await UserModel.findByIdAndUpdate(id, {
      descripcion,
      motivoDonacion,
      nombre,
    });

    if (req.files?.image) {
      if (Array.isArray(req.files.image)) {
      } else {
        const result = await uploadImagen(req.files.image.tempFilePath);
        await UserModel.findByIdAndUpdate(id, {
          fotoPerfil: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
        });

        // Eliminar el archivo temporal de la imagen
        await fs.unlink(req.files.image.tempFilePath);
      }
    }

    // Consultar el perfil actualizado
    const perfilActualizado = await UserModel.findById(id);

    res.json(perfilActualizado);
  } catch (error) {
    res.status(400).json(error);
  }
};

const perfilUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const verifyToken = (req: Request, res: Response) => {
  const { userLoginToken } = req.cookies;
  console.log({ token: userLoginToken });
  if (!userLoginToken) return res.status(401).json({ message: "No hay token" });

  jwt.verify(userLoginToken, "token123", async (err: any, user: any) => {
    if (err) return res.status(401).json(err);

    const findUser = await UserModel.findById(user.id);
    if (findUser === null)
      return res.status(401).json({ message: "No se encontró el usuario" });
    res.status(200).json({
      id: findUser.id,
      nombre: findUser.nombre,
      email: findUser.email,
      foto: findUser.fotoPerfil,
      descripcion: findUser.descripcion,
      motivoDonacion: findUser.motivoDonacion,
      datos: findUser.datos,
      isAdmin: findUser.isAdmin,
    });
  });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("userLoginToken");
  res.status(200).json("Usuario deslogueado!");
};

const userId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findUser = await UserModel.findById(id);
    if (!findUser)
      return res
        .status(401)
        .json({ message: "No se encontró el usuario con el id: " + id });
    res.status(200).json(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  login,
  createUser,
  allUsers,
  editarPerfil,
  perfilUser,
  verifyToken,
  logout,
  userId,
};
