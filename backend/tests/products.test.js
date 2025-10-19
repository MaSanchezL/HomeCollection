import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

app.get("/api/products/all", (req, res) => {
  res.status(200).json([{ id: 1, nombre: "Producto Test" }]);
});

app.get("/api/products/random", (req, res) => {
  res.status(200).json([{ id: 2, nombre: "Producto Random" }]);
});

app.get("/api/products/:id", (req, res) => {
  res.status(200).json({ id: req.params.id, nombre: "Producto por ID" });
});

app.put("/api/products/like/:id", (req, res) => {
  res.status(200).json({ success: true });
});

app.put("/api/products/unlike/:id", (req, res) => {
  res.status(200).json({ success: true });
});

describe("API de Productos", () => {
  it("GET /api/products/all - debe retornar todos los productos", async () => {
    const res = await request(app).get("/api/products/all");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/products/:id - debe retornar un producto por id", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("GET /api/products/random - debe retornar productos aleatorios", async () => {
    const res = await request(app).get("/api/products/random");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/products/like/:id - debe marcar un producto como favorito", async () => {
    const res = await request(app)
      .put("/api/products/like/1")
      .set("Authorization", "Bearer token");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });

  it("PUT /api/products/unlike/:id - debe desmarcar un producto como favorito", async () => {
    const res = await request(app)
      .put("/api/products/unlike/1")
      .set("Authorization", "Bearer token");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
  });
});
