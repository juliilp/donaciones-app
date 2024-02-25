import { Router } from "express";
import {
  createDatos,
  updateDatos,
  deleteDatos,
  getAllDatos,
  getDatos,
} from "../controllers/datos.controller";
import authRequired from "../middlewares/authRequired";

const datosRouter = Router();

datosRouter.post("/", authRequired, createDatos);
datosRouter.put("/:id", authRequired, updateDatos);
datosRouter.delete("/:id", authRequired, deleteDatos);
datosRouter.get("/all", getAllDatos);
datosRouter.get("/", authRequired, getDatos);
export default datosRouter;
