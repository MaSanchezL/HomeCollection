import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {};

// LOGIN
authController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, nombre, nro_documento, direccion, email, password, rol_administrador FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol_administrador: user.rol_administrador,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    delete user.password;
    res.json({ ...user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al autenticar usuario" });
  }
};

// REGISTRO
authController.register = async (req, res) => {
  const {
    nombre,
    nro_documento,
    direccion,
    email,
    password,
    rol_administrador,
  } = req.body;

  try {
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR nro_documento = $2",
      [email, nro_documento]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (nombre, nro_documento, direccion, email, password, rol_administrador)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, nro_documento, direccion, email, rol_administrador`,
      [
        nombre,
        nro_documento,
        direccion,
        email,
        hashedPassword,
        rol_administrador || false,
      ]
    );

    const newUser = result.rows[0];
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ ...newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// USUARIO EN SESION
authController.me = async (req, res) => {
  const userEmail = req.user;

  if (!userEmail) return res.status(401).json({ message: "No autorizado" });

  try {
    const result = await pool.query(
      `SELECT id, nombre, nro_documento, direccion, email, rol_administrador
       FROM users
       WHERE email = $1`,
      [userEmail]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      nombre: user.nombre || "",
      nro_documento: user.nro_documento || "",
      direccion: user.direccion || "",
      email: user.email || "",
      rol_administrador: user.rol_administrador || false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export default authController;
