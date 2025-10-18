import { findUserByEmail } from "../models/auth.model.js";
import {
  createFavorites,
  deleteFavoriteByUserIdAndProducId,
  existFavorites,
} from "../models/favorites.model.js";
import {
  byId,
  createProductModel,
  deleteProduct,
  getAllProducts,
  productosRandom,
  updateProduct,
} from "../models/product.model.js";

// GET. Obtener productos por el id.

export const product_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await byId(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (req.user) {
      const emailUser = req.user;
      const user = await findUserByEmail(emailUser);
      const isFavorite = await existFavorites(user.id, id);

      const productWithFavoriteInfo = { ...product, isFavorite };
      return res.status(200).json(productWithFavoriteInfo);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};

// POST. Crear producto

export const product_create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, categoria_id } = req.body;
    const newProduct = await createProductModel(
      nombre,
      descripcion,
      precio,
      imagen,
      categoria_id
    );
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};

export const product_update = async (req, res) => {
  try {
    const { id, nombre, descripcion, precio, imagen, categoria_id } = req.body;
    const updatedProduct = await updateProduct(
      id,
      nombre,
      descripcion,
      precio,
      imagen,
      categoria_id
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};

// GET. galería.

export const product_all = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, order_by, limit, page } =
      req.query;
    const product = await getAllProducts({
      precio_max,
      precio_min,
      categoria,
      order_by,
      limit,
      page,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};

// Put. Like

export const product_like = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res
        .status(403)
        .json({ error: "Debe estar autenticado para crear favoritos" });
    }
    const { id } = req.params;
    const like = await createFavorites(user.id, id);
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al procesar solicitud para crear favorito" });
    console.error("Error=>", error);
  }
};

export const product_unlike = async (req, res) => {
  try {
    const emailUser = req.user;
    const user = await findUserByEmail(emailUser);

    if (!user) {
      return res
        .status(403)
        .json({ error: "Debe estar autenticado para eliminar favoritos" });
    }

    const { id } = req.params;

    const exist = await existFavorites(user.id, id);

    if (!exist) {
      return res.status(400).json({
        error:
          "No existe en la base de datos un elemento favorito para el usuario y el producto.",
      });
    }

    const deleted = await deleteFavoriteByUserIdAndProducId(user.id, id);

    if (deleted) {
      return res.status(200).json({
        status: true,
      });
    }

    return res.status(500).json({
      error: "No se ha podido procesar la solicitud para eliminar favorito",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error al procesar solicitud para eliminar favorito" });
    console.error("Error=>", error);
  }
};

export const product_delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProduct(id);

    if (!deleted) {
      return res
        .status(400)
        .json({ error: "Error al intentar eliminar el producto" });
    }

    res.status(200).json({ status: "producto borrado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};



// productos random

export const product_random = async (req, res) => {
  try {   

    const ramdon = await productosRandom();    
    res.status(200).json(ramdon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};






