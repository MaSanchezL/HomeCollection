import express from "express";
import cors from "cors";
// import path from "path";
import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir archivos estáticos del build de frontend
// app.use(express.static(path.join(process.cwd(), "../frontend/dist")));

// CORS - permitir peticiones desde frontend
app.use(cors());

app.use("/api/auth", authRouter);

app.use("/api/product", productRoute);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// 404 para rutas de API no encontradas
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
