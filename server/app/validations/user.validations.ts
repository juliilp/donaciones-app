import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const createUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nombre, email, password } = req.body;

  const mySchema = z.object({
    nombre: z
      .string()
      .min(3, { message: "Mínimo 3 letras" })
      .max(8, { message: "Máximo 8 letras" }),
    email: z.string().email({ message: "El email no es válido" }),
    password: z.string().min(6, { message: "Minimo 6 letras" }),
  });

  try {
    mySchema.parse({ nombre, email, password });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ error: "Datos de entrada no válidos", details: error.errors });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;
  const SchemaValidation = z.object({
    email: z.string().email({ message: "El email no es válido" }),
    password: z
      .string()
      .min(3, { message: "Minimo 3 letras" })
      .max(8, { message: "Máximo 8 letras" }),
  });

  try {
    SchemaValidation.parse({ password, email });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ error: "Datos de entrada no válidos", details: error.errors });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const editarPerfilValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { descripcion, motivoDonacion, nombre } = req.body;

  const SchemaPerfil = z.object({
    descripcion: z
      .string()
      .max(100, { message: "Máximo se permiten 100 caracteres" }),
    motivoDonacion: z
      .string()
      .max(100, { message: "Máximo se permiten 100 caracteres" }),
    nombre: z.string().max(8, { message: "Máximo se permiten 8 caracteres" }),
  });

  try {
    SchemaPerfil.parse({ descripcion, motivoDonacion, nombre });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ error: "Datos de entrada no válidos", details: error.errors });
    } else {
      // Maneja otros tipos de errores
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};
export { createUserValidation, loginValidation, editarPerfilValidation };
