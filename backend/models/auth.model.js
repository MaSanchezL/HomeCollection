//import pool from "";
import bcrypt from "bcryptjs";

// Registrar nuevo usuario (verificar con campos de la tabla usuarios de la DB)
const newUserModel = async (nombre, apellido, email, password, direccion, rol) => {
  const hashedPassword = bcrypt.hashSync(password);
  const values = [nombre, apellido, email, hashedPassword, direccion, rol];
  const query =
    "INSERT INTO usuarios (nombre, apellido, email, password, direccion, rol) values ($1, $2, $3, $4, $5, $6) RETURNING nombre, apellido, email, direccion, password, rol";
  const response = await pool.query(query, values);
  return response.rows[0];
};



// Buscar usuario por email

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const response = await pool.query(query, values);
  return response.rows[0];
};



export { newUserModel, findUserByEmail };










//Antes de empezar tenìa esto, es lo mismo de las pizzas

/*import { readFile, writeFile } from "node:fs/promises";

const getUserByEmail = async (email) => {
  const data = await readFile("db/users.json", "utf-8");
  const users = JSON.parse(data);
  return users.find((user) => user.email === email);
};

const addUser = async (newUser) => {
  const data = await readFile("db/users.json", "utf-8");
  const users = JSON.parse(data);
  users.push(newUser);
  await writeFile("db/users.json", JSON.stringify(users, null, 2));
};

export const authModel = {
  getUserByEmail,
  addUser,
};*/
