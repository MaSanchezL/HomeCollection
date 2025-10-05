import pool from "";
import format from "pg-format";

// GET. Obtener productos por el id. (detalle del producto)

export const byId = async (id) => {
  const query = "SELECT * FROM products WHERE id=$1";
  const values = [id];
  const response = await pool.query(query, values);
  return response.rows[0];
};

// POST. Crear producto (formulario)

export const createProductModel = async (
  nombre,
  descripcion,
  precio,
  imagen,
  stock
) => {
  const query =
    "INSERT INTO products (nombre, descripcion, precio, imagen, stock) values ($1, $2, $3, $4, $5) RETURNING nombre, descripcion, precio, imagen, stock";
  const values = [nombre, descripcion, precio, imagen, stock];
  const response = await pool.query(query, values);
  return response.rows[0];
};

// GET. galería.
export const getAllProducts = async ({
  precio_max,
  precio_min,
  categoria,
  order_by = "id_ASC",
  limit = 6,
  page = 1,
}) => {
  const [columna, orden] = order_by.split("_");
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
  return resultado.rows;
};

//galería - filtros;

export const getFiltrosProducts =  ({
  precio_max,
  precio_min,
  categoria,
}) => {
  const filtros = [];

  if (precio_min) {
    filtros.push(`precio >= ${precio_min}`);
  }

  if (precio_max) {
    filtros.push(`precio <= ${precio_max}`);
  }

  if (categoria) {
    filtros.push(`categoria= '${categoria}'`);
  }

  if (filtros.length > 0) {
    return " WHERE " + filtros.join(" AND ");
  }

  return ""
};





//implementar

export const isFavorite = async (userId, productId) => {
  return true;
};





/*// GET. galería.
export const getAllProducts = async ({
  order_by = "id_ASC",
  limit = 6,
  page = 1,
}) => {
  const [columna, orden] = order_by.split("_");
  const offset = (page - 1) * limit;
  const formatQuery = format(
    "SELECT * FROM products ORDER BY %s %s LIMIT %s OFFSET %s",
    columna,
    orden,
    limit,
    offset
  );

  const resultado = await pool.query(formatQuery);
  return resultado.rows;
};

//galería - filtros;

export const getFiltrosProducts = async ({
  precio_max,
  precio_min,
  categoria,
}) => {
  const filtros = [];

  if (precio_min) {
    filtros.push(`precio >= ${precio_min}`);
  }

  if (precio_max) {
    filtros.push(`precio <= ${precio_max}`);
  }

  if (categoria) {
    filtros.push(`categoria= '${categoria}'`);
  }

  let consulta = "SELECT * FROM product";
  if (filtros.length > 0) {
    consulta += " WHERE " + filtros.join(" AND ");
  }

  const resultado = await pool.query(consulta);
  return resultado.rows;
};





//implementar

export const isFavorite = async (userId, productId) => {
  return true;
};






/*import { readFile, writeFile } from "node:fs/promises";
 //Metodo para devolver un elemento por su id


const byId = async ({ id }) => {
  try {
    const data = await readFile("db/products.json", "utf-8");
    const allData = JSON.parse(data);

    // Filtrar segun por el id
    const digitId = parseInt(id);

    return allData.find((e) => e.id === digitId);
  } catch (e) {
    console.error(e.message);
    return []; // Devolver array vacío en caso de error
  }
};


 //Esta funcion devuelve una lista de productos
 //el metodo recibe un conjunto de parametros opcionales
 
const all = async ({ page = 1, sortDirection }) => {
  try {
    const data = await readFile("db/products.json", "utf-8");

    const allProductos = JSON.parse(data);

    let productosOrdenados = [];
    if (sortDirection) {
      productosOrdenados = allProductos.sort((a, b) => {
        if (sortDirection === "mayor_menor") {
          return a.precio > b.precio ? -1 : 1;
        } else {
          return a.precio < b.precio ? -1 : 1;
        }
      });
    } else {
      productosOrdenados = allProductos;
    }

    const inicio = (page - 1) * 10;
    const fin = page * 10;

    return {
      total: productosOrdenados.length,
      productos: productosOrdenados.slice(inicio, fin),
    };
  } catch (e) {
    console.error(e.message);

    return [];
  }
};

const create = async ({ nombre, descripcion, precio, imagen, stock }) => {
  try {
    const data = await readFile("db/products.json", "utf-8");

    const products = JSON.parse(data);

    let maxId = 0;
    for (let i = 0; i < products.length; i++) {
      if (maxId < products[i].id) maxId = products[i].id;
    }

    const created_product = {
      id: maxId + 1,
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
    };

    products.push(created_product);

    await writeFile("db/products.json", JSON.stringify(products, null, 2));

    return created_product;
  } catch (e) {
    console.error(e.message);
  }
};

const productModel = {
  all,
  byId,
  create,
};

export default productModel;*/
