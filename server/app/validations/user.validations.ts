import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const createUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre, email, password } = req.body;

  const mySchema = z.object({
    nombre: z.string().length(3).max(8),
    email: z.string().email(),
    password: z.string().min(6),
  });

  mySchema.parse({ nombre, email, password });

  next();
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, email } = req.body;
  const SchemaValidation = z.object({
    email: z.string().email(),
    nombre: z.string().length(3).max(8),
  });

  SchemaValidation.parse({ nombre, email });

  next();
};

const editarPerfilValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { descripcion, motivoDonacion, nombre } = req.body;

  const SchemaPerfil = z.object({
    descripcion: z.string().max(100),
    motivoDonacion: z.string().max(100),
    nombre: z.string().min(3).max(8),
  });

  SchemaPerfil.parse({ descripcion, motivoDonacion, nombre });

  next();
};
export { createUserValidation, loginValidation, editarPerfilValidation };
