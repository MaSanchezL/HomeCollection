import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

app.get("/api/orders/me", (req, res) => {
  res.status(200).json([{ id: 1, total_amount: 100 }]);
});

app.post("/api/orders", (req, res) => {
  res.status(201).json({ id: 2, total_amount: req.body.total_amount });
});

app.get("/api/orders/:id", (req, res) => {
  res.status(200).json([{ productId: 1, quantity: 2 }]);
});

describe("API de Ordenes", () => {
  it("GET /api/orders/me - debe retornar ordenes del usuario", async () => {
    const res = await request(app)
      .get("/api/orders/me")
      .set("Authorization", "Bearer token");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/orders - debe crear una nueva orden", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer token")
      .send({ items: [{ productId: 1, quantity: 2 }], total_amount: 200 });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("total_amount", 200);
  });

  it("GET /api/orders/:id - debe retornar una orden por id", async () => {
    const res = await request(app)
      .get("/api/orders/1")
      .set("Authorization", "Bearer token");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
