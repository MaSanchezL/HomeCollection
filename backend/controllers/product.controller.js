import "dotenv/config";
import jwt from "jsonwebtoken";
import productModel from "../models/product.model.js";

/***
 * endpoint para devolver todos los productos..
 */
const product_all = async (req, res) => {
  const {
    filterInput,
    page = 1,
    pageLength = 10,
    sortColumn,
    sortDirection,
  } = req.query;

  const products_paginated = await productModel.all({
    filterInput,
    page,
    pageLength,
    sortColumn,
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

const productController = {
  product_all,
  product_by_id,
};

export default productController;
