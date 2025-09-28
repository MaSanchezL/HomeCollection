import { readFile, writeFile } from "node:fs/promises";
/**
 * Metodo para devolver un elemento por su id
 */

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

/**
 * Esta funcion devuelve una lista de productos
 * el metodo recibe un conjunto de parametros opcionales
 */
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

export default productModel;
