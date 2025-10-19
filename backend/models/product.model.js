import pool from "../db.js";
import format from "pg-format";

// GET. Obtener productos por el id

export const byId = async (id) => {
  const query = "SELECT * FROM products WHERE id=$1";
  const values = [id];
  const response = await pool.query(query, values);
  return productFormat(response.rows[0]);
};

// POST. Crear producto.
export const createProductModel = async (
  nombre,
  descripcion,
  precio,
  imagen,
  categoria_id
) => {
  const query =
    "INSERT INTO products (nombre, descripcion, precio, image_url,  category_id) values ($1, $2, $3, $4, $5) RETURNING id, nombre, descripcion, precio, image_url,  category_id";
  const values = [nombre, descripcion, precio, imagen, categoria_id];
  const response = await pool.query(query, values);
  return response.rows[0];
};

// GET. galería.
export const getAllProducts = async ({
  precio_max,
  precio_min,
  categoria,
  order_by = "menor_mayor",
  limit = 6,
  page = 1,
}) => {
  const columna = "precio";
  const orden = order_by === "menor_mayor" ? "asc" : "desc";
  const offset = (page - 1) * limit;
  const filterQuery = getFiltrosProducts({ precio_max, precio_min, categoria });
  const formatQuery = format(
    "SELECT * FROM products %s ORDER BY %s %s LIMIT %s OFFSET %s",
    filterQuery,
    columna,
    orden,
    limit,
    offset
  );

  const resultado = await pool.query(formatQuery);
  const countQuery = format("SELECT COUNT(*)  FROM products %s", filterQuery);

  const totalResult = await pool.query(countQuery);
  const total = totalResult.rows[0].count;

  return {
    total: parseInt(total),
    productos: resultado.rows.map((p) => productFormat(p)),
  };
};

//galería - filtros;

export const getFiltrosProducts = ({ precio_max, precio_min, categoria }) => {
  const filtros = [];

  if (precio_min) {
    filtros.push(`precio >= ${precio_min}`);
  }

  if (precio_max) {
    filtros.push(`precio <= ${precio_max}`);
  }

  if (categoria) {
    filtros.push(` category_id= '${categoria}'`);
  }

  if (filtros.length > 0) {
    return " WHERE " + filtros.join(" AND ");
  }

  return "";
};

export const productFormat = (producto) => {
  return {
    ...producto,
    precio: parseFloat(producto.precio),
  };
};

export const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id=$1";
  const values = [id];
  const response = await pool.query(query, values);
  return response.rowCount > 0;
};

export const updateProduct = async (
  id,
  nombre,
  descripcion,
  precio,
  imagen,
  categoria_id
) => {
  console.log("categoria_id", categoria_id);
  const query = `UPDATE products SET
     nombre = $1, 
     descripcion = $2, 
     precio = $3, 
     image_url = $4, 
     category_id = $5
    WHERE id = $6  RETURNING id, nombre, descripcion, precio, image_url, category_id`;
  const values = [nombre, descripcion, precio, imagen, categoria_id, id];
  const response = await pool.query(query, values);
  return response.rows[0];
};
