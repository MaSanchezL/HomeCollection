import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conexión a PostgreSQL con SSL
const pool = new Pool({
  user: "dbhc_user",
  host: "dpg-d3i5cfc9c44c73agd4bg-a.oregon-postgres.render.com",
  database: "dbhc",
  password: "POvhOOHCm8zB36ZKGFE2ifTmrZNYCirK",
  port: 5432,
  ssl: { rejectUnauthorized: false }, // necesario en Render
});

pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB conectada:", res.rows[0]))
  .catch(err => console.error("❌ Error DB:", err));

// 🔹 Middleware CORS
const allowedOrigins = [
  "https://homecollection.onrender.com",
  "http://localhost:5173",
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

// Preflight OPTIONS
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.use(express.json());

// 🔹 Endpoints de prueba
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login recibido:", email);
  res.json({ success: true, token: "dummy-token", email });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error DB" });
  }
});

// 🔹 Servir frontend
const frontendDist = path.join(process.cwd(), "../frontend/dist");
app.use(express.static(frontendDist, { extensions: ["html"] }));

// Todas las rutas que no sean /api/* servirán index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
