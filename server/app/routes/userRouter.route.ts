import { Router } from "express";
import {
  createUser,
  allUsers,
  login,
  editarPerfil,
  perfilUser,
  verifyToken,
} from "../controllers/user.controller";
import authRequired from "../middlewares/authRequired";
import {
  createUserValidation,
  editarPerfilValidation,
  loginValidation,
} from "../validations/user.validations";

const userRouter = Router();

userRouter.post("/createUser", createUserValidation, createUser);
userRouter.post("/login", login);
userRouter.get("/allUser", allUsers);
userRouter.put("/:id", editarPerfil);
userRouter.get("/perfil", authRequired, perfilUser);
userRouter.get("/verify", verifyToken);
export default userRouter;
