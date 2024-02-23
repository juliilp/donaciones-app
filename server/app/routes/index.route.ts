import { Router } from "express";
import userRouter from "./userRouter.route";
import datosRouter from "./datosRouter.route";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/datos", datosRouter);
export default routes;
