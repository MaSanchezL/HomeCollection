import { readFile } from "node:fs/promises";
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
const all = async ({
  filterInput,
  page = 1,
  pageLength = 10,
  sortColumn,
  sortDirection,
}) => {
  try {
    const data = await readFile("db/products.json", "utf-8");
    const allData = JSON.parse(data);

    // Filtrar segun el parametro oocional filterInput
    const filteredData = filterInput
      ? allData.filter((e) => {
          return (
            e.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
            e.descripcion.toLowerCase().includes(filterInput.toLowerCase())
          );
        })
      : allData;

    // Ordenamiento: segun los parametros sortColumn y sortDirection

    const sortCol = sortColumn ?? "id";
    const sortedData =
      sortColumn || sortDirection
        ? filteredData.sort((a, b) => {
            if (sortDirection === "desc") {
              return a[sortCol] > b[sortCol] ? -1 : 1;
            } else {
              return a[sortCol] < b[sortCol] ? -1 : 1;
            }
          })
        : filteredData;

    // Paginación
    return sortedData.slice((page - 1) * pageLength, page * pageLength);
  } catch (e) {
    console.error(e.message);
    return []; // Devolver array vacío en caso de error
  }
};

const productModel = {
  all,
  byId,
};

export default productModel;
