/* 
import request from "supertest";
import { app } from "../index.js";
const server = require("../index.js");
const request = require("supertest");

let userToken="";

describe("POST /api/users/login and GET /user with token", () => {
  let token = JWT_SECRET;

  it("responds with json", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "correo1@correo.com", password: "123456" });

    token = response.body.token;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("email");
  });

  it("responds with json", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.results).toBeInstanceOf(Array);
  });
});
 
describe("Operaciones CRUD", () => {
  it("Obteniendo un 200", async()=>{
    const response = await request(server).get("/hora").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  })

const sumar = (a, b) => a + b;

describe("Testing unitario con Jest", () => {
  ImageTrack("Sumar dos números", () => {
    const n1 = 4;
    const n2 = 5;
    const resultado = sumar(n1, n2);
    expect(resultado).toBe(9);
  });
}); */

// users.spec.js
/* 
// Importaciones corregidas para un proyecto de tipo "module"
import request from "supertest";
// Asegúrate de que tu archivo "../index.js" exporte la instancia de tu aplicación Express como 'app'.
import { app } from "../index.js";

// Variable para almacenar el token JWT obtenido en el login.
let userToken = "";

// --- Pruebas de Integración para Rutas de Usuario ---
describe("Integration Tests for /api/users", () => {
  // Test 1: La prueba de inicio de sesión
  it("POST /api/users/login debería responder con un código 200 y un token JWT", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "correo1@correo.com", password: "123456" }); // ⚠️ Asume que estas credenciales son válidas en tu DB

    // Verificaciones
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("email");

    // Almacena el token para usarlo en las siguientes pruebas
    userToken = response.body.token;
    expect(userToken).not.toBe("");
  });

  // Test 2: Acceso a ruta protegida con token válido
  it("GET /api/users debería responder con un código 200 y una lista de usuarios (requiere token)", async () => {
    // Si la prueba de login falló, esta prueba lanzará un error.
    if (!userToken) {
      throw new Error("El token no se obtuvo en la prueba de login.");
    }

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${userToken}`); // Envía el token en el header

    // Verificaciones
    expect(response.statusCode).toBe(200);
    // Asume que la respuesta exitosa devuelve un objeto con la propiedad 'results'
    expect(response.body.results).toBeInstanceOf(Array);
  });

  // Test 3: Prueba de fallo (Acceso a ruta protegida sin token)
  it("GET /api/users sin token de autorización debería responder con código 401", async () => {
    const response = await request(app).get("/api/users");
    // No se envía el header de Authorization

    // Verificación de fallo
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
 */
// --- Prueba Unitaria Corregida ---

const sumar = (a, b) => a + b;

describe("Testing unitario con Jest", () => {
  it("Sumar dos números", () => {
    const n1 = 4;
    const n2 = 5;
    const resultado = sumar(n1, n2);
    expect(resultado).toBe(9);
  });
});
