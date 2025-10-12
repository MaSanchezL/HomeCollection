import pool from "../db.js";
import format from "pg-format";

// POST. Crear producto (formulario)

export const createFavorites = async (idUser, idProduct) => {
  const query =
    "INSERT INTO favorites (user_id, product_id) values ($1, $2) RETURNING id, user_id, product_id";
  const values = [idUser, idProduct];
  const response = await pool.query(query, values);
  return response.rows[0];
};

export const existFavorites = async (idUser, idProduct) => {
  const query =
    "SELECT COUNT(*) from favorites where user_id = $1 and product_id = $2";
  const values = [idUser, idProduct];
  const response = await pool.query(query, values);
  return response.rows[0].count > 0;
};

export const deleteFavoriteByUserIdAndProducId = async (idUser, idProduct) => {
  const query = "DELETE from favorites where user_id = $1 and product_id = $2";
  const values = [idUser, idProduct];
  const response = await pool.query(query, values);

  return response.rowCount > 0;
};
