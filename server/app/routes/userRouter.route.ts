import { Router } from "express";
import {
  createUser,
  allUsers,
  login,
  editarPerfil,
  perfilUser,
  verifyToken,
  logout,
  userId,
} from "../controllers/user.controller";
import authRequired from "../middlewares/authRequired";
import { createUserValidation } from "../validations/user.validations";

const userRouter = Router();

userRouter.post("/createUser", createUserValidation, createUser);
userRouter.post("/login", login);
userRouter.get("/", allUsers);
userRouter.get("/userId/:id", userId);
userRouter.put("/:id", editarPerfil);
userRouter.get("/perfil", authRequired, perfilUser);
userRouter.get("/verify", verifyToken);
userRouter.get("/logout", logout);
export default userRouter;
