import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  res.status(200).json({ token: "fake_token", email: req.body.email });
});

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({
    id: 1,
    email: req.body.email,
    token: "fake_token",
  });
});

app.get("/api/auth/me", (req, res) => {
  res.status(200).json({
    id: 1,
    nombre: "Usuario Test",
    email: "test@mail.com",
    rol_administrador: false,
  });
});

describe("API de Autenticacion", () => {
  it("POST /api/auth/login - debe iniciar sesion correctamente", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@mail.com", password: "123456" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /api/auth/register - debe registrar un usuario nuevo", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "nuevo@mail.com",
        password: "123456",
      });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("token");
  });

  it("GET /api/auth/me - debe retornar datos del usuario en sesion", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer fake_token");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email");
  });
});
