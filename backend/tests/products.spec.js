import request from "supertest";
import { app } from "../index.js";

//get
describe("GET /api/products/all", () => {
  it("Debe devolver status 200", async () => {
    const response = await request(app).get("/api/products/all").send();
    expect(response.status).toBe(200);
  });
  it("Debe devolver el array de productos", async () => {
    const response = await request(app).get("/api/products/all");
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toBeInstanceOf(Array);
  });
});
