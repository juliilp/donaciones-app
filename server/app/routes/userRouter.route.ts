import { Router } from "express";
import { createUser, allUsers, login } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.post("/login", login);
userRouter.get("/allUser", allUsers);

export default userRouter;
