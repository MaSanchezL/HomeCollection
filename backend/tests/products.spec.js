/* import request from "supertest";
import { app } from "../index.js"; */

/* const request = require("supertest");
 */
/* const server = require("../index.js");
 */
//get
/* 
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
}); */
const multiplicar = (a, b) => a * b;
describe("Testing unitario con Jest", () => {
  it("Comprobando el resultado de una multiplicar", () => {
    const n1 = 4;
    const n2 = 5;
    const resultado2 = multiplicar(n1, n2);
    expect(resultado2).toBe(20);
  });
});
