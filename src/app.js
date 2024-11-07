//importar express
import express from "express";
import cors from "cors";
//importar morgan
import morgan from "morgan";
//express de los cookies, sirve para leer cualquier cookie
import cookieParser from "cookie-parser";
//importar cors , paquetes para autorizar conexiones de diferentes proxies
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
//importar auth.routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/auth.routes.js";
import managerRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/items.routes.js";
import orderRoutes from "./routes/orden.routes.js";
import pedidoRoutes from "./routes/pedido.routes.js";
import insumosRoutes from "./routes/insumos.routes.js" 
import paymentRoutes from "./routes/payment.routes.js"; 
import subsidiaryRoutes from "./routes/sucursales.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", managerRoutes);

app.use("/api", itemRoutes);
app.use("/api", orderRoutes);
app.use("/api", pedidoRoutes);
app.use("/api",insumosRoutes);
app.use("/api", paymentRoutes);
app.use("/api", subsidiaryRoutes);


export default app;
