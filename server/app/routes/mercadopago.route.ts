import { Router } from "express";
import {
  createOrder,
  failure,
  pending,
  sucess,
  webhook,
} from "../controllers/mercadopago.route";
import authRequired from "../middlewares/authRequired";

const mercadopago = Router();

mercadopago.post("/create-order", authRequired, createOrder);
mercadopago.get("/sucess", sucess);
mercadopago.get("/failure", failure);
mercadopago.get("/pending", pending);
mercadopago.post("/webhook", webhook);

export default mercadopago;
