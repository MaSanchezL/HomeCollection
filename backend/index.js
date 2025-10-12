import express from "express";
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

// 🔹 Middleware CORS universal (temporalmente abierto)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// 🔹 Middleware JSON
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

// 🔹 Todas las rutas que no sean /api/* servirán index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// 🔹 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
