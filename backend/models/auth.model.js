import pool from "../db.js";

// Registrar Usuario

const newUserModel = async (
  nombre,
  apellido,
  email,
  password,
  direccion,
  rol
) => {
  const hashedPassword = bcrypt.hashSync(password);
  const values = [nombre, apellido, email, hashedPassword, direccion, rol];
  const query =
    "INSERT INTO users (nombre, apellido, email, password, direccion, rol) values ($1, $2, $3, $4, $5, $6) RETURNING nombre, apellido, email, direccion, password, rol";
  const response = await pool.query(query, values);
  return response.rows[0];
};

// Buscar usuario por email

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  const response = await pool.query(query, values);
  return response.rows[0];
};

export { newUserModel, findUserByEmail };
