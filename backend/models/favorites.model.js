import pool from "../db.js";
import format from "pg-format";


// POST. Crear producto (formulario)

export const createFavorites = async (
  idUser,
  idProduct
) => {
  const query =
    "INSERT INTO favorites (user_id, product_id) values ($1, $2) RETURNING id, user_id, product_id";
  const values = [idUser, idProduct];
  const response = await pool.query(query, values);
  return response.rows[0];
};
