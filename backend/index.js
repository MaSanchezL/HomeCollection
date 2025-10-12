import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conexión a PostgreSQL con SSL para Render
const pool = new Pool({
  user: "dbhc_user",
  host: "dpg-d3i5cfc9c44c73agd4bg-a.oregon-postgres.render.com",
  database: "dbhc",
  password: "POvhOOHCm8zB36ZKGFE2ifTmrZNYCirK",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB conectada:", res.rows[0]))
  .catch(err => console.error("❌ Error DB:", err));

// 🔹 Middleware CORS para producción
const allowedOrigins = [
  "https://homecollection.onrender.com",
  "http://localhost:5173" // opcional para desarrollo
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman o SSR
    const normalized = origin.replace(/\/$/, "");
    const allowed = allowedOrigins.some(o => o.replace(/\/$/, "") === normalized);
    if (allowed) return callback(null, true);
    console.warn("🚫 Bloqueado por CORS:", origin);
    return callback(new Error("No permitido por CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// 🔹 Preflight para todas las rutas
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// 🔹 Middleware JSON
app.use(express.json());

// 🔹 Rutas de ejemplo (reemplaza por tus routers)
import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRouter);

// Ruta de prueba DB
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error DB" });
  }
});

// 🔹 Servir frontend React
const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist, { extensions: ["html"] }));

// Todas las rutas que no sean /api/* servirán index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 🔹 Manejo 404 API
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
