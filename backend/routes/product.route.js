import { Router } from "express";

import {
  product_create,
  product_all,
  product_by_id,
} from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.post("/create", product_create);

productRoute.get("/all", product_all);

productRoute.get("/:id", product_by_id);

export default productRoute;
