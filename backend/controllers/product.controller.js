import { findUserByEmail } from "../models/auth.model.js";
import { createFavorites } from "../models/favorites.model.js";
import {
  byId,
  createProductModel,
  getAllProducts,
  
} from "../models/product.model.js";


// GET. Obtener productos por el id.

export const product_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await byId(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json( product );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};


// POST. Crear producto

export const product_create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen,  categoria_id } = req.body;
    const newProduct = await createProductModel(
      nombre,
      descripcion,
      precio,
      imagen,      
      categoria_id
    );
    res.status(200).json( newProduct );
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
    res.status(200).json( product );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};



// Put. Like

export const product_like = async (req, res) => {
  try {
    const emailUser= req.user;
    const user= await findUserByEmail(emailUser)

    if(!user){
      return res.status(403).json({ error: "Debe estar autenticado para crear favoritos" });
    }
    const { id } = req.params;
    const like = await createFavorites(
      user.id, id
    )
    res.status(200).json(like);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al procesar solicitud" });
    console.error("Error=>", error);
  }
};








/*import "dotenv/config";
import jwt from "jsonwebtoken";
import productModel from "../models/product.model.js";

 // endpoint para devolver todos los productos..
 
const product_all = async (req, res) => {
  const {
    page = 1,
    sortDirection,
  } = req.query;

  const products_paginated = await productModel.all({
    page,
    sortDirection,
  });

  return res.json(products_paginated);
};

const product_by_id = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.byId({ id });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
};

const product_create = async (req, res) => {

   const { nombre, descripcion, precio, imagen, stock } = req.body; 
   const product = await productModel.create({
     nombre,
     descripcion,
     precio,
     imagen,
     stock,
   });

  if (!product) {
    return res.status(500).json({ message: "Error creating product" });
  }

  return res.json(product);

};

const productController = {
  product_all,
  product_by_id,
  product_create,
};

export default productController;*/
