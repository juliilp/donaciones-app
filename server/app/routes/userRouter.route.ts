import { Router } from "express";
import {
  createUser,
  allUsers,
  login,
  editarPerfil,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/login", login);
userRouter.get("/allUser", allUsers);
userRouter.put("/:id", editarPerfil);

export default userRouter;
