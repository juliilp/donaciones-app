import cookieParser from "cookie-parser";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/index.route";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app: Express = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./app/uploads",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/", routes);

export default app;
