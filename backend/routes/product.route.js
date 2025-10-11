import { Router } from "express";

import {
  product_create,
  product_all,
  product_by_id,
  product_like,
  product_unlike,
  product_delete,
  product_update,
} from "../controllers/product.controller.js";
import authMiddleware, {
  extractTokenMiddleware,
  isAdminMiddleware,
} from "../middlewares/auth.middleware.js";

const productRoute = Router();

productRoute.post("/create", isAdminMiddleware, product_create);

productRoute.post("/update", isAdminMiddleware, product_update);

productRoute.get("/all", product_all);

productRoute.get("/:id", extractTokenMiddleware, product_by_id);

productRoute.delete("/delete/:id", isAdminMiddleware, product_delete);

productRoute.put("/like/:id", authMiddleware, product_like);

productRoute.put("/unlike/:id", authMiddleware, product_unlike);

export default productRoute;
