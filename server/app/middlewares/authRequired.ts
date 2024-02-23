import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";
import jwt, { VerifyErrors } from "jsonwebtoken";
import IUser from "../interfaces/User.interface";
import { Document } from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user?: Document;
    }
  }
}

const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.userLoginToken;

    if (!token) {
      return res.status(401).json({ message: "No hay token" });
    }

    const user = await new Promise<IUser | undefined>((resolve, reject) => {
      jwt.verify(
        token,
        "token123",
        (err: VerifyErrors | null, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });
    const userDocument = user ? await UserModel.findById(user.id) : null;

    if (!userDocument) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.user = userDocument;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default authRequired;
