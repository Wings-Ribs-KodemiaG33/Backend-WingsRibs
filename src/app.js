//importar express
import express from "express"
//importar morgan
import morgan from "morgan"
//express de los cookies, sirve para leer cualquier cookie
import cookieParser from "cookie-parser";
//importar cors , paquetes para autorizar conexiones de diferentes proxies
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

//importar auth.routes
import authRoutes from "./routes/auth.routes.js";

import itemRoutes from "./routes/items.routes.js";
import insumosRoutes from "./routes/insumos.routes.js" //insumos

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));



app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//muestra mensaje por consola por cada peticion al backend
app.use(morgan("dev"));
//interpretar el request body con formato JSON
app.use(express.json());
app.use(cookieParser())

//aplicacion quiero que utilices authRoutes
app.use("/api",authRoutes);

// tambien la ruta de los items
app.use("/api",itemRoutes);
app.use("/api",insumosRoutes);
export default app;