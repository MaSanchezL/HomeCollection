import "dotenv/config";
import jwt from "jsonwebtoken";
import productModel from "../models/product.model.js";

/***
 * endpoint para devolver todos los productos..
 */
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

export default productController;
