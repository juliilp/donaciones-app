import { Response, Request } from "express";

const createOrder = async (req: Request, res: Response) => {
  console.log(req.user);
  res.status(200).json("hola");
};
const sucess = async (req: Request, res: Response) => {
  res.status(200).json("Hola");
};
const failure = async (req: Request, res: Response) => {
  res.status(200).json("Hola");
};
const pending = async (req: Request, res: Response) => {
  res.status(200).json("Hola");
};
const webhook = async (req: Request, res: Response) => {
  res.status(200).json("Hola");
};

export { createOrder, sucess, failure, pending, webhook };
