import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rutas de API
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Servidor funcionando correctamente" });
});
app.use("/api/*", (req, res) => {
  res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// SERVIR ARCHIVOS ESTÁTICOS DEL FRONTEND
const frontendDist = path.join(process.cwd(), "frontend", "dist");
app.use(express.static(frontendDist));

// CATCH-ALL SOLO PARA RUTAS DE REACT
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
