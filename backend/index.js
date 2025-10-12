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
  user: process.env.DB_USER || "dbhc_user",
  host: process.env.DB_HOST || "dpg-d3i5cfc9c44c73agd4bg-a.oregon-postgres.render.com",
  database: process.env.DB_NAME || "dbhc",
  password: process.env.DB_PASSWORD || "POvhOOHCm8zB36ZKGFE2ifTmrZNYCirK",
  port: 5432,
  ssl: { rejectUnauthorized: false }, // necesario en Render
});

// Test de conexión a la DB
pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB conectada:", res.rows[0]))
  .catch(err => console.error("❌ Error DB:", err));

// 🔹 CORS robusto
const allowedOrigins = [
  "https://homecollection.onrender.com",
  "http://localhost:5173", // para desarrollo local
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite peticiones desde herramientas o SSR sin origin
    if (!origin) return callback(null, true);

    const normalized = origin.replace(/\/$/, "");
    const allowed = allowedOrigins.some(o => o.replace(/\/$/, "") === normalized);

    if (allowed) return callback(null, true);

    console.warn("🚫 Bloqueado por CORS:", origin);
    return callback(new Error("No permitido por CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Preflight automático
app.options("*", cors());

// Middleware JSON
app.use(express.json());

// 🔹 Endpoint raíz /api para test de salud
app.get("/api", (req, res) => {
  res.json({ success: true, message: "API funcionando" });
});

// 🔹 Endpoints reales
import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

app.use("/api/auth", authRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", ordersRouter);

// Ruta de salud adicional (opcional)
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error DB" });
  }
});

// Manejo de 404 para APIs
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// 🔹 Servir frontend
const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist, { extensions: ["html"] }));

// Todas las rutas que no sean /api/* sirven index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
