import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Lista explícita de orígenes permitidos
const allowedOrigins = [
  "https://homecollection.onrender.com",         // 🌍 Frontend desplegado en Render
  "http://localhost:5173",                       // 💻 Desarrollo local (Vite)
];

// ✅ Middleware CORS fijo y robusto
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Permitir sin origen (Postman)
      const normalized = origin.replace(/\/$/, "");
      const allowed = allowedOrigins.some(o => o.replace(/\/$/, "") === normalized);
      if (allowed) return callback(null, true);
      console.warn("🚫 Bloqueado por CORS:", origin);
      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔧 Manejo global de preflight (OPTIONS)
app.options("*", cors());

// Middleware JSON
app.use(express.json());

// 🔌 Rutas API
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRouter);

// 🩺 Ruta de salud
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Servidor funcionando correctamente" });
});

// ❌ Manejo 404 para API
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// 🧱 Servir el frontend (React build)
const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist, { extensions: ["html"] }));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 🚀 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
