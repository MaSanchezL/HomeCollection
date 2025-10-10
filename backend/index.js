import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Servidor funcionando correctamente" });
});

app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app