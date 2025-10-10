import { Router } from "express";

import {
  product_create,
  product_all,
  product_by_id,
  product_like
} from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.post("/create", product_create);

productRoute.get("/all", product_all);

productRoute.get("/:id", product_by_id);

productRoute.put("/like/:id", product_like);


export default productRoute;
