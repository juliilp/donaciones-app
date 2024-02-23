import { Router } from "express";
import {
  createDatos,
  updateDatos,
  deleteDatos,
  getAllDatos,
} from "../controllers/datos.controller";
import authRequired from "../middlewares/authRequired";

const datosRouter = Router();

datosRouter.post("/create", authRequired, createDatos);
datosRouter.put("/edit/:id", authRequired, updateDatos);
datosRouter.delete("/delete/:id", authRequired, deleteDatos);
datosRouter.get("/allDatos", authRequired, getAllDatos);
export default datosRouter;
