import cookieParser from "cookie-parser";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/index.route";
const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/", routes);

export default app;
