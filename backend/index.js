import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos del build de frontend
app.use(express.static(path.join(process.cwd(), "../frontend/dist")));

// Redirigir todas las rutas al index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend/dist/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
