import { Router } from "express";
import {
  createUser,
  allUsers,
  login,
  editarPerfil,
  perfilUser,
} from "../controllers/user.controller";
import authRequired from "../middlewares/authRequired";

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/login", login);
userRouter.get("/allUser", allUsers);
userRouter.put("/:id", editarPerfil);
userRouter.get("/perfil", authRequired, perfilUser);
export default userRouter;
