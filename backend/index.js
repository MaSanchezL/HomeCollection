import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- Configuración de CORS ---
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir peticiones sin 'origin' (ej. mobile, Postman, curl, mismo origen)
      if (!origin) return callback(null, true);

      // Verificar si el origen está en la lista permitida
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Denegar la petición
      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --- Rutas de API ---
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRouter);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Servidor funcionando correctamente" });
});

// Middleware para manejar rutas API no encontradas
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// --- Servido de Archivos Estáticos del Frontend ---
const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist, { extensions: ["html"] }));

// Captura cualquier ruta que NO comience con /api y sirve el index.html del SPA
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// --- Manejo de Errores (Sugerencia de Mejora) ---
app.use((err, req, res, next) => {
  console.error(err.stack); // Para fines de depuración
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

// --- Inicio del Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
