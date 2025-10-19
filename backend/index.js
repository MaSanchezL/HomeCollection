import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

import authRouter from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import ordersRouter from "./routes/orders.route.js";

const app = express();

app.use(express.json());

const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

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

if (process.env.ENVIRONMENT == "LOCAL") {
  const frontendDist = path.join(process.cwd(), "../frontend/dist");
  app.use(express.static(frontendDist, { extensions: ["html"] }));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

export default app;
