import app from "./app";
import connectDB from "./app/utils/connectDB";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log("Server levantado en el puerto " + PORT);
});
