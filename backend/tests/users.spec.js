import request from "supertest";
import { app } from "../index.js";

describe("POST /api/users/login and GET /user with token", () => {
  let token = JWT_SECRET;

  it("responds with json", async () => {
    const response = await request(app)
      .post("api/users/login")
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
