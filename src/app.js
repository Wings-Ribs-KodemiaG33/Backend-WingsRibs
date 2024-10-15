//importar express
import express from "express";
import cors from "cors";
//importar morgan
import morgan from "morgan";
//express de los cookies, sirve para leer cualquier cookie
import cookieParser from "cookie-parser";
//importar auth.routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/authad.routes.js";
import managerRoutes from "./routes/authmg.routes.js";
import itemRoutes from "./routes/items.routes.js";
import orderRoutes from "./routes/orden.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
//muestra mensaje por consola por cada peticion al backend
app.use(morgan("dev"));
//interpretar el request body con formato JSON
app.use(express.json());
app.use(cookieParser());

//aplicacion quiero que utilices authRoutes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", managerRoutes);
// tambien la ruta de los items
app.use("/api", itemRoutes);
app.use("/api", orderRoutes);

export default app;
