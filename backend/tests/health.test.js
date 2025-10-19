import request from "supertest";
import app from "../index.js";

describe("API de estado del servidor", () => {
  it("GET /api/health - deberia retornar el estado del servidor", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message", "Servidor funcionando correctamente");
  });
});
