import { Router } from "express";
import userRouter from "./userRouter.route";
import mercadopago from "./mercadopago.route";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/mercadopago", mercadopago);
export default routes;
