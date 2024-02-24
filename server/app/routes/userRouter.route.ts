import { Router } from "express";
import {
  createUser,
  allUsers,
  login,
  editarPerfil,
  perfilUser,
} from "../controllers/user.controller";
import authRequired from "../middlewares/authRequired";
import {
  createUserValidation,
  editarPerfilValidation,
  loginValidation,
} from "../validations/user.validations";

const userRouter = Router();

userRouter.post("/createUser", createUserValidation, createUser);
userRouter.post("/login", loginValidation, login);
userRouter.get("/allUser", allUsers);
userRouter.put("/:id", editarPerfilValidation, editarPerfil);
userRouter.get("/perfil", authRequired, perfilUser);
export default userRouter;
