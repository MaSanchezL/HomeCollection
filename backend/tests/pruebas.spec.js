/* 
import request from "supertest";
import { app } from "../index.js";

describe("Operaciones CRUD", () => {
  it("Obteniendo un 200", async () => {
    const response = await request(app).get("/galeria").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });
});
describe("Ruta No existente", () => {
  it("Obteniendo un 404", async () => {
    const response = await request(app).get("/no-existe").send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });
});
 */